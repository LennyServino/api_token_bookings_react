import React, { useEffect, useState } from 'react'
import { getBookings, getBookingById } from '../services/bookingDetailServices'
import styles from '../styles/BookingDetail.module.css'
import { getAccomodationById } from '../services/accomodationServices'
import LoadingSpinner from './LoadingSpinner';

//importamos react icons
import { FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";


export default function BookingDetail({ isOpen, onClose }) {
    //estado para guardar una reserva en especifico
    const [booking, setBooking] = useState({})

    //estado para guardar un alojamiento en especifico
    const [accomodation, setAccomodation] = useState({})

    //useEffect para obtener la reserva en especifico
    useEffect(() => {
        const fetchBookingById = async () => {
            try {
                const bookingData = await getBookingById(2)
                setBooking(bookingData)
            } catch (error) {
                console.error(error)
            } 
        }
        fetchBookingById()
    }, [])

    //useEffect para obtener el alojamiento en especifico
    useEffect(() => {
        const fetchAccomodationById = async () => {
            try {
                const accomodationData = await getAccomodationById(booking.accomodation_id)
                setAccomodation(accomodationData)
                //console.log(accomodation);
            } catch (error) {
                console.error(error)
            } 
        }
        fetchAccomodationById()
    }, [booking])

    if (!isOpen) return null


    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <h2>Detalle de la reservacion</h2>
                    <button type='button' className={styles.close_button} onClick={onClose} >X</button>
                </div>
                {
                    //si loading es true no muestro el body del modal
                    !accomodation ? <LoadingSpinner />
                    :   
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
                                <p>Check-in</p>
                            </div>
                            <div>
                                <p>Check-out</p>
                            </div>
                        </section>
                    </div>
                }
            </div>
        </div>
    )
}
