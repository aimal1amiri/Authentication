import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape.jsx";
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LoginPage.jsx";
import EmailVerifyPage from "./pages/EmailVerifyPage.jsx";

import {Toaster} from 'react-hot-toast'
import { useAuthenticationStore } from "./store/authentication-Store.jsx";
import { useEffect } from "react";
import HomePage from "./pages/HomePage.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";

//protecting the routes that requires authurized users only

const ProtectedRoute = ({children}) => {
  const {isAuthenticated, user} = useAuthenticationStore();

  console.log("it is protecte route authenticated: ",isAuthenticated);

  if(!isAuthenticated){
    return <Navigate to="/login" replace/>

  }
  //console.log("is verified value: ",user.isVerified);

  if(!user.isVerified){
    return <Navigate to="/verify-email" replace />
  }

  return children   
}

//this will redirect the authenticated users to the home page
const RedirectAuthenticatedUser = ({children}) => {
  const {isAuthenticated , user} = useAuthenticationStore();
  console.log("yes in redirecting");

  if(isAuthenticated && user.isVerified){
    console.log("executed the navigation part")
    return <Navigate to='/' replace />
  }
  return children;
}




function App() {
 
  const {isCheckingAuth, checkAuth, isAuthenticated, user} = useAuthenticationStore();

  useEffect(() => {
    checkAuth()
  },[checkAuth]);

  console.log("it is checkAuth: ",isCheckingAuth)

  if(isCheckingAuth) return <LoadingSpinner/>
  

  console.log("isauthentcated: ",isAuthenticated);
  console.log("user",user);


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-800 via-amber-500 to-orange-800 flex items-center justify-center relative overflow-hidden">
      
      <FloatingShape color="bg-orange-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-orange-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-orange-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <Routes>
      <Route path="/" element={<ProtectedRoute><HomePage /> </ProtectedRoute>} />
      <Route path="/signup" element={<RedirectAuthenticatedUser><SignUpPage/></RedirectAuthenticatedUser>} />
      <Route path="/login" element={<RedirectAuthenticatedUser><LoginPage/></RedirectAuthenticatedUser>}/>
      <Route path="/verify-email" element={<EmailVerifyPage/>} />
      <Route path='/forgot-password' element={<RedirectAuthenticatedUser>
        <ForgotPasswordPage />
      </RedirectAuthenticatedUser>} />
      </Routes>

      <Toaster/>

    </div>

   
  );
}

export default App
