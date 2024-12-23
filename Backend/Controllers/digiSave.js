import { DigiModel } from "../Models/DigiCardmodel.js";
import { UsersAuthModel } from "../Models/UsersAuth.js";

import path from "path";

export const SaveDigiDetails = async (req, res) => {
  let data1 = req.body;
  let fileVar = req.file;
  let filePath;
  if (fileVar === null || !fileVar) {
    filePath = "Didnt upload an img";
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

  if (fileVar !== null && fileVar) {
    let filenamevar = fileVar.filename;
    let foldername = path.basename(fileVar.destination);
    filePath = `/${foldername}/${filenamevar}`;
  }

  try {
    let companyNamefind = await DigiModel.findOne(
      {
        Companyname: data1.companyname,
      },
      { _id: 1 }
    );
    if (companyNamefind) {
      return res.status(400).send("Company with this name already exists");
    }
    
    let cardLength = user.Cards.length;
    let clientSideCardname = data1.plan 
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
    let db = new DigiModel({
      name: data1.personName,
      phone: data1.mobile,
      Companyname:
        data1.companyname.trim() === "" ? "personal" : data1.companyname,
      UserRole: data1.role,
      mail: data1.mail,
      website: data1.webLink,
      whatsapp: data1.whatsappnum,
      location: data1.location,
      img: filePath,
      instagram: data1.instagram,
      facebook: data1.facebook,
      twitter: data1.twitter,
      linkedin: data1.linkedin,
      youtube: data1.youtube,
    });
    const savedCard = await db.save();
    user.Cards.push(savedCard._id);
    user.subscription = clientSideCardname
    await user.save();
    console.log('after user save',user)
    return res.status(200).json({
      isDone: true,
      msg: "Created Successfully",
      id: db._id.toString(),
    });
  } catch (e) {
    return res.status(400).send(e.message || "Internal Server Error");
  }
};
