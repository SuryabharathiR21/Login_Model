import React from 'react'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register' 
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App ()  {
  return (
    <BrowserRouter>
          <Routes>
            <Route path='/Register' element={<Register/>} />
            <Route path='/Login' element={<Login/>} />
            <Route path='/Chat' element={<Chat/>} />
          </Routes>
    </BrowserRouter>
    
  )
}
