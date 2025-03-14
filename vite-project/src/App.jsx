import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
//mechanic
import MehcanicSignup from './mechanicsignup'
import MechanicLogin from './mechaniclogin'
import MechanicHome from './mechanichome'
//user
import UserLogin from './userlogin'
import UserSignup from './usersignup'
import UserHome from './userhome'
//path
import Login from './login'
import Signup from './signup'
import Home from './home'
import MechanicDashboard from './mechanicdashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/mechanicsignup' element={<MehcanicSignup/>}></Route>
        <Route path='/mechaniclogin' element={<MechanicLogin/>}></Route>
        <Route path='/usersignup' element={<UserSignup/>}></Route>
        <Route path='/userlogin' element={<UserLogin/>}></Route>
        <Route path='/mechanichome' element={<MechanicHome/>}></Route>
        <Route path="/mechanic-dashboard" element={<MechanicDashboard />} />
        <Route path='/userhome' element={<UserHome/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
