import { UsersModel } from "../Models/usersmodel.js"
import { DigiModel } from "../Models/DigiCardmodel.js";

const AddNewUser = async(req,res) =>{
    let data = req.body
    if(!data){
        return res.status(400).send(e.message || "Error occured Please Try again");
    }
    const companyname = data.companyName
    if(!data){
        return res.status(400).send("Error occured Try again");
    }
    try{
        let dbData = new UsersModel(data)
        await dbData.save();

       

        const companyDb = await DigiModel.findOne({
            Companyname : companyname
        })
        if(!companyDb){
            return res.status(400).send("Company Cant find");
        }
        companyDb.members.push(dbData._id.toString());
        await companyDb.save();
        return res.status(200).json({
            isAdded : true , msg : 'User Added Successfully' 
        })
    }
    catch(e){
        return res.status(400).send(e.message || "Server error")
    }
}


export  default AddNewUser