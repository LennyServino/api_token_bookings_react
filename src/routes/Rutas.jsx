import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Accomodations from '../components/Accomodations'
import BookinDetail from '../components/BookinDetail'

export default function Rutas() {
    return (
        <BrowserRouter>

        <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/alojamientos' element={<Accomodations />}></Route>
            <Route path='/reserva' element={<BookinDetail />} />
        </Routes>
        </BrowserRouter>
    )
}
