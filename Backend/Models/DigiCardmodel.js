import mongoose from "mongoose";

const DigiCardSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  Companyname: {
    type: String,
  },

  UserRole: {
    type: String,
  },
  mail: {
    type: String,
  },
  phone: {
    type: String,
  },
  whatsapp: {
    type: String,
  },
  location: {
    type: String,
  },
  website: {
    type: String,
  },
  img: {
    type: String,
  },
  linkedin:{
    type : String
  },
  facebook:{
    type : String
  },
  instagram:{
    type : String
  },
  twitter:{
    type : String
  },
  youtube : {
    type : String
  },
  members : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }]
});

export const DigiModel = mongoose.model("digimodel", DigiCardSchema);