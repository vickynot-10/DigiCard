import jwt from "jsonwebtoken";
import { UsersAuthModel } from "../Models/UsersAuth.js";

export const verifyJWTtoken = (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      message: "Please Login , Have token",
      isLoggedIn: false,
      userdata: null,
    });
  }
  try {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decode) => {
      if (err) {
        return res.status(400).json({
            message: "Please Login Again",
            isLoggedIn: false,
            userdata: null,
          });
      }
      let user = await UsersAuthModel.findOne({
        _id: decode.userID,
      });

      if (!user) {
        return res.status(400).json({
          message: "Cant find an user",
          isLoggedIn: false,
          userdata: null,
        });
      }
      req.user = user;
      next();
    });
  } catch (e) {
    return res.status(400).send(e.message || "An error occured");
  }
};
