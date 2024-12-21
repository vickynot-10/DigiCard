
import {Navigate} from "react-router-dom";
import Loader from '../Reusable_components/Loader/loader';
import { useAuth } from '../../Contexts/authContext'


const ProtectedRoute = ({ children }) => {
     const { isLoggedUserin,isLoading  } = useAuth()
     if(isLoading ){
        return <Loader size={75} />
     }
        if(isLoggedUserin.isLoggedIn === false || !isLoggedUserin.isLoggedIn || isLoggedUserin.isLoggedIn === null){
            return  <Navigate to="/loginForm" replace />;
        }
        return children;
  };
  
  export default ProtectedRoute;