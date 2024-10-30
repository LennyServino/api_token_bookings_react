import axios from "axios";

//obtenemos el token que se guarda en el sessioStorage
const token = sessionStorage.getItem('token_bookings');

const getBookings = async () => {
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

//metodo para obtener una reserva en especifico
const getBookingById = async (id) => {
    try {
        const dataResponse = await getBookings()
        const oneBooking = dataResponse.find(booking => booking.id === id)
        return oneBooking;
    } catch (error) {
        console.error("Error al obtener la reserva",error)
        
    }
}

export { getBookings, getBookingById }