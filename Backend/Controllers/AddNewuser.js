import { UsersModel } from "../Models/usersmodel.js";
import { DigiModel } from "../Models/DigiCardmodel.js";
import { UsersAuthModel } from "../Models/UsersAuth.js";

const AddNewUser = async (req, res) => {
  let data = req.body;
  if (!data) {
    return res.status(400).send(e.message || "Error occured Please Try again");
  }
  const companyname = data.companyName;
  if (!data) {
    return res.status(400).send("Error occured Try again");
  }
  let user = await UsersAuthModel.findOne({
    _id: req.user._id,
  });
  if (!user) {
    return res.status(400).json({
      isloggedin: false,
      msg: "Please Login and try again",
    });
  }
  try {
    
    let cardLength = user.Cards.length;
    let clientSideCardname = user.subscription 
    if(clientSideCardname === user.subscription){
      if (user.subscription === "free" && cardLength === 1) {
        return res.status(400).send("Free Plan can create 1 Card");
      }
      if (user.subscription === "basic" && cardLength === 5) {
        return res.status(400).send("Basic plan can create 5 cards");
      }
      if (user.subscription === "premium" && cardLength === 10) {
        return res.status(400).send("Premium plan can create 10 cards");
      }
    }
    let dbData = new UsersModel(data);
    await dbData.save();
    const companyDb = await DigiModel.findOne({
      Companyname: companyname,
    });
    if (!companyDb) {
      return res.status(400).send("Company Cant find");
    }
    companyDb.members.push(dbData._id.toString());
    await companyDb.save();
     user.Cards.push(dbData._id);
     await user.save()
    return res.status(200).json({
      isAdded: true,
      msg: "User Added Successfully",
    });
  } catch (e) {
    return res.status(400).send(e.message || "Server error");
  }
};

export default AddNewUser;
