import "./planchose.css";
import Basicplan from "./Basic/BasicPlan";
import PremiumPlan from "./Premium/PremiumPlan";
import Freeplan from "./Free/FreePlan";
import { useAuth } from "../../Contexts/authContext";
import BasicSubscribed from "./BasicSubscribed/basicsubscribed";
import PremiumSubscribed from "./PremiumSubscribed/premiumsubscribe";
import FreeUser from "./CurrenlyInFree/freeuser";

export default function PlanChose() {
  const { isLoggedUserin } = useAuth();
  return (
    <div id="plan-chose-container">
      <div id="plan-chose-div">
        <div id="plan-chose-main">
          {isLoggedUserin.subscription === "free" &&
            isLoggedUserin.cardsArrLength === 1 && <div > <p id="current-plan-txt" >Current plan</p> <FreeUser /> </div> }
          {isLoggedUserin.subscription === "basic" &&
            isLoggedUserin.cardsArrLength <= 5 && <div style={{width : '100%'}} > <p id="current-plan-txt"  >Current plan</p> <BasicSubscribed /> </div>}
          {isLoggedUserin.subscription === "premium" &&
            isLoggedUserin.cardsArrLength <= 10 && <div style={{width : '100%'}} > <p id="current-plan-txt"  >Current plan</p> <PremiumSubscribed /> </div> }
          {isLoggedUserin.isLoggedIn === false && (
            <>
              <Freeplan />
              <Basicplan />
              <PremiumPlan />
            </>
          )}

          {isLoggedUserin.isLoggedIn === true &&
            isLoggedUserin.subscription === "free" &&
            isLoggedUserin.cardsArrLength === 0 && (
              <>
                <Freeplan />
                <Basicplan />
                <PremiumPlan />
              </>
            )}
        </div>
      </div>
    </div>
  );
}
