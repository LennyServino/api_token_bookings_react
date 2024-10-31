import React, { useEffect, useState } from "react";
import { getAccomodations } from "../services/accomodationServices";

export default function NewBooking() {
  const [accomodations, setAccomodations] = useState([]);
  //estado para verificar si el usuario esta autenticado
  const [isAuthenticated, setisAuthenticated] = useState(false);

  //metodo para obtener la respuesta de la api
  const fetchData = async () => {
    const response = await getAccomodations(); //si es un exito devolvera un arreglo de alojamientos
    console.log(response);
    setAccomodations(response);
  };

  useEffect(() => {
    //validamos si el token existe
    const sessionToken = sessionStorage.getItem("token_bookings");

    if (sessionToken) {
      setisAuthenticated(true);
      //va a poder visualizar los alojamientos
      fetchData();
    } else {
      setisAuthenticated(false);
    }
  }, []);

  return (
    <div>
      {/* validamos si la persona esta autenticada */}
      {isAuthenticated ? (
        <>
          <div>
            <h1>Nueva Reservación</h1>
            <label>
              Alojamiento <input name="myInput" />
            </label>
            <label>
              Huésped <input type="text" name="guestName" />
            </label>
            <label>
              Fecha de inicio <input type="date" name="startDate" />
            </label>
            <label>
              Fecha de fin <input type="date" name="endDate" />
            </label>
            <button>Cancelar</button>
            <button>Guardar</button>
          </div>
        </>
      ) : (
        <h2>No estas autorizado, inicia sesion</h2>
      )}
    </div>
  );
}
