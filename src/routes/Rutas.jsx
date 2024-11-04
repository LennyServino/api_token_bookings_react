import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Accomodations from "../components/Accomodations";
import Calendar from "../components/Calendar";
import BookingDetail from "../components/BookingDetail";

export default function Rutas() {
  return (
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/alojamientos" element={<Accomodations />}></Route>
        <Route path="/calendario" element={<Calendar />}></Route>
        <Route path="/reserva" element={<BookingDetail />} />
      </Routes>
  );
}
