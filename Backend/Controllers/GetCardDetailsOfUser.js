import { UsersAuthModel } from "../Models/UsersAuth.js";
import { DigiModel } from "../Models/DigiCardmodel.js";
export const GetCardDetails = async(req,res)=>{
    if(!req.user){
        return res.status(400).send("Please Login")
    }
    let userID = req.user._id
    try{
        let userFind = await UsersAuthModel.findOne({_id : userID});
        if(!userFind){
            return res.status(400).send("Error occured , Try Logging in First")
        }
        const digiCard = await DigiModel.find({_id : {$in : userFind.Cards } } , {Companyname : 1 , _id : 1 , img : 1} );
        const membersCard = await DigiModel.find( {members : {$in : userFind.Cards} } , {members : 1 , _id : 0  } ).populate('members' , '_id User_name companyName img');
        return res.status(200).json({
            isFound : true , data : {
                'digi' : digiCard.length > 0 ? digiCard : [],
                'membersdigi' : membersCard.length > 0 ? membersCard : []
            }
        })

    }catch(e){
        return res.status(400).send(e.message || "Server Error");
    }
}