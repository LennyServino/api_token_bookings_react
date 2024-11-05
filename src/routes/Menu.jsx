import React from 'react'
import styleMenu from '../styles/Menu.module.css'
import { Link } from 'react-router-dom'

//importando iconos
import { FaHome, FaCalendar, FaSignInAlt } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

const logOut = () => {
    sessionStorage.removeItem('token_bookings')
    sessionStorage.removeItem('user_email_bookings')
    window.location.href = '/'
}

export default function Menu({ className }) {
    return (
        <nav className={className}>
            <section className={styleMenu.menu_header}>
                <p><BsFillGrid3X3GapFill /> Panel de Control</p>
                <ul className={styleMenu.menu_content}>
                    <li>
                        <Link to='/alojamientos'><FaHome /> Alojamientos</Link>
                    </li>
                    <li>
                        <Link to='/calendario' ><FaCalendar /> Reservaciones</Link>
                    </li>
                </ul>
            </section>
            <section className={styleMenu.menu_footer}>
                <ul >
                    <li>
                        <Link onClick={logOut}><FaSignInAlt /> Cerrar Sesion</Link>
                    </li>
                </ul>
            </section>
        </nav>
    )
}
