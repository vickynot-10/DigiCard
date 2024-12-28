import { UsersAuthModel } from "../../Models/UsersAuth.js";
import bcrypt from 'bcrypt';
import { GenerateJWTtoken } from "../../Utils/generateToken.js";

export const SignupDetails = async(req,res)=>{
    let data = req.body;
    let finaldata;
    if(!data){
        return res.status(400).send("An Error occured Try Again");
    }
    if(!data.password || data.password.trim() === '' ){
        return res.status(400).send("Enter your password")
    }
    
    if(!data.username || data.username.trim() === '' ){
        return res.status(400).send("Enter your username")
    }
    
    if(!data.mail || data.mail.trim() === ''){
        return res.status(400).send("Enter your Mail")
    }
    if(data.password.length < 8){
        return res.status(400).send("Password must have atleast 8 characters")
    }
    if(data.password.length > 20){
        return res.status(400).send("Password should less than 20 characters");
    }
    try{
        let valFindbyName = await UsersAuthModel.findOne({username : data.username});
        let valFindbyMail = await UsersAuthModel.findOne({mail : data.mail});
        if(valFindbyName){
            return res.status(400).send("User with this name already exists");
        }
        if(valFindbyMail){
            return res.status(400).send("User with this mail already exists");
        }
        let salt = await bcrypt.genSalt(10);
        let passwordHasing = await bcrypt.hash(data.password , salt);
        finaldata =  new UsersAuthModel({
            username : data.username , mail :data.mail , password : passwordHasing
        })
        await finaldata.save();
        let token =GenerateJWTtoken(finaldata._id);
        res.cookie('token',token , {
            httpOnly : false ,
            sameSite : 'lax',
            secure: false,
            maxAge: 2 * 60 * 60 * 1000,

        })
        return res.status(200).json({
            isCreated : true , msg : "Created Successfully"
        })


    }catch(e){
        return res.status(400).send(e.message || "Server Error");
    }
}