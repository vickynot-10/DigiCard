import { DigiModel } from "../Models/DigiCardmodel.js";
import { UsersModel } from "../Models/usersmodel.js";

export const DeleteUserCard = async (req, res) => {
  const data = req.body;
  if (!data || !data.userID) {
    return res.status(400).send("Error Occured Try again");
  }

 


try{
    let userDB = await UsersModel.deleteOne({_id : data.userID});
     await DigiModel.updateOne({Companyname : data.companyname , members : {$in : [data.userID]} } , {$pull : {members : data.userID}} )
    if (!userDB) {
        return res.status(400).send("Error Occured Try again");
      }
      if (userDB.acknowledged === true && userDB.deletedCount <= 0) {
        return res.status(400).send("Card Already Been deleted");
      }
      if (userDB.acknowledged === true && userDB.deletedCount > 0) {
        return res.status(200).json({
          isDeleted: true,
          msg: "Deleted Successfully",
        });
      }
}
   catch (e) {
    return res.status(400).send(e.message || "Server Error");
  }
};
