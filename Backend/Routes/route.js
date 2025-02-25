import express from "express";
import passport from '../Middlewares/passport.js'
import { OauthCreate } from "../Controllers/OauthCreateController.js";

import { SaveDigiDetails } from "../Controllers/digiSave.js";
import { GetDigi } from "../Controllers/GetDigiDetails.js";
import { upload } from "../Config/multer.js";
import { EditDigi } from "../Controllers/EditDigi.js";
import { GetUsersDigi } from "../Controllers/GetMemberDigiDetails.js";

import AddNewUser from "../Controllers/AddNewuser.js";
import { getUsersBasedonCompany } from "../Controllers/GetUsersbasedonCompany.js";

import { GetUserDetailsEdit } from "../Controllers/GetUserDetailsforEdit.js";

import { UpdateUserDigi } from "../Controllers/UpdateUserDigi.js";

import { SignupDetails } from "../Controllers/Auth/Signup.js";
import { LoginDetails } from "../Controllers/Auth/Login.js";
import { VerifyAccount } from "../Controllers/Auth/verifyAcc.js";

import { verifyJWTtoken } from "../Middlewares/verifyJWT.js";
import { UsersCheckAuth } from "../Controllers/Auth/Userauthcheck.js";

import { GetCardDetails } from "../Controllers/GetCardDetailsOfUser.js";

import { Logout } from "../Controllers/Auth/Logout.js";
import { DeleteUserCard } from "../Controllers/DeleteUserCard.js";
import { DeleteCard } from "../Controllers/DeleteCard.js";

import cookieParser from "cookie-parser";

import path, { dirname } from "path";
import { fileURLToPath } from "url";
const route = express.Router();
const app = express();
app.use(cookieParser());

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/imgs", express.static(path.join(__dirname + "/FileUploads")));


route.get('/',(req,res)=>{
  res.send("running in backend")
})

route.post("/signup", SignupDetails);
route.post("/login", LoginDetails);
route.post("/logout", Logout);

route.get('/user/verify/:userID',VerifyAccount)

route.get('/auth/google',passport.authenticate('google',{scope : ['profile','email'] , prompt :'select_account' }  ) );
route.get('/auth/google/callback' , passport.authenticate('google', { session : false}) ,OauthCreate )

route.get("/user/me", verifyJWTtoken, UsersCheckAuth);

route.get("/all-cards", verifyJWTtoken, GetCardDetails);

route.delete('/deleteCard',verifyJWTtoken,DeleteCard);
route.delete('/deleteUserCard',verifyJWTtoken,DeleteUserCard);

route.post("/saveDigi", verifyJWTtoken, upload.single("logo"), SaveDigiDetails);
route.post("/addNewUser", verifyJWTtoken, upload.single("img"), AddNewUser);
route.get("/getDigi/:companyName/:id", verifyJWTtoken, GetDigi);
route.patch(
  "/editDigiDetails/:companyName/:id",
  verifyJWTtoken,
  upload.single("logo"),
  EditDigi
);
route.patch("/editUserDigi/:id", verifyJWTtoken, upload.single('logo'), UpdateUserDigi);

route.get("/showUser/:companyName/:userID", verifyJWTtoken, GetUsersDigi);

route.get("/editUser/:id", verifyJWTtoken, GetUserDetailsEdit);

route.get("/:companyname/getUserDigi", verifyJWTtoken, getUsersBasedonCompany);

export default route;
