import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login/Login'
import Register from './Pages/Login/Register/register'
import Profile from './Pages/Profile/Profile';
import Redirect from './Pages/Redirect/Redirect';
import Expired from './Pages/ErrorPages/Expired';
import {PublicOnlyRoute,PrivateRoute} from './authorization'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={
          <PublicOnlyRoute>
          <Login />
          </PublicOnlyRoute>
          } />
        <Route path="/register" element={
           <PublicOnlyRoute>
           <Register />
           </PublicOnlyRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
          <Profile />
          </PrivateRoute>
          } />
        <Route path="/:shortUrl" element={< Redirect/>} />
        <Route path="/expired" element={< Expired/>} />
        <Route path='*' element={<Home/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
