import React, { useEffect } from 'react'
import { getBookings } from '../services/bookingDetailServices'

export default function BookinDetail() {

    //metodo para obtener la respuesta de la api
    const fetchDataBooking = async () => {
        try {
            const response = await getBookings() //si es un exito devolvera un arreglo de alojamientos
            console.log(response);
            
        } catch (error) {
            console.error("Error al obtener las reservas", error)
        }
        
    }

    useEffect(() => {
        fetchDataBooking()
    }, [])

    return (
        <div>BookinDetail</div>
    )
}
