import "./displayuserspage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../Reusable_components/Loader/loader";
import axios from "axios";
import SearchHeader from "../Reusable_components/SearchBox/searchbox";
import { useNavigate,Link } from "react-router-dom";


export default function DisplayAllUsers() {
  const { companyName } = useParams();
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState({
    isFind: false,
    data: [],
    img: null,
  });
  const [isLoading, setLoading] = useState(true);
  const [isErrobj, setErrobj] = useState({
    isErr: false,
    msg: "",
  });

  useEffect(() => {
    async function fetchData() {
      if (companyName === null) {
        setErrobj({
          isErr: true,
          msg: "Error Occured Try again",
        });
      }
      try {
        let res = await axios.get(
          `${process.env.REACT_APP_URL}/${companyName}/getUserDigi`,{
            withCredentials : true
          }
        );
        if (!res) {
          throw new Error("Error Occured");
        }

        if (res.data.isFound === true) {
          setUsersData({
            isFind: true,
            data: res.data.data,
            img: res.data.compImg,
          });
        }
      } catch (e) {
        let errmsg = e.message || "An error Occured";
        if (e.response) {
          errmsg = e.response.data;
        }
        console.log(errmsg);
        setErrobj({
          isErr: true,
          msg: errmsg,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);


  const [filterdata,setFilterdata] = useState([]);
  function SearchingValue(val){
    const lowercaseValue = val.toLowerCase();
    const matchData = usersData.data.filter((item)=>{
        return item.User_name.toLowerCase().includes(lowercaseValue);
    })
    const nonMatchValues = usersData.data.filter((item)=>{
        return !item.User_name.toLowerCase().includes(lowercaseValue);
    })
    setFilterdata([...matchData , ...nonMatchValues])
  }

  const [itemsperpage,setItemsPerpage] = useState(5);
  const totalPages = Math.ceil(usersData.data.length / itemsperpage)
   const [currentIndex,setCurrentIndex] = useState(1);
   const currentarr = filterdata.length > 0 ? filterdata : usersData.data

   const paginate = currentarr.slice(
    (currentIndex - 1) * itemsperpage , currentIndex * itemsperpage
   )

  function settngItemsPerpage(e){
    setItemsPerpage(e.target.value)
   }

   function nextPage(){
    if(currentIndex < totalPages){
        setCurrentIndex(currentIndex + 1)
    }
   }
   function prevPage(){
    if(currentIndex > 1){
        setCurrentIndex(currentIndex - 1)
    }
   }

   function redirectToweb(id){
    navigate(`/showUser/${companyName}/${id}`, {
      state : usersData.img === null ?  "Didnt upload" : usersData.img
    })
   }

  return (
    <div id="display-all-users-container">
      {isLoading && <Loader />}
      {usersData.isFind && (
        <div id="display-all-users-main">
          <div id="display-all-users-div">
            {(usersData.img !== null || !usersData.img.startsWith("Didnt")) && (
              <img
                src={`${process.env.REACT_APP_URL}/imgs${usersData.img}`}
                alt="logo"
              />
            )}
            <div id="main-users-display">
              <div id="serach-box-div-users-div">
                <SearchHeader
                onChange={SearchingValue}
                  FilterIcon={false}
                  ReverseIcon={false}
                  deleteIcon={false}
                />
              </div>

              <div id="tables-div">
                <table>
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>User Branch</th>
                      <th>User Role</th>
                      <th>User Number </th>
                      <th>User Mail </th>
                      <th> View </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginate.length > 0 &&
                      paginate.map((item) => {
                        return (
                          <tr key={item._id}>
                            <td>
                              
                              {item.User_name.trim() === ""
                                ? "Not Fill"
                                : item.User_name}
                            </td>
                            <td>
                              
                              {item.user_branch.trim() === ""
                                ? "Not Fill"
                                : item.user_branch}
                            </td>
                            <td>
                              
                              {item.User_role.trim() === ""
                                ? "Not Fill"
                                : item.User_role}
                            </td>
                            <td>
                              
                              {item.User_mobile_number.trim() === ""
                                ? "Not Fill"
                                : item.User_mobile_number}
                            </td>
                            <td>
                              
                              {item.User_mail.trim() === ""
                                ? "Not Fill"
                                : item.User_mail}
                            </td>
                            <td>
                              
                              <button onClick={()=>redirectToweb(item._id)} >
                                Click
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>

              <div id="pagination-div">
                <div id="page-sub-div">
                  <div id="selct-pages-div">
                    <span>Rows Per Page</span>
                    <select
                      onChange={settngItemsPerpage}
                     >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                    </select>
                  </div>
                 
                  <div>
                    <span>
                      Page {currentIndex} of {totalPages}
                    </span>
                  </div>

                  <div id="page-btn-div">
                    <button 
                    onClick={prevPage} disabled={currentIndex === 1}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path d="M15.41 7.66L11.83 12l3.58 4.34L14 18.25l-6-6 6-6z"></path>
                      </svg>
                    </button>
                    <button
                      onClick={nextPage}
                      disabled={currentIndex === totalPages}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path d="M8.59 16.34L12.17 12l-3.58-4.34L10 5.75l6 6-6 6z"></path>
                      </svg>
                    </button>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
