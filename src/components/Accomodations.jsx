import React, { useEffect, useState } from 'react'
import { getAccomodations } from '../services/accomodationServices'
import BookingDetail from './BookingDetail'
import LoadingSpinner from './LoadingSpinner'
import styles from '../styles/Accomodations.module.css'

export default function Accomodations() {
    const [accomodations, setAccomodations] = useState([])
    //estado para verificar si el usuario esta autenticado
    const [isAuthenticated, setisAuthenticated] = useState(false)

    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const interval = setInterval(() => {
            //validamos si el token existe
            const sessionToken = sessionStorage.getItem('token_bookings')

            if(sessionToken) {
                setisAuthenticated(true)
                //va a poder visualizar los alojamientos
                fetchData(sessionToken)
                //setIsLoading(false)
                clearInterval(interval)
            } else {
                setisAuthenticated(false)
            }
        }, 100)
        return () => clearInterval(interval);
    }, [])

    //metodo para obtener la respuesta de la api
    const fetchData = async (token) => {
        const response = await getAccomodations(token) //si es un exito devolvera un arreglo de alojamientos
        setAccomodations(response)
        setIsLoading(false)
    }

    //estado para abrir y cerrar el modal
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(1);

    const openModal = (bookingId) => {
        setSelectedBookingId(bookingId);
        //hacer que el fondo de la pagina no se pueda hacer scroll
        document.body.style.overflow = 'hidden';
        setModalOpen(true)
        
    };
    const closeModal = () => {
        setModalOpen(false)
        //hacer que el fondo de la pagina se pueda hacer scroll
        document.body.style.overflow = 'auto';
    };

    return (
        <div /* style={{background: 'black'}} */>
            <button onClick={() => openModal(1)}>Abrir Modal</button>
            {/* validamos si la persona esta autenticada */}
            {
                isLoading ? <LoadingSpinner /> :
                isAuthenticated ? (
                    <>
                        <BookingDetail isOpen={isModalOpen} onClose={closeModal} bookingId={selectedBookingId} />
                        <h1>Lista de alojamientos</h1>
                        <div className={styles.card_box}>
                            {
                                //mapeando los alojamientos
                                accomodations.map((item) => {
                                    return (
                                        <div key={item.id}>
                                            <h3>{item.name} {item.id}</h3>
                                            <img src={item.image} alt="" />
                                            <p>Direccion: {item.address}</p>
                                            <button onClick={() => openModal(item.id)}>Detalle</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                ) : <h2>No estas autorizado, inicia sesion</h2>
            }
        </div>
    )
}