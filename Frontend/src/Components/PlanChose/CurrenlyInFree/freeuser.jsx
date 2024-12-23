import '../BasicSubscribed/basicsubscribe.css'
import { useAuth } from "../../../Contexts/authContext";


export default function FreeUser() {

  const { isLoggedUserin } = useAuth();
  return (
    <div id="already-subscribed-container"
    className={ isLoggedUserin.cardsArrLength < 1 ? 'limit-not-reached-div' : 'limit-reached-div' } >
      <div id="as-div1" >
        <p id="plan-header">free plan</p>
        <p id="card-number-length">
          cards created {isLoggedUserin.cardsArrLength} of 1
        </p>
      </div>
    </div>
  );
}
