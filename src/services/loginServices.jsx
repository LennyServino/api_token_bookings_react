import axios from "axios";

//metodo para iniiar sesion
const login = async (user) => {
    try {
        //axios => es una libreria donde podemos hacer peticiones HTTP
        const response = await axios.post('https://apibookingsaccomodations-production.up.railway.app/api/V1/login', user);
        return response.data;
    } catch (error) {
        console.error("Error al autenticarse", error)
    }
}

const logout = () => {
    console.log("Has cerrado sesion");
}

export { login, logout };