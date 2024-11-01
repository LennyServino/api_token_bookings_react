import React, { useState, useEffect } from 'react';
import FormularioAlojamiento from './assets/components/formularioAlojamiento';


import { db } from './firebase/appConfig';
import { collection, getDocs } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';

const Alojamiento = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alojamientos, setAlojamientos] = useState([]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const fetchAlojamientos = async () => {
        const alojamientosCollection = collection(db, 'alojamientos');
        const alojamientosSnapshot = await getDocs(alojamientosCollection);
        const alojamientosList = alojamientosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAlojamientos(alojamientosList);
    };

    useEffect(() => {
        fetchAlojamientos();
    }, []);

    const addAlojamiento = (nuevoAlojamiento) => {
        setAlojamientos(prev => [...prev, nuevoAlojamiento]);
    };

    return (
        <div className="container mt-4">
            <button className="btn btn-primary mb-3" onClick={handleOpenModal}>Nuevo Alojamiento</button>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <FormularioNuevoAlojamiento onClose={handleCloseModal} addAlojamiento={addAlojamiento} />
                </Modal>
            )}
            <h2>Alojamientos Registrados</h2>
            <div className="list-group">
                {alojamientos.map(alojamiento => (
                    <div key={alojamiento.id} className="list-group-item list-group-item-action">
                        <h5 className="mb-1">{alojamiento.nombre}</h5>
                        <p className="mb-1">{alojamiento.direccion}</p>
                        <small>{alojamiento.descripcion}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Alojamiento;
