import { UsersModel } from "../Models/usersmodel.js";

export const GetUserDetailsEdit=async(req,res)=>{
    let userId = req.params.id
    if(!userId || userId === null){
        return res.status(400).send("An error occured , Try Again")
    }
    try{
        let dbFind = await UsersModel.find({
            _id : userId
        })
        if(!dbFind){
            return res.status(400).send("User cant find");    
        }
        return res.status(200).json({
            isFound : true , data : dbFind
        })
    }
    catch(e){
        return res.status(400).send(e.message || "Server Error");
    }

}