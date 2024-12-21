import { useContext,createContext,useState,useEffect } from "react";
import axios from 'axios';

const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [isLoggedUserin,setUserLoggedIn] = useState({
        username : '' , isLoggedIn : false
    })

    useEffect(()=>{
        async function fetchdata() {
            try{
                let res = await axios.get(`${process.env.REACT_APP_URL}/user/me`,{
                    withCredentials : true
                });
                if(!res){
                    throw new Error("Error occured");
                }
                console.log(res)
            }catch(e){
                console.log(e)
                setUserLoggedIn({
                    username : '' , isLoggedIn : false
                })
    
            }
        }
        fetchdata()
    },[]);

    return (
        <AuthContext.Provider value={{isLoggedUserin,setUserLoggedIn}} >
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth =()=> useContext(AuthContext)