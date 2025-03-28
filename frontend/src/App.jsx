import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import useUserStore from './store/userStore'

const App = () => {

  const user = useUserStore(state => state.user);
  const getUserData = useUserStore(state => state.getUserData);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getUserData(); 
      } catch (err) {
        console.log("Error fetching user data:", err);
      }
    };

    fetchUser();
  }, []); // Runs on mount

  useEffect(() => {
    if (user) {
      navigate("/dashboard"); 
    }
  }, [user]);


  return (
    <>
      <Toaster />

      {/* routes */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='dashboard' element={<Dashboard />} />
      </Routes>

    </>
  )
}

export default App