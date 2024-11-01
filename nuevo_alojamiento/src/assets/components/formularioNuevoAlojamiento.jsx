import React, { useState, useEffect } from 'react';
import './formulario.css';

const FormularioAlojamiento = ({ onGuardar, alojamiento }) => {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (alojamiento) {
            setNombre(alojamiento.nombre);
            setDireccion(alojamiento.direccion);
            setDescripcion(alojamiento.descripcion);
            // No manejamos imagen en edición, puedes añadir esa funcionalidad si es necesario
        }
    }, [alojamiento]);

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nombre || !direccion || !descripcion) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        const nuevoAlojamiento = { nombre, direccion, descripcion };
        onGuardar(nuevoAlojamiento);

        setNombre('');
        setDireccion('');
        setDescripcion('');
        setImagen(null);
    };

    return (
        <form onSubmit={handleSubmit} className="formulario">
            <h2>{alojamiento ? "Editar Alojamiento" : "Nuevo Alojamiento"}</h2>
            <hr className="linea" />
            {error && <p className="error">{error}</p>}
            <div className="campo">
                <input
                    type="text"
                    value={nombre}
                    onChange={handleInputChange(setNombre)}
                    placeholder="Nombre del Alojamiento"
                    required
                />
            </div>
            <div className="campo">
                <input
                    type="text"
                    value={direccion}
                    onChange={handleInputChange(setDireccion)}
                    placeholder="Dirección del Alojamiento"
                    required
                />
            </div>
            <div className="campo">
                <textarea
                    value={descripcion}
                    onChange={handleInputChange(setDescripcion)}
                    placeholder="Descripción"
                    required
                />
            </div>
            <div className="campo">
                <label htmlFor="imagen">Subir Imagen (PNG, JPG hasta 10MB):</label>
                <input
                    type="file"
                    id="imagen"
                    accept=".png,.jpg"
                    onChange={(e) => setImagen(e.target.files[0])}
                />
            </div>
            <div className="botones">
                <button type="button" onClick={() => {
                    setNombre('');
                    setDireccion('');
                    setDescripcion('');
                    setImagen(null);
                }}>
                    Cancelar
                </button>
                <button type="submit">{alojamiento ? "Guardar Cambios" : "Guardar"}</button>
            </div>
        </form>
    );
};

export default FormularioAlojamiento;
