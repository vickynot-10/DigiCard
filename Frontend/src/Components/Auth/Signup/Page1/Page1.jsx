import { usePage } from "../../../../Contexts/Pagehandling";
import './page1.css';
import {AssestsObj} from '../../../../Assests/assests.js'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Page1(){
    const {setPageNum,pageindex,setpageIndex}  = usePage()
    
    function nextPage(){
        setpageIndex(pageindex + 1);
        setPageNum((prev)=>{
            const newArr = [...prev];
            newArr[1] = true
            return newArr
        })
    }
    return (
        <div id="page1-container">
            <div id="page-header-txt" >
            <p  > First , What do u need as ? </p>
            </div>
            <div id="choose-opt-div">
                <div id="option-1">
                    <img src={AssestsObj.User} alt="personal-logo" />
                    <div>
                    <p>For personal</p>
                    <ArrowForwardIcon />
                    </div>
                    
                </div>
            </div>
            

        </div>
    )
}

/* https://www.webstacks.com/blog/multi-step-form*/