import express from 'express';
import route from './Routes/route.js';
import getDatabase from './Database/database.js';
import { configDotenv } from "dotenv";
import cors from 'cors';
import path , {dirname} from 'path'
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';




const app = express();

app.use(cookieParser())
configDotenv()
getDatabase()
const port = 7000
app.use(cors({
    origin : true , credentials : true
}))

const filename = fileURLToPath(import.meta.url)
const __dirname = dirname(filename)

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use('/imgs',express.static(path.join(__dirname + '/FileUploads') ));

app.use(route);

app.listen(port , ()=>{
    console.log("runniing on" , port)
})