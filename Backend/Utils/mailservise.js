import nodemailer from 'nodemailer';
import {configDotenv} from 'dotenv'
configDotenv()
const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.NODEMAILER_ACC_NAME ,
        pass : process.env.NODEMAILER_ACC_PASS ,

    },
    tls : {
        rejectUnauthorized : false
    }
})

export const sendMail = async( subject , to,html)=>{
    try{
        let mailOptions = {
            from : process.env.NODEMAILER_ACC_NAME ,
            to : to,
            subject : subject ,
            html : html
        }
        const mailSend = await transporter.sendMail(mailOptions);
        if(mailSend.accepted && mailSend.accepted.length > 0){
            return "Mail send Successfully"
        }
        if(mailSend.rejected && mailSend.rejected > 0){
          return "Mail not send , Try Again"
        }
    
    }catch(e){
        return "Mail not send , Try Again"
    }
}