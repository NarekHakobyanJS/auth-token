const nodemailer = require('nodemailer')

class MailServices {
    constructor(){
        // Այս հատկության օգնությամբ մենք կուղարկ ենք նամակը էլ. հասցեին: 
        // createTransport ֆունկցիան որպես արգումենտ ստանում է
        // Օբյկտ հետևյալ հատկություներով => 
        // host : հոստը
        // port : Պորտը
        // secure : boolean
        // auth : {user : ով է ուղարկում, pass : Gmail-ում պետքե ստեղծես Application Password եթե քո Gamil-ում միացված է երկողմանի անվտանգությունը: }
        this.transporter = nodemailer.createTransport({
            // այս բոլոր արժեքները ստանում ենք gmailի պարամետրներից
            host : process.env.SMTP_HOST,
            port : process.env.SMTP_PORT,
            secure : false,
            auth : {
                user : process.env.SMTP_USER,
                pass : process.env.SMTP_PASSWORD
            }
        })
    }
    //էլ. հասցեին message ուղարկելու function-ն
    async sendActivationMail(to, link){
        // ֆունկցիան որպես արգումենտ ստանում է
        // Օբյկտ հետևյալ հատկություներով => 
        // from : ով է ուղարկում
        // to : ով է ստանում նամակը:
        // subject : 'նամակի գլուխը'
        // text : պարունակություն
        // html : պարունակություն
        await this.transporter.sendMail({
            from : process.env.SMTP_USER,
            to : to, //'pushofficial@mail.ru', // 'vrdo685@gmail.com',
            subject : 'Ակաունտի ակտիվացում ՝' + process.env.API_URL,
            text  : '',
            html : `
                <div>
                    <h1>Ակտիվացնելու համար անցեք այս հղումով</h1>
                    <a href='${link}'>${link}</a>
                </div>
            `
        })
    }
}

module.exports = new MailServices()