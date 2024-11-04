import { useEffect, useState } from "react";
import { getAccomodations } from "../../services/accomodationServices";
import { postBooking } from "../../services/bookingServices";
import { getUsers } from "../../services/userServices";
import "../../styles/NewBookingModal.css";

export const NewBookingModal = ({ onClose }) => {
  const [accomodations, setAccomodations] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedAccomodation, setSelectedAccomodation] = useState("");
  const [guest, setGuest] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const sessionToken = sessionStorage.getItem("token_bookings");
      if (sessionToken) {
        fetchData(sessionToken);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const userEmail = sessionStorage.getItem("user_email_bookings");
    const user = users.find((item) => item.email === userEmail);
    if (user) {
      setGuest(user.name); // Set the guest field to the user's name
    }
  }, [users]);

  const fetchData = async (token) => {
    const response = await getAccomodations(token);
    setAccomodations(response);
    const responseUsers = await getUsers();
    setUsers(responseUsers);
  };

  const generateBookingId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let bookingId = "BK";
    for (let i = 0; i < 8; i++) {
      bookingId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return bookingId;
  };

  const handleSave = async () => {
    setError("");
    if (new Date(endDate) <= new Date(startDate)) {
      setError("The check out date field must be a date after check in date.");
      return;
    }

    const userEmail = sessionStorage.getItem("user_email_bookings");

    const bookingData = {
      booking: generateBookingId(),
      check_in_date: startDate,
      check_out_date: endDate,
      total_amount: totalAmount,
      accomodation_id: accomodations.find(
        (item) => item.name === selectedAccomodation
      )?.id,
      user_id: users.find((item) => item.email === userEmail)?.id,
    };

    try {
      const response = await postBooking(bookingData);
      onClose();
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title">Nueva Reservación</h1>
          <button className="close-button" onClick={onClose}>
            x
          </button>
        </div>

        <label className="label">
          Alojamiento:
          <select
            className="select-input"
            placeholder="Seleccione alojamiento"
            onChange={(e) => setSelectedAccomodation(e.target.value)}
            value={selectedAccomodation}
          >
            {accomodations.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label className="label">
          Huésped:
          <input
            type="text"
            className="text-input"
            name="guest"
            placeholder="Nombre de huésped"
            value={guest} // Set to the user's name
            readOnly // Make the field read-only
          />
        </label>

        <div className="date-fields">
          <label className="label">
            Fecha de inicio:
            <input
              type="date"
              className="date-input"
              name="startDate"
              required
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
            />
          </label>
          <label className="label">
            Fecha de fin:
            <input
              type="date"
              className="date-input"
              name="endDate"
              required
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}
            />
          </label>
        </div>

        {error && <p className="error-message">{error}</p>}

        <label className="label">
          Monto de reserva:
          <input
            type="number"
            className="number-input"
            name="totalAmount"
            placeholder="Ingrese monto total"
            required
            onChange={(e) => setTotalAmount(e.target.value)}
            value={totalAmount}
          />
        </label>

        <div className="action-buttons">
          <button className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
          <button className="accept-button" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
