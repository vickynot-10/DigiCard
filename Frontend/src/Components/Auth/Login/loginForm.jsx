import './loginForm.css';
import { useState } from 'react';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Loader from '../../Reusable_components/Loader/loader';
import Toaster from '../../Reusable_components/Toaster/toaster';

export default function LoginForm(){
    const navigate = useNavigate()
    const [isLoading , setLoading] = useState(false)
    const [details,setDetails] = useState({
        mail : '' , password : ''
    })

    const [resData,setResData] = useState({
        isFind : false , msg : ''
    })
    const [errobj,seterrobj] = useState({
        iserr : false , msg : ''
    })

    function savingDetails(e){
        const {name,value} = e.target
        setDetails((prev)=>({
            ...prev,
            [name] : value
        }))
    }

    async function submittingForm(e){
        e.preventDefault();
        setLoading(true)
        try{
            if(details.mail.trim() === ''){
                throw new Error("Please Enter Username or Mail");
            }
            if(details.password.trim() === ''){
                throw new Error("Please Enter Password")
            }
            if(details.password.length < 8){
                throw new Error("Password must have atleast 8 characters");
            }
            if(details.password.length > 20){
                throw new Error("Password should have within 20 characters");
            }

            let res = await axios.post(`${process.env.REACT_APP_URL}/login`,details ,{
                withCredentials : true
            } );
            if(!res){
                throw new Error("An Error Occured Please Try again");
            }
            if(res.data.isFound === true){
                setResData({
                    isFind : true , msg : res.data.msg
                })
                setErrfalse()
                setTimeout(()=>{
                    navigate('/')
                    navigate(0);
                },[2000])
            }
        }catch(e){
            let errmsg = e.message || "An Error occured";
            if(e.response && e.response.data){
                errmsg = e.response.data
            }
            seterrobj({
                iserr : true , msg : errmsg
            })
            setresFalse()
        }
        finally{
            setLoading(false)
        }
    }

    function setErrfalse(){
        seterrobj({
            iserr : false , msg : ''
        })
    }
    function setresFalse(){
        setResData({
            isFind : false , msg : ''
        })
    }

    return <div id='loginform-container'>
        <div id='loginform-div'>
            <div id='loginForm-main'>
                <form onSubmit={submittingForm} >
                <div id='loginform'>
                    <div id='login-header' >
                        <p> Welcome </p>
                    </div>
                    <div id='login-input-div' >
                        <label htmlFor='username-login'> User Name / Mail </label>
                        <div>
                           <span> <PersonOutlinedIcon /> </span>
                            <input placeholder='Type Here' type='text' required onChange={savingDetails} id='username-login' name='mail' value={details.mail}  />
                        </div>
                    </div>
                    <div id='login-input-div' >
                        <label htmlFor='password-login'>Password </label>
                        <div>
                           <span> <HttpsOutlinedIcon /> </span>
                            <input type='password' required placeholder='Type Here' onChange={savingDetails} id='password-login' name='password' value={details.password}  />
                        </div>
                    </div>
                    <div id='forgot-pass-txt' >
                        <a href='#'>Forgot password ?</a>
                    </div>
                    <div id='login-btn-submit' >
                        <button disabled={isLoading} type='submit'> { isLoading ? <Loader size={25} color='white' /> : "LOGIN" } </button>
                    </div>
                    {
                        errobj.iserr && <Toaster  message={errobj.msg}
                        type="error"
                        onClose={setErrfalse} 
                         AutoHideDuration={5000}
                        MessagefontSize="clamp(0.765rem,0.875rem,1rem)"
                        width="100%" fontColor='white' iconColor='white'
           />
                    }
                    {
                       resData.isFind && <Toaster  message={resData.msg}
                        type="success"
                        onClose={setresFalse} 
                        AutoHideDuration={5000}
                        MessagefontSize="clamp(0.765rem,0.875rem,1rem)"
                        width="100%" fontColor='white' iconColor='white'
           />
                    }
                    <div id='signup-text-div' >
                        <a href='/signupForm'> Don't Have an account ? Sign up </a>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>
}