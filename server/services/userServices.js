const bcryptjs = require('bcryptjs')
const uuid = require('uuid')
const UserModel = require('../models/userModel')
const mailService = require('./mailServices')
const tokenServices = require('./tokenServices')
const UserDto = require('../dtos/UserDto')

class UserServices {
    // registration function Ստանումա կանչի ժամանակ
    async registration(email, password) {
        // Ստուգում որ նման email-ով user գոյություն չունի
        const condidate = await UserModel.findOne({ email })
        // եթե նման email-ով user կա տալիս ենք error
        if (condidate) {
            throw new Error(`նման ${email}-ով user գոյություն ունի`)
        }
        // passwrod-ի խեշավորումը
        const hashPassword = await bcryptjs.hash(password, 10)
        // էլ. հասցեի հղումը ակտիվացնելու համար
        const activationLink = uuid.v4()
        // եթե նման email-ով user չկա ստեղծում ենք և պահպանում DB-ում
        const user = await UserModel.create({ email, password: hashPassword, activationLink })
        // էլ. հասցեին message ուղարկելու function-ն
        // 1 arg = email && 2 arg = 
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
        // DTO-ի կանչը
        // սրան փոխանցում ենք user-ի տվյալները և այն մեզ հետ կտա արդեն ֆիլտրված user-ին,
        // որը կուղարկենք տոկենը գեներացնող ֆունկցիաին
        const userDto = new UserDto(user)

        // տոկենը գեներացնող ֆունկցիաի կանչը
        // որը որպես արգումենտ ստանումա րի տվյալները, բայց այդ տվյալները պետք է 
        // ուղղարկ էլ ֆիլտրված:
        // դրա համար կստեղծենք DTO-ն (Data Transfer Object)
        const tokens = tokenServices.generateTokens({ ...userDto })

        // տոկենը DB-ում պահող function-ի կանչը
        await tokenServices.saveToken(userDto.id, tokens.refreshToken)


        // Այս ֆունկցիայից վերադարձնում ենք տոկեները և user-ի մասին ինֆոն
        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserServices()