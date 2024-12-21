import express from "express";
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

import { verifyJWTtoken } from "../Middlewares/verifyJWT.js";
import { UsersCheckAuth } from "../Controllers/Auth/Userauthcheck.js";

import { Logout } from "../Controllers/Auth/Logout.js";

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

route.post("/signup", SignupDetails);
route.post("/login", LoginDetails);
route.post("/logout", Logout);

route.get("/user/me", verifyJWTtoken,UsersCheckAuth);

route.post("/saveDigi", verifyJWTtoken, upload.single("logo"), SaveDigiDetails);
route.post("/addNewUser", verifyJWTtoken, upload.single("logo"), AddNewUser);
route.get("/getDigi/:companyName/:id", verifyJWTtoken, GetDigi);
route.patch(
  "/editDigiDetails/:companyName/:id",
  verifyJWTtoken,
  upload.single("logo"),
  EditDigi
);
route.patch("/editUserDigi/:id", verifyJWTtoken, UpdateUserDigi);

route.get("/showUser/:companyName/:userID", verifyJWTtoken, GetUsersDigi);

route.get("/editUser/:id", verifyJWTtoken, GetUserDetailsEdit);

route.get("/:companyname/getUserDigi", verifyJWTtoken, getUsersBasedonCompany);

export default route;
