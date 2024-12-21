import { UsersModel } from "../Models/usersmodel.js";

export const GetUsersDigi = async(req,res)=>{
    const id = req.params.userID
    const companyNameVar  = req.params.companyName
    if(!id){
        return res.status(400).send("An Error occured Try again");
    }
    try{
        let db = await UsersModel.findOne({
            _id : id , companyName : companyNameVar
        })
        if(!db){
            return res.status(400).send("User cant find");
        }
        return res.status(200).json({
            isFound : true , data : db 
        })
    }
    catch(e){
        return res.status(400).send(e.message || "An Server Error")
    }
}