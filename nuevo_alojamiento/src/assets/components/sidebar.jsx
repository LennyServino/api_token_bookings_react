import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Asegúrate de importar los íconos

const Sidebar = () => {
    return (
        <div className="sidebar bg-light" style={{ width: '250px', height: '100vh', padding: '20px' }}>
            <h3>
                <i className="bi bi-grid" style={{ fontSize: '24px' }}></i> Panel de Control
            </h3>
            <div className="icon-container" style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                <i className="bi bi-house" style={{ fontSize: '30px', marginRight: '10px' }}></i>
                <div>Alojamientos</div>
            </div>
           
        </div>
    );
};

export default Sidebar;
