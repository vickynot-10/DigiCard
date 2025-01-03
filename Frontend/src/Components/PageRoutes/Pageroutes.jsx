import { Route,Routes ,useLocation} from "react-router-dom";
import Home from "../Home/home";
import NavBar from "../NavBar/nav";
import { lazy,Suspense } from "react";
import Loader from "../Reusable_components/Loader/loader";
import ProtectedRoute from "../ProtectedRoutes/proctectedroutes";
import LoginForm from "../Auth/Login/loginForm";
import SignUpForm from "../Auth/Signup/signupForm";



// CONTEXTS

import { AuthContextProvider } from "../../Contexts/authContext";


//COMPONENTS
const PlanChose = lazy(() => import("../PlanChose/planchose"));
const BasicplanPage = lazy(() => import("../BasicPlanPage/basicPlanPage"));
const PremiumPlanPage = lazy(() => import("../PremiumPlanPage/premiumplanpage"));
const BasicPlanDisplayDetails = lazy(() => import("../BasicPlanPage/BasicplanDisplayCard/basicplandisplay"));
const EditPageComponent = lazy(()=> import('../EditDigiCardpage/editpage'))

const AddnewUserToCompany = lazy(()=>import('../AddnewUser/addnewuser'))

const DisplayUsersAllComp = lazy(()=>import("../DisplayAllUserdetails/displayUserspage"));
const DisplayPageusersComp = lazy(()=>import("../DisplayUserDigi/Displayuser"));
const EditUserCardComp = lazy(()=>import("../EditUserCard/editUserCard"));

const FreePlanPageComp = lazy(()=>import("../FreePlanPage/freeplanPage"));

export default function PageRoutes(){
    const location = useLocation();
    return (
        <>
        <AuthContextProvider>
        <Suspense fallback={<Loader size={80} />} />
       
         {( location.pathname !== '/loginForm' && location.pathname !== '/signupForm' ) && <NavBar /> }
        <Routes>
        
        <Route path="/" element={<Home />} />  
        <Route path="/create-card" element={<PlanChose />} />
        <Route path="/basic-plan" element={ <ProtectedRoute> <BasicplanPage /> </ProtectedRoute> } />
        <Route path="/free-plan" element={ <ProtectedRoute> <FreePlanPageComp /> </ProtectedRoute> } />
        <Route path="/premium-plan" element={ <ProtectedRoute> <PremiumPlanPage /> </ProtectedRoute> } />
        <Route path="/getDigi/:companyName/:id" element={  <ProtectedRoute> <BasicPlanDisplayDetails />  </ProtectedRoute> } />
        <Route path="/editDigi/:companyName/:id" element={ <ProtectedRoute> <EditPageComponent /> </ProtectedRoute> } />
        <Route path="/loginForm" element={  <LoginForm />  } />
        <Route path="/signupForm" element={<SignUpForm />} />
        <Route path="/addUser/:companyName" element={ <ProtectedRoute> <AddnewUserToCompany /> </ProtectedRoute>  } />
        <Route path="/showUser/:companyName" element={ <ProtectedRoute> <DisplayUsersAllComp /> </ProtectedRoute> } />
        <Route path="/showUser/:companyName/:id" element={ <ProtectedRoute> <DisplayPageusersComp /> </ProtectedRoute> } />
        <Route path="/editUser/:id" element={ <ProtectedRoute> <EditUserCardComp /> </ProtectedRoute> } />
        
      </Routes>
      </AuthContextProvider>
        </>
    )
}