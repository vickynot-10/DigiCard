import { UsersAuthModel } from "../../Models/UsersAuth.js";
import bcrypt from 'bcrypt';
import { GenerateJWTtoken } from "../../Utils/generateToken.js";
export const LoginDetails = async(req,res)=>{
    let data = req.body;  
    if(!data){
        return res.status(400).send("An Error occured Try Again");
    }
    if ( !data.mail || data.mail.trim() === '' ) {
        return res.status(400).send("Email field required");
    }
    if (!data.password || data.password.trim() === '') {
        return res.status(400).send("Password Field required");
    }
    if(data.password.length < 8){
        return res.status(400).send("Password must have atleast 8 characters")
    }
    
    if(data.password.length > 20){
        return res.status(400).send("Password should less than 20 characters")
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
        if(user.isVerified === false){
            return res.status(400).send("Please Verify your account");
        }

        let token =GenerateJWTtoken(user._id);
        res.cookie('token',token , {
            httpOnly : false ,
            sameSite : 'lax',
            secure: false,
            maxAge: 2 * 60 * 60 * 1000,

        })
        return res.status(200).json({
            isFound : true , msg : 'Logged In Successfully'
        })
       

    }catch(e){
        return res.status(400).send(e.message || "Server Error");
    }
}