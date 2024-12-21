import { DigiModel } from "../Models/DigiCardmodel.js";
import { UsersModel } from "../Models/usersmodel.js";


export const getUsersBasedonCompany = async(req,res)=>{
    let companyNamevalue = req.params.companyname
    if(!companyNamevalue || companyNamevalue === null){
        return res.status(400).send("Error occured Please Try again");
    }
    try{
        let dbFind = await DigiModel.findOne({ Companyname : companyNamevalue
        } , { members : 1 , img : 1 , _id : 0 } )
        if(!dbFind){
            return res.status(400).json({
                isErr : true , msg : "Cant find CompanyName"
            })
        }
        let membersArr = dbFind.members
        if(membersArr.length <=0 ){
            return res.status(400).send("0 Users in Company")
        }

        let usersFind = await UsersModel.find({
            _id : {$in :membersArr}
        })        
        return res.status(200).json({
            isFound : true , data : usersFind , compImg : dbFind.img || null
        })
    }catch(e){
        return res.status(400).send(e.message || "Internal Server Error")
    }
}