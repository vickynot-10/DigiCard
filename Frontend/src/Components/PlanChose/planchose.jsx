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
            isLoggedUserin.cardsArrLength === 1 && <FreeUser />}
          {isLoggedUserin.subscription === "basic" &&
            isLoggedUserin.cardsArrLength <= 5 && <BasicSubscribed />}
          {isLoggedUserin.subscription === "premium" &&
            isLoggedUserin.cardsArrLength <= 10 && <PremiumSubscribed />}
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
