import { DigiModel } from "../Models/DigiCardmodel.js";
import { UsersAuthModel } from "../Models/UsersAuth.js";

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
    let DigimodelDB = await DigiModel.deleteOne({ _id: data.userID });
    await UsersAuthModel.updateOne(
      { _id: req.user._id, Cards: { $in: [data.userID] } }, 
      { $pull: { Cards: data.userID } }  
    );
    if (!DigimodelDB) {
      return res.status(400).send("Error Occured Try again");
    }
    if (DigimodelDB.acknowledged === true && DigimodelDB.deletedCount <= 0) {
      return res.status(400).send("Card Already Been deleted");
    }
    if (DigimodelDB.acknowledged === true && DigimodelDB.deletedCount > 0) {
      return res.status(200).json({
        isDeleted: true,
        msg: "Deleted Successfully",
      });
    }
  } catch (e) {
    return res.status(400).send(e.message || "Server Error");
  }
};
