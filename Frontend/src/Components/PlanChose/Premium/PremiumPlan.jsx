import { SelectBox,MenuItem } from "../../Reusable_components/SelectBox/selectbox";
import { useState } from "react";

import {useNavigate} from 'react-router-dom'


export default function PremiumPlan() {
  const navigate = useNavigate()
  const premiumArr = [ "Logo" ,"Name and Address" ,"Contact", "Edit Pages","Social Media Links","Multiple Cards","Create 10 Cards Total" ];
  const [plan,setPlan] = useState('');
  function selectvalues(value) {
    setPlan(value);
  }
  function redirect(){
    navigate('/premium-plan',{
      state : 'premium'
    })
  }
  return (
    <div id="bp-container">
      <div id="button-card">
        <button onClick={redirect}>Create your own card</button>
      </div>
      <div id="bp-header-text">Premium</div>
      <hr className="hr-line" />
      <div id="select-box-div-bp">
      <p> Select Your Premium Plan </p>
        <SelectBox placeHolder="Choose" onChange={selectvalues} selectBoxWidth="100%" >
          <MenuItem value='₹699 - 1 Year'> ₹699 - 1 Year </MenuItem>
          <MenuItem value='₹799 - 3 Year' > ₹799 - 3 Year </MenuItem>
          <MenuItem value= '₹999 - 5 Year' > ₹999 - 5 Year </MenuItem>
        </SelectBox> 
      </div>
      <hr className="hr-line" />
      <ul id="table-bp-details">
        {premiumArr.map((item, ind) => {
          return (
            <li key={ind} >
                     <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="black"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
