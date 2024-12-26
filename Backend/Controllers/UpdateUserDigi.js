import { UsersModel } from "../Models/usersmodel.js";
import path from "path";
export  const UpdateUserDigi = async(req,res)=>{
    let data = req.body
    let fileVar = req.file
    let id = req.params.id
    let filePath
    if (fileVar === null || !fileVar) {
        filePath = "Didnt upload an img";
      }
    if (fileVar !== null && fileVar) {
        let filenamevar = fileVar.filename;
        let foldername = path.basename(fileVar.destination);
        data.img = `/${foldername}/${filenamevar}`;
      }


    if(!data){
        return res.status(400).send("An Error occured Try Again");
    }
   
    try{
        const db = await UsersModel.updateOne({
            _id : id
        }, {
            $set : data
        } );
 
       if(db.modifiedCount > 0){
        return res.status(200).json({
            isEdited : true , msg : "Edited Successfully"
        })
       }
    }catch(e){
        console.log(e)
        return res.status(400).send(e.message || "Server Error");
    }
}