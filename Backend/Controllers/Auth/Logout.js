export const Logout = async(req,res)=>{
    try{
        await res.clearCookie('token',{
            httpOnly : false , sameSite : 'lax' , secure : false , maxAge : 0
        });
        return res.status(200).json({
            isLogout : true , msg :'Logged out successfully'
        })
    }
    catch(e){
        return res.status(400).send("Error at logging out")
    }
}