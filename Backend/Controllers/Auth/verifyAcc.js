import { UsersAuthModel } from "../../Models/UsersAuth.js";
import { GenerateJWTtoken } from "../../Utils/generateToken.js";

export const VerifyAccount = async (req, res) => {
  let id = req.params.userID;
  if (!id) {
    return res.status(400).send("Error occured please try again");
  }
  try {
    const userFind = await UsersAuthModel.updateOne(
      { _id: id },
      { isVerified: true }
    );
    if (userFind.matchedCount <= 0) {
      return res.status(400).send("User cant find");
    }
    if (userFind.acknowledged === true && userFind.modifiedCount > 0) {
        let token = GenerateJWTtoken(id);
        res.cookie('token',token , {
            httpOnly : true ,
            sameSite : 'None',
            secure: true,
            maxAge: 2 * 60 * 60 * 1000,

        })
      res.redirect(`${process.env.FRONTEND_URL}`);
    }
    if (userFind.acknowledged && userFind.modifiedCount <= 0) {
      return res.status(400).send("User is not found")
    }
  } catch (e) {
    return res.status(400).send(e.message || "Server error try again");
  }
};
