import multer from "multer";
import path , {dirname} from 'path';
import { fileURLToPath } from "url";
import fs from 'fs'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
const now = new Date()
const date = now.getDate();
const year = now.getFullYear()
const month = now.getMonth() + 1;


const fileUploadPath = path.join(__dirname , '../FileUploads');



if(!fs.existsSync(fileUploadPath)){
    fs.mkdirSync(fileUploadPath, { recursive : true })
}




const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        const folderName = `folder_${date}-${month}-${year}`;
        const folderPath =  path.join(fileUploadPath,folderName);
        if(fs.existsSync(folderPath)){
            return cb(null,folderPath)
        }
        fs.mkdirSync(folderPath, { recursive: true });
        return cb(null,folderPath)
        
    },
    filename:(req,file,cb)=>{
        const generatedFilename = `${file.originalname.replace(path.extname(file.originalname), '')}_${Math.floor(Math.random() * 10000)}${path.extname(file.originalname)}`;
        cb(null, generatedFilename)
    }
})


export const upload = multer({
    storage : storage,
    fileFilter : (req,file,cb) => {
        let ext = path.extname(file.originalname);
        if(ext === '.png' || ext === '.jpg' || ext === '.pdf' || ext === '.jpeg' || ext === '.docx' || ext === '.svg' || ext === '.webp' ) {
            cb(null,true)
        }
        else{
            cb(new Error("Invalid File Type"))
        }

    },
    limits: {
        fileSize : 5 * 1024 * 1024
    }
})