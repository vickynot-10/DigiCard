import "./basicsubscribe.css";
import { useAuth } from "../../../Contexts/authContext";
import { useNavigate } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import CloseIcon from '@mui/icons-material/Close';

export default function BasicSubscribed() {
  const navigate = useNavigate();
  const { isLoggedUserin } = useAuth();
  function redirect(){
    if(isLoggedUserin.cardsArrLength < 5){
        navigate('/basic-plan',{
            state : 'basic'
        })
        return
    }
  }
  return (
    <div id="already-subscribed-main-container" >
    <div id="already-subscribed-container" onClick={redirect}
    className={ isLoggedUserin.cardsArrLength < 5 ? 'limit-not-reached-div' : 'limit-reached-div' } >
      <div id="as-div1" >
        <p id="plan-header">basic plan</p>
        <p id="card-number-length">
          cards created {isLoggedUserin.cardsArrLength} of 5
        </p>
      </div>
      <div id="as-div2" > 
        {isLoggedUserin.cardsArrLength < 5 && <button> { isLoggedUserin.cardsArrLength < 5 ? <EastIcon /> : <CloseIcon /> }  </button> }
      </div>
    </div>
    </div>
  );
}
