import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Accomodations from '../components/Accomodations'
import Calendar from '../components/Calendar'

export default function Rutas() {
    return (
        <BrowserRouter>

        <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/alojamientos' element={<Accomodations />}></Route>
            <Route path='/calendario' element={<Calendar />}></Route>
        </Routes>
        </BrowserRouter>
    )
}
