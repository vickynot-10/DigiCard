import { useContext,createContext,useState,useEffect } from "react";
import axios from 'axios';
const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [isLoggedUserin,setUserLoggedIn] = useState({
        username : '' , isLoggedIn : false , subscription : 'free'
    })
    const [isLoading,setloading] =useState(true)

    useEffect(()=>{
        async function fetchdata() {
            try{
                let res = await axios.get(`${process.env.REACT_APP_URL}/user/me`,{
                    withCredentials : true
                });
                if(!res){
                    throw new Error("Error occured");
                }
                if(res.data.isloggedin === true){
                    setUserLoggedIn({
                        isLoggedIn : true , username : res.data.userdata.username , subscription : res.data.userdata.subscription
                    })
                }
            }catch(e){
                setUserLoggedIn({
                    username : '' , isLoggedIn : false , subscription : 'free'
                })
    
            }
            finally{
                setloading(false)
            }
        }
        fetchdata()
    },[]);
    console.log(isLoggedUserin)

    return (
        <AuthContext.Provider value={{isLoggedUserin,setUserLoggedIn,isLoading }} >
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth =()=> useContext(AuthContext)