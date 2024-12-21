import './signupform.css';
import { usePage } from '../../../Contexts/Pagehandling';
import Page1 from './Page1/Page1';
import Page2 from './Page2/page2';
import Page3 from './Page3/page3';
import Page4 from './Page4/page4';
import { useState } from 'react';
import axios from 'axios';

export default function SignUpForm(){
    const {pageNum,setPageNum,pageindex}  = usePage()
    const [userdetails,setUserdetails] = useState({
        mail : '' , username : '' , password : ''
    })
    function savingDetails(e){
        const {name,value} = e.target
        setUserdetails((prev)=>({
            ...prev ,
            [name] : value
        }))
    }

    async function submittingForm(e){
        e.preventDefault();
        try{
            let res = await axios.post(`${process.env.REACT_APP_URL}/signup`,userdetails);
            console.log(res)
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div id="signup-container">
            <div id="signup-div">
                <div id="signup-main">
                    <div id='signup-form'> 
                        <form onSubmit={submittingForm}  >
                        <input type='text' required onChange={savingDetails} value={userdetails.username} name='username'  />
                        <input type='password' required onChange={savingDetails} value={userdetails.password} name='password' />
                        <input type='email' onChange={savingDetails} required value={userdetails.mail} name='mail' />
                        <button type='submit'>Submit</button>
                        </form>
                        {/* { pageindex === 0 && <Page1 /> }
                        { (pageindex === 1 && pageNum[1]!== false ) && <Page2 /> }
                        { (pageindex === 2 && pageNum[2]!== false ) && <Page3 /> }
                        { (pageindex === 3 && pageNum[3]!== false ) && <Page4 /> } */}

                        
                        
                     </div>
                </div>
            </div>
        </div>
    )
}