import React, { useEffect, useState } from 'react'
import { getAccomodations } from '../services/accomodationServices'

export default function Accomodations() {
    const [accomodations, setAccomodations] = useState([])
    //estado para verificar si el usuario esta autenticado
    const [isAuthenticated, setisAuthenticated] = useState(false)

    //metodo para obtener la respuesta de la api
    const fetchData = async () => {
        const response = await getAccomodations() //si es un exito devolvera un arreglo de alojamientos
        setAccomodations(response)
    }

    useEffect(() => {
        //validamos si el token existe
        const sessionToken = sessionStorage.getItem('token_bookings')

        if(sessionToken) {
            setisAuthenticated(true)
            //va a poder visualizar los alojamientos
            fetchData()
        } else {
            setisAuthenticated(false)
        }
    }, [])

    return (
        <div>
            {/* validamos si la persona esta autenticada */}
            {
                isAuthenticated ? (
                    <>
                        <h1>Lista de alojamientos</h1>
                        <div>
                            {
                                //mapeando los alojamientos
                                accomodations.map((item) => {
                                    return (
                                        <div key={item.id}>
                                            <h3>{item.name}</h3>
                                            <img src={item.image} alt="" />
                                            <p>Direccion: {item.address}</p>
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
