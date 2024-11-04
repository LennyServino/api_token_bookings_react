import React from 'react'
import styleMenu from '../styles/Menu.module.css'
import { Link } from 'react-router-dom'

//importando iconos
import { FaHome, FaCalendar, FaSignInAlt } from "react-icons/fa";

const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user_email_bookings')
    window.location.href = '/'
}

export default function Menu({ className }) {
    return (
        <nav className={className}>
            <ul>
                <li>
                    <Link to='/alojamientos'><FaHome /> Alojamientos</Link>
                </li>
                <li>
                    <Link to='/calendario' ><FaCalendar /> Reservaciones</Link>
                </li>
                <li>
                    <Link onClick={logOut}><FaSignInAlt /> Cerrar Sesion</Link>
                </li>
            </ul>
        </nav>
    )
}
