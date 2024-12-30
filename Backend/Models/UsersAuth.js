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
    createdAt : {
        type : Date ,
        default : Date.now()
    },
    Cards : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'digimodel'
    }]
})

UsersAuthSchema.index( {createdAt : 1} , {expireAfterSeconds : 86400 , partialFilterExpression : {isVerified : false} }  )

export const UsersAuthModel = mongoose.model("usersaccounts",UsersAuthSchema);