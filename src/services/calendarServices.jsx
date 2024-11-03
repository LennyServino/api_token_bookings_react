import axios from "axios";

// Obtenemos el token que se guarda en el sessionStorage
const getCalendarEvents = async () => {
  const token = sessionStorage.getItem('token_bookings');
  try {
    const response = await axios.get('https://apibookingsaccomodations-production.up.railway.app/api/V1/calendar', {
      headers: {
        // Agregamos el token para la autorización
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los eventos del calendario", error);
    return [];
  }
};

export { getCalendarEvents };
