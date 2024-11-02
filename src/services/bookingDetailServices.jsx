import axios from "axios";

//obtenemos el token que se guarda en el sessioStorage
//const token = sessionStorage.getItem('token_bookings');

const getBookings = async (token) => {
    try {
        const response = await axios.get('https://apibookingsaccomodations-production.up.railway.app/api/V1/bookings', {
            headers: {
                //agregamos el token para la autorizacion'
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener las reservas",error)
    }
}

const updateBookingStatus = async (id, status, token) => {
    try {
        const responseUpdateStatus = await axios.put(`https://apibookingsaccomodations-production.up.railway.app/api/V1/status_booking/${id}`, { status }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return responseUpdateStatus.data;
    } catch (error) {
        console.error("Error al actualizar la reserva",error)
    }
}

//metodo para obtener una reserva en especifico
const getBookingById = async (id, token) => {
    try {
        const dataResponse = await getBookings(token)
        const oneBooking = dataResponse.find(booking => booking.id === id)
        return oneBooking;
    } catch (error) {
        console.error("Error al obtener la reserva",error)      
    }
}

//formatear fechas de la reserva
const formatDate = (fechaISO) => {
    if (!fechaISO) return '';
    const myDate = new Date(fechaISO);
    return new Intl.DateTimeFormat('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(myDate);
};

// calcular las noches entre dos fechas
const calculateNightsBetweenDates = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInMilliseconds = end - start;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    const differenceInNights = differenceInDays - 1;
    return differenceInNights;
};

export { getBookings, getBookingById, formatDate, calculateNightsBetweenDates, updateBookingStatus };