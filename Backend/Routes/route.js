import express from 'express';
import { SaveDigiDetails } from '../Controllers/digiSave.js';
import { GetDigi } from '../Controllers/GetDigiDetails.js';
import { upload } from '../Config/multer.js';
import { EditDigi } from '../Controllers/EditDigi.js';
import { GetUsersDigi } from '../Controllers/GetMemberDigiDetails.js';

import AddNewUser from '../Controllers/AddNewuser.js'
import { getUsersBasedonCompany } from '../Controllers/GetUsersbasedonCompany.js';

import { GetUserDetailsEdit } from '../Controllers/GetUserDetailsforEdit.js';

import { UpdateUserDigi } from '../Controllers/UpdateUserDigi.js';

import { SignupDetails } from '../Controllers/Auth/Signup.js';
import { LoginDetails } from '../Controllers/Auth/Login.js';


import path , {dirname} from 'path'
import { fileURLToPath } from 'url';
const route = express.Router();
const app =express();

const filename = fileURLToPath(import.meta.url)
const __dirname = dirname(filename)
app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.use('/imgs',express.static(path.join(__dirname + '/FileUploads') ));


route.post('/signup',SignupDetails);
route.post('/login',LoginDetails);

route.post('/saveDigi', upload.single('logo'), SaveDigiDetails);
route.post('/addNewUser', upload.single('logo'), AddNewUser);
route.get('/getDigi/:companyName/:id' , GetDigi);
route.patch('/editDigiDetails/:companyName/:id' , upload.single('logo'), EditDigi);
route.patch('/editUserDigi/:id' ,UpdateUserDigi );


route.get('/showUser/:companyName/:userID',GetUsersDigi);

route.get('/editUser/:id',GetUserDetailsEdit)

route.get('/:companyname/getUserDigi',getUsersBasedonCompany);

export default route