import axios from "axios"

//obtenemos el token que se guarda en el sessioStorage
//const token = sessionStorage.getItem('token_bookings')

const getAccomodations = async (token) => {
    try {
        const response = await axios.get('https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodations', {
            headers: {
                //agregamos el token para la autorizacion'
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error("Error al obtener los alojamientos",error)
    }
}

const getAccomodationById = async (id, token) => {
    try {
        const dataAccomodationResponse = await getAccomodations(token)
        const oneAccomodation = dataAccomodationResponse.find(accomodation => accomodation.id === id)
        return oneAccomodation;
    } catch (error) {
        console.error("Error al obtener el alojamiento",error);
    }
}

export { getAccomodations, getAccomodationById }