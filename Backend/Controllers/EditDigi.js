import { DigiModel } from "../Models/DigiCardmodel.js";
import path from "path";
export const EditDigi = async (req, res) => {
  const id = req.params.id;
  const data1 = req.body;
  const companyname = req.params.companyName;
  let fileVar = req.file;
  if (fileVar !== null && fileVar) {
    let filenamevar = fileVar.filename;
    let foldername = path.basename(fileVar.destination);
    data1.img = `/${foldername}/${filenamevar}`;
  }
  try {
    let db = await DigiModel.updateOne(
      {
        _id: id, Companyname : companyname
      },
      {
        $set: data1,
      }
    );
    if(db.acknowledged === false){
      return res.status(400).send("No Edit were done or Error occured");
    }
    if (db.modifiedCount === 0) {
      return res.status(400).send("No Edit were done");
    }
    if (db.modifiedCount > 0) {
      return res.status(200).json({
        isEdited: true,
        msg: "Edited Successfully",
      });
    }
  } catch (e) {
    return res.status(400).send(e.message || "Server Error");
  }
};
