export const UsersCheckAuth = (req,res)=>{
    if(!req.user){
        return res.status(400).json({
            isloggedin : false , msg : 'Please Login'
        })
    }
    return res.status(200).json({
        isloggedin : true , userdata : req.user
    })
}