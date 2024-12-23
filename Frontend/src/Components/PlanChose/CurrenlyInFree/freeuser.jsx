import '../BasicSubscribed/basicsubscribe.css'
import { useAuth } from "../../../Contexts/authContext";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FreeUser() {


  useEffect(()=>{
    async function fetchdata() {
      try{
        let res = await axios.get(`${process.env.REACT_APP_URL}/all-cards`,{
          withCredentials : true
        });
        console.log(res.data)
      }catch(e){
        console.log(e)
      }
    }
    fetchdata()
  },[])

  const { isLoggedUserin } = useAuth();
  return (
    <div id="already-subscribed-main-container" >
      <div id="already-subscribed-container"
    className={ isLoggedUserin.cardsArrLength < 1 ? 'limit-not-reached-div' : 'limit-reached-div' } >
      <div id="as-div1" >
        <p id="plan-header">free plan</p>
        <p id="card-number-length">
          cards created {isLoggedUserin.cardsArrLength} of 1
        </p>
      </div>
    </div>



    </div>
    
  );
}
