import { DigiModel } from "../Models/DigiCardmodel.js";

export const GetDigi = async(req,res) =>{
    const id =req.params.id;
    const companyname = req.params.companyName;
    try{
        let dbFind = await DigiModel.findOne({
            _id : id , Companyname : companyname
        })
        if(dbFind){
            return res.status(200).json({
                isfound : true , data1 : dbFind
            })
        }
        if(!dbFind){
            return res.status(400).send("Cant find the details you looking for , Please Try again")
        }
        
    }catch(e){
        return res.status(400).send(e.message || "Server Error")
    }
}