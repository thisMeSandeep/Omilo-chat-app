import React from 'react'
import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'

const App = () => {
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