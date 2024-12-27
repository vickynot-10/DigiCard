import mongoose from "mongoose";
import { DigiModel } from "../Models/DigiCardmodel.js";
import { UsersAuthModel } from "../Models/UsersAuth.js";
import { UsersModel } from "../Models/usersmodel.js";
export const DeleteCard = async (req, res) => {
  const data = req.body;
  if (!data || !data.userID) {
    return res.status(400).send("Error Occured Try again");
  }
  if(!req.user){
    return res.status(400).json({
      isloggedin : false , msg : 'Please Login'
  })
  }
  try {
    const userFind = await UsersModel.find({companyName :data.companyname } , { _id :1 } );
    const idsToPull = userFind.map((item)=> item._id);
    idsToPull.push(new mongoose.Types.ObjectId(data.userID))
    const promises =[
      UsersModel.deleteMany({companyName : data.companyname}) ,DigiModel.deleteOne({ _id: data.userID }) ,UsersAuthModel.updateOne(
        { _id: req.user._id, Cards: { $in: idsToPull } }, 
        { $pull: { Cards: {$in :  idsToPull}  } }  
      )
    ]
    const result = await Promise.all(promises);
    const [userCard,digicard,userauth] = result
    if(userCard.acknowledged === false || digicard.acknowledged === false || userauth.acknowledged === false){
      return res.status(400).send("Error Occured Try again");
    }
    if(userCard.deletedCount === 0 && userCard.acknowledged === true){
      return res.status(400).send("Card Already Been deleted");
    }
    return res.status(200).json({
      isDeleted: true,
      msg: "Deleted Successfully",
    });
    
  } catch (e) {
    return res.status(400).send(e.message || "Server Error");
  }
};
