import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Accomodations from "../components/Accomodations";
import Calendar from "../components/Calendar";
import BookingDetail from "../components/BookingDetail";
import PrivateRoute from "./privateRoute";

export default function Rutas({ user }) {

  return (
      <Routes>
        <Route path="/alojamientos" element={
          <PrivateRoute>
            <Accomodations />
          </PrivateRoute>
        } />

        <Route path="/calendario" element={
          <PrivateRoute>
            <Calendar />
          </PrivateRoute>
        } /> 

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calendario" element={<Calendar/>} />
        <Route path="*" element={<Navigate to={user ? '/' : '/login'} />} />
      </Routes>
  );
}
