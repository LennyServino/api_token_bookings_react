import axios from "axios";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es"; // Importa el idioma español para moment
import "react-big-calendar/lib/css/react-big-calendar.css";
import { NewBookingModal } from "../components/modals/NewBookingModal";

import styles from '../styles/Calendar.module.css'
import BookingDetail from "./BookingDetail";
import { set } from "react-hook-form";
import LoadingSpinner from "./LoadingSpinner";

moment.locale("es"); // Configura moment en español
const localizer = momentLocalizer(moment);



// Traducciones para el calendario en español
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

const waitForToken = async () => {
  let token = sessionStorage.getItem("token_bookings");
  while (!token) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    token = sessionStorage.getItem("token_bookings");
  }
  return token;
};

const fetchBookings = async (accommodationId) => {
  try {
    const token = await waitForToken();
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
      id: booking.id,
      title: `${booking.user} - ${booking.accomodation}`, // Muestra nombre completo y tipo de acomodación
      start: moment(booking.check_in_date).toDate(), // Usa check_in_date como fecha de inicio
      end: moment(booking.check_in_date).toDate(), // Usa check_in_date como fecha de fin
      ...booking, // Incluye todos los datos de la reserva para el modal
    }));
  } catch (error) {
    console.error(
      "Error fetching bookings:",
      error.response?.data || error.message
    );
    return [];
  }
};

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [accommodationId] = useState("default_id");

  //estado para abrir y cerrar el modal
  const [isModalDetailOpen, setModalDetailOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(1);

  //estado para el loading
  const [isLoading, setIsLoading] = useState(true)

  const openModalDetail = (bookingId) => {
    setSelectedBookingId(bookingId);
    //hacer que el fondo de la pagina no se pueda hacer scroll
    document.body.style.overflow = 'hidden';
    setModalDetailOpen(true)
    
  };

  const closeModalDetail = () => {
      setModalDetailOpen(false)
      //hacer que el fondo de la pagina se pueda hacer scroll
      document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const fetchData = async () => {
      if (accommodationId) {
        const fetchedEvents = await fetchBookings(accommodationId);
        setEvents(fetchedEvents);
        setIsLoading(false)
      }
    };

    fetchData();
  }, [accommodationId]);

  const eventPropGetter = (event) => {
    let className = "";
    switch (event.status) {
      case "CONFIRMED":
        className = styles.confirmado;
        break;
      case "CANCELLED":
        className = styles.cancelado;
        break;
      case "WAITING":
        className = styles.pendiente;
        break;
      default:
        className = "";
    }

    return {
      className,
      style: {
        whiteSpace: "normal",
        overflow: "visible",
        textOverflow: "clip",
      },
    };
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event); // Guarda el evento seleccionado para mostrar el modal
  };

  const handleCloseModal = () => {
    setSelectedEvent(null); // Cierra el modal
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.titulo}>
        <div>
          <h1>Reservaciones</h1>
        </div>
        <div>
          <button className={styles.addButton} onClick={openModal}>
            + Nueva Reservación
          </button>
        </div>
      </div>

      <div className={styles.calendar}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventPropGetter}
          views={["month"]} // Deja solo "month" si solo deseas esta vista
          defaultView="month"
          messages={messages}
          formats={{
            dateFormat: "D", // Formato para los días
            dayFormat: "dddd", // Formato para el día de la semana en la vista mensual
            weekdayFormat: "dddd", // Formato para los nombres de los días de la semana
            monthHeaderFormat: "MMMM YYYY", // Formato para el nombre del mes en la cabecera
          }}
          popup
          onSelectEvent={handleEventClick}
          onNavigate={() => {}} // Deshabilita la navegación al hacer clic en las fechas
          components={{
            event: ({ event }) => (
              <div className={styles.eventContent} onClick={() => openModalDetail(event.id)}>
                <div className={styles.eventTitle}>{event.title}</div>
                <div className={styles.eventAccommodation}>
                  {event.accommodation}
                </div>
              </div>
            ),
          }}
        />
      </div>
      <div className={styles.estados}>
        <div className={styles.estado1}>Confirmado.</div>
        <div className={styles.estado2}>Cancelado.</div>
        <div className={styles.estado3}>Pendiente.</div>
      </div>

      {/* Modal para mostrar los detalles de la reserva */}
      {selectedEvent && (
        <div></div>
      )}
      {isModalDetailOpen ? <BookingDetail isOpen={openModalDetail} onCloseDetail={closeModalDetail} bookingId={selectedBookingId} /> : ''}
      {isModalOpen && <NewBookingModal onClose={closeModal} />}
    </div>
  );
};

export default MyCalendar;
