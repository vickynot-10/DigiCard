import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    User_name : {
        type : String
    },
    User_role : {
        type : String
    },
    user_branch:{
        type : String
    },
    User_mobile_number : {
        type : String
    },
    User_mail : {
        type : String
    },
    companyName : {
        type : String
    },
    User_ID : {
        type : String
    },
    location: {
        type: String,
      },
    whatsapp : {
        type : String
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
      }
      
})

export const UsersModel = mongoose.model("Users" , UsersSchema)