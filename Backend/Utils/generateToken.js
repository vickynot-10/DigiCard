import jwt from 'jsonwebtoken';

export const GenerateJWTtoken=(id)=>{
    try{
        return jwt.sign({
            userID : id
        } , process.env.SECRET_KEY , {
            expiresIn : '2h'
        })
    }catch(e){
        return e.message
    }
}