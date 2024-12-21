import { UsersAuthModel } from "../../Models/UsersAuth.js";
import bcrypt from 'bcrypt';

export const LoginDetails = async(req,res)=>{
    let data = req.body;
    let finaldata;
    if(data.password.length <= 8){
        return res.status(400).send("Password must 8 characters")
    }
    if(!data){
        return res.status(400).send("An Error occured Try Again");
    }
    try{
        let user = await UsersAuthModel.findOne({
            $or : [{
                username : data.mail
            } , { mail : data.mail } ]
        })
        if(!user){
            return res.status(400).send("Cant find an user");
        }
        let passwordMatch = await bcrypt.compare(data.password , user.password);
        if(!passwordMatch){
            return res.status(400).send("Incorrect Password");
        }
        return res.status(200).json({
            isFound : true , msg : 'Logged In Successfully'
        })
    }catch(e){
        return res.status(400).send(e.message || "Server Error");
    }
}