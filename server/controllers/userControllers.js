const userServices = require('../services/userServices')

class UserControllers {
    async registration(req, res, next){
        try {
            const {email, password} = req.body
            const userData = await userServices.registration(email, password)

            return res.json(userData)
        } catch (error) {
            res.send(error)
        }
    }

    async login(req, res, next){
        try {
            
        } catch (error) {
            
        }
    }

    async logout(req, res, next){
        try {
            
        } catch (error) {
            
        }
    }

    async activate(req, res, next){
        try {
            // URL պարամետրից ստանում ենք լինկը որը ուղարկում ենք Սերվիսի համանուն ֆունկցիային:
            const activationLink = req.params.link 
            await userServices.activate(activationLink)
            // այս function-ից մենք user-ին redirect-ենք անում Ֆրոնտի Պորտ // օր ` 5050
            return res.redirect(process.env.CLIENT_URL)
        } catch (error) {
            res.json(error)
        }
    }

    async refresh(req, res, next){
        try {
            
        } catch (error) {
            
        }
    }

    async getUsers(req, res, next){
        try {
            res.send('OK')
        } catch (error) {
            
        }
    }
}

module.exports = new UserControllers()