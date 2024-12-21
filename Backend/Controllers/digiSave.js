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
    let db = new DigiModel({
      name: data1.personName,
      phone: data1.mobile,
      Companyname: data1.companyname.trim() === "" ? "personal" : data1.companyname,
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
    await user.save();

    return res.status(200).json({
      isDone: true,
      msg: "Created Successfully",
      id: db._id.toString(),
    });
  } catch (e) {
    return res.status(400).send(e.message || "Internal Server Error")
  }
};
