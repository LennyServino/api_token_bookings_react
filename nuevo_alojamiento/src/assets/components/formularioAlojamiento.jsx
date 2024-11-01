import React, { useState } from 'react';
import './formulario.css';
import './index.css';

const FormularioAlojamiento = ({ onGuardar, alojamiento }) => {
    const [nombre, setNombre] = useState(alojamiento ? alojamiento.nombre : '');
    const [direccion, setDireccion] = useState(alojamiento ? alojamiento.direccion : '');
    const [descripcion, setDescripcion] = useState(alojamiento ? alojamiento.descripcion : '');
    const [imagen, setImagen] = useState(null);
    const [errorNombre, setErrorNombre] = useState('');
    const [errorDireccion, setErrorDireccion] = useState('');
    const [errorDescripcion, setErrorDescripcion] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nombre || !direccion || !descripcion) {
            return; // No proceder si hay errores
        }

        const nuevoAlojamiento = { nombre, direccion, descripcion, imagen };
        onGuardar(nuevoAlojamiento);
        setNombre('');
        setDireccion('');
        setDescripcion('');
        setImagen(null);
    };

    return (
        <form onSubmit={handleSubmit} className="formulario">
            <h2>{alojamiento ? 'Editar Alojamiento' : 'Nuevo Alojamiento'}</h2>
            
            <div className="campo">
                <input 
                    type="text" 
                    value={nombre} 
                    onChange={(e) => {
                        setNombre(e.target.value);
                        if (!e.target.value) {
                            setErrorNombre('Completa este campo');
                        } else {
                            setErrorNombre('');
                        }
                    }} 
                    placeholder="Nombre del Alojamiento" 
                    required 
                />
                {errorNombre && <p className="error">{errorNombre}</p>}
            </div>
            
            <div className="campo">
                <input 
                    type="text" 
                    value={direccion} 
                    onChange={(e) => {
                        if (!nombre) {
                            setErrorDireccion('Completa el campo anterior primero');
                        } else {
                            setDireccion(e.target.value);
                            setErrorDireccion('');
                        }
                    }} 
                    placeholder={!nombre ? "Completa el campo anterior" : "Dirección del Alojamiento"} 
                    required 
                    disabled={!nombre} // Desactivar si el campo anterior está vacío
                />
                {errorDireccion && <p className="error">{errorDireccion}</p>}
            </div>
            
            <div className="campo">
                <textarea 
                    value={descripcion} 
                    onChange={(e) => {
                        if (!direccion) {
                            setErrorDescripcion('Completa el campo anterior primero');
                        } else {
                            setDescripcion(e.target.value);
                            setErrorDescripcion('');
                        }
                    }} 
                    placeholder={!direccion ? "Completa el campo anterior" : "Descripción"} 
                    required 
                    disabled={!direccion} // Desactivar si el campo anterior está vacío
                />
                {errorDescripcion && <p className="error">{errorDescripcion}</p>}
            </div>
            
            <div className="campo">
                <label htmlFor="imagen">Subir Imagen (PNG, JPG - opcional):</label>
                <input 
                    type="file" 
                    id="imagen" 
                    accept=".png,.jpg" 
                    onChange={(e) => setImagen(e.target.files[0])} 
                />
            </div>
            
            <div className="botones">
                <button type="button" className="btn btn-secondary" onClick={() => { 
                    setNombre(''); 
                    setDireccion(''); 
                    setDescripcion(''); 
                    setImagen(null); 
                }}>
                    Cancelar
                </button>
                <button type="submit" className="btn btn-primary">Guardar Registro</button>
            </div>
        </form>
    );
};

export default FormularioAlojamiento;
