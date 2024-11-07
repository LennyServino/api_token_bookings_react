import React, { useEffect, useState } from 'react'
import { getAccomodations } from '../services/accomodationServices'
import BookingDetail from './BookingDetail'
import LoadingSpinner from './LoadingSpinner'
import styles from '../styles/Accomodations.module.css'

//importando icons
import { FaPlusCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoInformationCircle } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

export default function Accomodations() {
    const [accomodations, setAccomodations] = useState([])
    //estado para verificar si el usuario esta autenticado
    const [isAuthenticated, setisAuthenticated] = useState(false)

    const [isLoading, setIsLoading] = useState(true)

    //estado para la paginacion
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = accomodations.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(accomodations.length / itemsPerPage)

    const handleNextPage = () => {
        if(currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if(currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [currentPage])


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
        <div className={styles.container}>
            {/* validamos si la persona esta autenticada */}
            {
                isLoading ? <LoadingSpinner /> :
                isAuthenticated ? (
                    <>
                        <div className={styles.header_accomodations}>
                            <h1>Lista de alojamientos</h1>
                            <button><FaPlusCircle /> Nuevo Alojamiento</button>
                        </div>
                        <div className={styles.card_box}>
                            {
                                //mapeando los alojamientos
                                currentItems.map((item) => {
                                    return (
                                        <div className={styles.card} key={item.id}>
                                            <section className={styles.information}>
                                                <h3>{item.name} {item.id}</h3>
                                                <p><FaLocationDot/> {item.address}</p>
                                                <p className={styles.information_text}><IoInformationCircle /> {item.description}</p>
                                            </section>
                                            <section className={styles.actions}>
                                                <span className={styles.edit_accomodation}><FaPencilAlt /></span>
                                                <span className={styles.delete_accomodation}><FaTrashAlt /></span>
                                            </section>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.pagination}>
                            <button onClick={handlePrevPage} disabled={ currentPage === 1 } >Anterior</button>
                            <span>Pagina {currentPage} de {totalPages}</span>
                            <button onClick={handleNextPage} disabled={ currentPage === totalPages } >Siguiente</button>
                        </div>
                    </>
                ) : <h2>No estas autorizado, inicia sesion</h2>
            }
        </div>
    )
}