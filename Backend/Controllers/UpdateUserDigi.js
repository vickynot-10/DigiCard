import { UsersModel } from "../Models/usersmodel.js";

export  const UpdateUserDigi = async(req,res)=>{
    let data = req.body
    let id = req.params.id
    if(!data){
        return res.status(400).send("An Error occured Try Again");
    }
    try{
        const db = await UsersModel.updateOne({
            _id : id
        }, data)
       if(db.modifiedCount > 0){
        return res.status(200).json({
            isEdited : true , msg : "Edited Successfully"
        })
       }
    }catch(e){
        return res.status(400).send(e.message || "Server Error");
    }
}