import mongoose from 'mongoose';

const UsersAuthSchema = new mongoose.Schema({
    username : {
        type : String
    },
    mail :{
        type : String
    },
    password : {
        type : String
    },
    googleID:{
        type : String
    },
    subscription : {
        type : String,
        enum : ['free','basic','premium'],
        default : 'free'
    },
    isVerified : {
        type : Boolean ,
        default : false
    },
    Cards : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'digimodel'
    }]
})

export const UsersAuthModel = mongoose.model("usersaccounts",UsersAuthSchema);