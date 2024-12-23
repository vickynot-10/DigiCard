import './planchose.css';
import Basicplan from './Basic/BasicPlan';
import PremiumPlan from './Premium/PremiumPlan';
import Freeplan from './Free/FreePlan';
export default function PlanChose(){
    return (
        <div id="plan-chose-container">
            <div id="plan-chose-div">
                <div id='plan-chose-main'>
                    <Freeplan />
                    <Basicplan />
                    <PremiumPlan />
                </div>
            </div>
        </div>
    )
}