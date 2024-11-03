import axios from "axios";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./Calendar.module.css";

moment.locale("es");
const localizer = momentLocalizer(moment);
const token = sessionStorage.getItem("token_bookings");

Modal.setAppElement("#root"); // Agrega esta línea para solucionar la primera advertencia

const messages = {
  today: "Hoy",
  previous: "Anterior",
  next: "Siguiente",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "No hay eventos en este rango",
  allDay: "Todo el día",
};

const fetchBookings = async (accommodationId) => {
  try {
    const formattedToken = token ? token.trim() : "";
    if (!formattedToken) {
      console.error("Token is missing or invalid");
      return [];
    }

    const response = await axios.get(
      `https://apibookingsaccomodations-production.up.railway.app/api/V1/bookings`,
      {
        headers: {
          Authorization: `Bearer ${formattedToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data || !Array.isArray(response.data)) {
      console.error("Invalid response format from API");
      return [];
    }

    return response.data.map((booking) => ({
      title: `${booking.user} - ${booking.accomodation}`,
      start: moment(booking.check_in_date).toDate(),
      end: moment(booking.check_in_date).toDate(),
      ...booking,
    }));
  } catch (error) {
    console.error("Error fetching bookings:", error.response?.data || error.message);
    return [];
  }
};

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token_bookings");

    if (sessionToken) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const fetchData = async () => {
    const accommodationId = "default_id";
    if (accommodationId) {
      const fetchedEvents = await fetchBookings(accommodationId);
      setEvents(fetchedEvents);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className={styles.container}>
      {isAuthenticated ? (
        <>
          <div className={styles.titulo}>
            <h1>Reservaciones</h1>
            <button
              className={styles.addButton}
              onClick={() => alert("Agregar Reservación")}
            >
              + Nueva Reservación
            </button>
          </div>
          <div className={styles.calendar}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              messages={messages}
              views={["month"]}
              defaultView="month"
              popup
              onSelectEvent={handleEventClick}
            />
          </div>
          {selectedEvent && (
            <Modal
              isOpen={!!selectedEvent}
              onRequestClose={handleCloseModal}
              contentLabel="Detalles de la Reservación"
              className={styles.modal}
              overlayClassName={styles.overlay}
            >
              <button className={styles.closeButton} onClick={handleCloseModal}>
                X
              </button>
              <h2>Detalles de la Reservación</h2>
              <p><strong>Usuario:</strong> {selectedEvent.user}</p>
              <p><strong>Tipo de Acomodación:</strong> {selectedEvent.accomodation}</p>
              <p><strong>Fecha de Entrada:</strong> {moment(selectedEvent.check_in_date).format("YYYY-MM-DD")}</p>
              <p><strong>Fecha de Salida:</strong> {moment(selectedEvent.check_out_date).format("YYYY-MM-DD")}</p>
              <p><strong>Monto Total:</strong> ${selectedEvent.total_amount}</p>
              <p><strong>Estado:</strong> {selectedEvent.status}</p>
            </Modal>
          )}
        </>
      ) : (
        <h2>No estás autorizado, inicia sesión</h2>
      )}
    </div>
  );
};

export default MyCalendar;
