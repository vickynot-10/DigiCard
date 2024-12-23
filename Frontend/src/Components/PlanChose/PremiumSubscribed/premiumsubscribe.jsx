import '../BasicSubscribed/basicsubscribe.css'
import { useAuth } from "../../../Contexts/authContext";
import { useNavigate } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import CloseIcon from '@mui/icons-material/Close';

export default function PremiumSubscribed() {
  const navigate = useNavigate();
  const { isLoggedUserin } = useAuth();
  function redirect(){
    if(isLoggedUserin.cardsArrLength < 10){
        navigate('/premium-plan',{
            state : 'premium'
        })
        return
    }
   
  }
  return (
    <div id="already-subscribed-container" onClick={redirect}
    className={ isLoggedUserin.cardsArrLength < 10 ? 'limit-not-reached-div' : 'limit-reached-div' } >
      <div id="as-div1" >
        <p id="plan-header">premium plan</p>
        <p id="card-number-length">
          cards created {isLoggedUserin.cardsArrLength} of 10
        </p>
      </div>
      <div id="as-div2" > 
        {isLoggedUserin.cardsArrLength < 10 && <button> { isLoggedUserin.cardsArrLength < 10 ? <EastIcon /> : <CloseIcon /> }  </button> }
      </div>
    </div>
  );
}
