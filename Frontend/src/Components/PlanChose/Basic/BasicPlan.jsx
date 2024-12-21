import "./BasicPlan.css";
import { SelectBox,MenuItem } from "../../Reusable_components/SelectBox/selectbox"
import { useState } from "react";

export default function Basicplan() {
  const [plan,setPlan] = useState('');
  function selectvalues(value) {
    setPlan(value);
  }
  const bpArr = [
    {
      avail: true,
      text: "Logo",
    },
    {
      avail: true,
      text: "Name and Address",
    },
    {
      avail: true,
      text: "Contact",
    },
    {
      avail : true ,
      text : "Edit Page"
    },
    {
      avail: false,
      text: "Social Media Links",
    },
  ];
  return (
    <div id="bp-container">
      <div id="button-card">
        <a href="/basic-plan">Create your own card</a>
      </div>
      <div id="bp-header-text">Basic</div>
      <hr className="hr-line" />
      <div id="select-box-div-bp">
        <p> Select Your Basic Plan </p>
        <SelectBox placeHolder="Choose" onChange={selectvalues} selectBoxWidth="100%" >
          <MenuItem value='₹99 - 1 Year'> ₹99 - 1 Year </MenuItem>
          <MenuItem value='₹299 - 3 Year' > ₹299 - 3 Year </MenuItem>
          <MenuItem value= '₹499 - 5 Year' > ₹499 - 5 Year </MenuItem>
        </SelectBox>
      </div>
      <hr className="hr-line" />
      <ul id="table-bp-details">
        {bpArr.map((item, ind) => {
          return (
            <li
              className={item.avail === false ? "li-disabled-text" : ""}
              key={ind}
            >
              {item.avail === false ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="#6c757d"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
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
              )}
              {item.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
