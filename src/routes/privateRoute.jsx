import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!sessionStorage.getItem('token_bookings'); // Verifica si el usuario está autenticado

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;