import { useEffect, useState } from "react";
import { getAccomodations } from "../../services/accomodationServices";

export const NewBookingModal = ({ onClose }) => {
  const [accomodations, setAccomodations] = useState([]);

  // Fetch the list of accommodations from the API
  const fetchData = async () => {
    const response = await getAccomodations(); // Assumes this returns an array of accommodations
    setAccomodations(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>Nueva Reservación</h1>
        <button onClick={onClose}>x</button>
        <label>
          Alojamiento:
          <select>
            {accomodations.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Huésped:
          <input type="text" name="guest" required />
        </label>
        <label>
          Fecha de inicio:
          <input type="date" name="startDate" required />
        </label>
        <label>
          Fecha de fin:
          <input type="date" name="endDate" required />
        </label>
        <button onClick={onClose}>Cancelar</button>
        <button onClick={onClose}>Guardar</button>
      </div>
    </div>
  );
};
