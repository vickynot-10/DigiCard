import { DigiModel } from "../Models/DigiCardmodel.js";
import { UsersModel } from "../Models/usersmodel.js";
import { UsersAuthModel } from "../Models/UsersAuth.js";

export const DeleteUserCard = async (req, res) => {
  const data = req.body;
  if (!data || !data.userID) {
    return res.status(400).send("Error Occured Try again");
  }
  if (!req.user) {
    return res.status(400).json({
      isloggedin: false,
      msg: "Please Login",
    });
  }

  try {
    const promises = [
      UsersModel.deleteOne({ _id: data.userID }),
      DigiModel.updateOne(
        { Companyname: data.companyname, members: { $in: [data.userID] } },
        { $pull: { members: data.userID } }
      ),
      UsersAuthModel.updateOne(
        { _id: req.user._id, Cards: { $in: [data.userID] } },
        { $pull: { Cards: data.userID } }
      ),
    ];
    const result = await Promise.all(promises);
    const [userCardDel, DigiCardDelete, UserAuthCard] = result;
    if (
      userCardDel.acknowledged === false ||
      DigiCardDelete.acknowledged === false ||
      UserAuthCard.acknowledged === false
    ) {
      return res.status(400).send("Error Occured Try again");
    }
    if (userCardDel.acknowledged === true && userCardDel.deletedCount === 0) {
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
