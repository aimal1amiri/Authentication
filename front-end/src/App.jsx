import { Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape.jsx";
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LoginPage.jsx";


function App() {
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-950 via-amber-500 to-yellow-950 flex items-center justify-center relative overflow-hidden">
      
      <FloatingShape color="bg-orange-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-orange-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-orange-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <Routes>
      <Route path="/" element={"Home"} />
      <Route path="/signup" element={<SignUpPage/>} />
      <Route path="/login" element={<LoginPage/>}/>
      </Routes>

    </div>

   
  );
}

export default App