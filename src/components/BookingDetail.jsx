import React, { useEffect, useState } from 'react'
import { getBookings } from '../services/bookingDetailServices'
import styles from '../styles/BookingDetail.module.css'

export default function BookingDetail({ isOpen, onClose }) {
    const [bookings, setBookings] = useState([])

    //estado para guardar una reserva en especifico
    const [booking, setBooking] = useState({})

    //metodo para obtener la respuesta de la api
    const fetchDataBooking = async () => {
        try {
            const response = await getBookings() //si es un exito devolvera un arreglo de alojamientos
            //console.log(response);
            setBookings(response)
            
        } catch (error) {
            console.error("Error al obtener las reservas", error)
        }
        
    }

    //metodo para filtrar y obtener una reserva en especifico
    const getBookingById = (id) => {
        const oneBooking = bookings.find(booking => booking.id === id)
        console.log(oneBooking);
        setBooking(oneBooking)
    }


    useEffect(() => {
        fetchDataBooking()
    }, [])

    useEffect(() => {
        if (bookings.length > 0) {
            getBookingById(2)
        }
    }, [bookings])

    if (!isOpen) return null

    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <button type='button' className={styles.close_button} onClick={onClose} >X</button>
                <h2>Detalle de la reservacion</h2>
                <div>
                    <h3>{booking.id}</h3>
                    <p>{booking.status}</p>
                    <p>{booking.accomodation}</p>
                    <p>{booking.user}</p>
                </div>
            </div>
        </div>
    )
}
