import { GenerateJWTtoken } from "../Utils/generateToken.js";
import { configDotenv } from "dotenv";
configDotenv();
export const OauthCreate = (req, res) => {
  try {
    let token = GenerateJWTtoken(req.user._id);
    res.cookie("token", token, {
      httpOnly: false,
      sameSite: "lax",
      secure: false,
      maxAge: 2 * 60 * 60 * 1000,
    });
    res.redirect(`${process.env.FRONTEND_URL}/`)
  } catch (e) {
    console.log(e);
  }
};
