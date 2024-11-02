import React, { useEffect, useState } from 'react'
import { getBookings, getBookingById, formatDate, calculateNightsBetweenDates, updateBookingStatus } from '../services/bookingDetailServices'
import styles from '../styles/BookingDetail.module.css'
import { getAccomodationById } from '../services/accomodationServices'
import LoadingSpinner from './LoadingSpinner';

//importamos react icons
import { FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt, FaMoon } from "react-icons/fa";
import { FaUser } from "react-icons/fa";


export default function BookingDetail({ isOpen, onClose, bookingId }) {
    //estado para guardar una reserva en especifico
    const [booking, setBooking] = useState({})

    //estado para guardar un alojamiento en especifico
    const [accomodation, setAccomodation] = useState({})

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            const sessionToken = sessionStorage.getItem('token_bookings');

            if (sessionToken) {
                //setIsAuthenticated(true);
                fetchBookingData(sessionToken);
                clearInterval(interval);
            } else {
                setIsAuthenticated(false);
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const fetchBookingData = async (token) => {
        try {
            const bookingData = await getBookingById(bookingId, token);
            setBooking(bookingData);
            
            const accomodationData = await getAccomodationById(bookingData.accomodation_id, token);
            setAccomodation(accomodationData);
            
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    if (!isOpen) return null

    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <h2>Detalle de la reservacion</h2>
                    <button type='button' className={styles.close_button} onClick={onClose} >X</button>
                </div>
                {
                    //si accomodation esta vacio no muestro el body del modal
                    isLoading ? <LoadingSpinner />
                    :
                    <>
                        <div className={styles.modal_body}>
                            <section className={styles.booking_info}>
                                <div>
                                    <p className={styles.booking_status}><FaClock /> {booking.status}</p>
                                    <h3>{booking.accomodation}</h3>
                                    <div className={styles.booking_location}>
                                        <div>
                                            <FaLocationDot /> 
                                        </div>
                                        <div>
                                            <p>{ accomodation.address }</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.box_id}>
                                    <p>ID: {booking.booking}</p>
                                </div>
                            </section>
                            <section className={styles.section_image}>
                                    <img src={accomodation.image} alt="accomodation image" /> 
                            </section>
                            <section className={styles.guest_information}>
                                <div>
                                    <p className={styles.guest_title}>Check-in</p>
                                    <div className={styles.guest_check}>
                                        <div>
                                            <FaCalendarAlt /> 
                                        </div>
                                        <div>
                                            <p>{ formatDate(booking.check_in_date) }</p>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div>
                                    <p className={styles.guest_title}>Check-out</p>
                                    <div className={styles.guest_check}>
                                        <div>
                                            <FaCalendarAlt /> 
                                        </div>
                                        <div>
                                            <p>{ formatDate(booking.check_out_date) }</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className={styles.user_data}>
                                <div>
                                    <h3>Informacion del Huésped</h3>
                                    <p><FaUser /> {booking.user}</p>
                                </div>
                            </section>
                            <section className={styles.sumary_stay}>
                                <h3>Resumen de la estancia</h3>
                                <p><FaMoon /> {calculateNightsBetweenDates(booking.check_in_date, booking.check_out_date)}</p>
                            </section>
                        </div>
                        <div className={styles.modal_footer}>
                            <button className={styles.cancel_button}>Cancelar Reservación</button>
                            <button className={styles.close_button} onClick={onClose}>Cerrar</button>
                        </div>
                    </>   
                }
            </div>
        </div>
    )
}
