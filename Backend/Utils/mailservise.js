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

export const sendMail = async( subject ,html)=>{
    try{
        let mailOptions = {
            from : process.env.NODEMAILER_ACC_NAME ,
            to : process.env.NODEMAILER_TO_ACC,
            subject : subject ,
            html : html
        }
        const mailSend = await transporter.sendMail(mailOptions);
        console.log(mailSend);
    }catch(e){
        console.log(e)
    }
}