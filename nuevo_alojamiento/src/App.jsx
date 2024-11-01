import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaMapMarkerAlt, FaEdit, FaTrash } from 'react-icons/fa';
import Sidebar from './assets/components/Sidebar';
import FormularioNuevoAlojamiento from './assets/components/formularioNuevoAlojamiento';
import './App.css'; // Asegúrate de importar el CSS

const App = () => {
    const [showModal, setShowModal] = useState(false);
    const [alojamientos, setAlojamientos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const handleGuardar = (nuevoAlojamiento) => {
        if (currentIndex === -1) {
            setAlojamientos([...alojamientos, nuevoAlojamiento]);
        } else {
            const updatedAlojamientos = alojamientos.map((alojamiento, index) => 
                index === currentIndex ? nuevoAlojamiento : alojamiento
            );
            setAlojamientos(updatedAlojamientos);
        }
        setShowModal(false);
        setCurrentIndex(-1);
    };

    const handleEdit = (index) => {
        setCurrentIndex(index);
        setShowModal(true);
    };

    const handleDelete = (index) => {
        const updatedAlojamientos = alojamientos.filter((_, i) => i !== index);
        setAlojamientos(updatedAlojamientos);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className="container" style={{ marginLeft: '10px', padding: '20px', width: '100%' }}>
                <div className="d-flex justify-content-between align-items-start mb-4">
                    <h2 className="mt-0">Alojamientos</h2>
                    <button className="btn btn-primary" onClick={() => {
                        setShowModal(true);
                        setCurrentIndex(-1);
                    }}>
                        <i className="bi bi-plus"></i> Nuevo Alojamiento
                    </button>
                </div>

                <div className="row">
                    {alojamientos.length === 0 ? (
                        <div>No hay alojamientos registrados.</div>
                    ) : (
                        alojamientos.map((alojamiento, index) => (
                            <div key={index} className="col-12 mb-3">
                                <div className="card" style={{ backgroundColor: '#f8f9fa' }}>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className="card-title font-weight-bold">{alojamiento.nombre}</h5>
                                            <div>
                                                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(index)}>
                                                    <FaEdit />
                                                </button>
                                                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(index)}>
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="card-text">
                                            <FaMapMarkerAlt /> {alojamiento.direccion}
                                        </p>
                                        <p className="card-text">{alojamiento.descripcion}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {showModal && (
                    <div className="modal show d-block" style={{ backdropFilter: 'blur(5px)' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{currentIndex === -1 ? "Nuevo Alojamiento" : "Editar Alojamiento"}</h5>
                                    <button className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <FormularioNuevoAlojamiento 
                                        onGuardar={handleGuardar} 
                                        alojamiento={currentIndex !== -1 ? alojamientos[currentIndex] : null}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
