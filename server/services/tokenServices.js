const jwt = require('jsonwebtoken')
const tokenModel = require('../models/tokenModel')
class TokenServices {
   // Թոկեների գեներացման function-ը
   // 1 arg = payload (user - ինֆոն պահպանվի token-ի մեջ)
    generateTokens(payload){
        // Թոքեների գեներացում
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn : '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn : '1d'})

        return {
            accessToken,
            refreshToken
        }
        
    }

    // refreshToken պահպանումը DB-ում
    // 1 arg = userId && 2 arg = refreshToken
    async saveToken(userId, refreshToken){
        //userId ի օգնությամբ նախ տեսնենք կա արդյոք նման տոկեն DB-ում
        const tokenData = await tokenModel.findOne({user : userId})
        // եթե կա նման տոկեն արդեն մենք նրան փոխում ենք նորով
        if(tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        // եթե նման տոկեն չկա ապա user-ը լոգինա լինում առաջին անգամ և պետքա նրան ստեղծել DB-ում
        const token = await tokenModel.create({user : userId, refreshToken})
        // վերադարձնում ենք այդ տոկենը
        return token;

    }
}

module.exports = new TokenServices()