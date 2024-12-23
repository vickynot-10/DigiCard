import { SelectBox,MenuItem } from "../../Reusable_components/SelectBox/selectbox"
import {useNavigate} from 'react-router-dom'

export default function Freeplan() {
  const navigate = useNavigate()
  function redirect(){
    navigate('/free-plan',{
      state : 'free'
    })
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
      avail : true ,
      text : "Create 1 Card Total"
    },
    {
      avail: false,
      text: "Social Media Links",
    },
    {
      avail : false,
      text : "Multiple Cards"
    }
  ];
  return (
    <div id="bp-container">
      <div id="button-card">
        <button onClick={redirect} >Create your own card</button>
      </div>
      <div id="bp-header-text">Free</div>
      <hr className="hr-line" />
      <div id="select-box-div-bp">
        <p> Free Plan Provides </p>
        <SelectBox placeHolder="Options" selectBoxWidth="100%" >
          <MenuItem value='free'> Free Forever </MenuItem>
          <MenuItem value='free'> Only one page can create  </MenuItem>
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
