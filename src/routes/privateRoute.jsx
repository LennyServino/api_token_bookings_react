import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('user_email_bookings'); // Verifica si el usuario está autenticado

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;