import axios from "axios";
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Importa los estilos predeterminados
import styles from "./Calendar.module.css"; // Importa los estilos personalizados

const localizer = momentLocalizer(moment);
const token = sessionStorage.getItem("token_bookings");

const fetchBookings = async (accommodationId) => {
  try {
    const formattedToken = token ? token.trim() : ""; // Asegurarse de que el token no tenga espacios adicionales
    console.log("Token:", formattedToken);
    console.log("Accommodation ID:", accommodationId);

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
      title: `Reservation for ${booking.user}`,
      start: moment.utc(booking.check_in_date).toDate(),
      end: moment.utc(booking.check_out_date).toDate(),
      status: booking.status, // Asegúrate de que el estado está en el objeto booking
    }));
  } catch (error) {
    console.error("Error fetching bookings:", error.response?.data || error.message);
    return [];
  }
};

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [accommodationId, setAccommodationId] = useState("default_id");

  useEffect(() => {
    console.log("Token:", token); // Verifica si el token es válido
    const fetchData = async () => {
      if (accommodationId) {
        const fetchedEvents = await fetchBookings(accommodationId);
        setEvents(fetchedEvents);
      }
    };

    fetchData();
  }, [accommodationId]);

  const eventPropGetter = (event) => {
    let className = "";
    if (event.status === "completed") {
      className = styles.completed;
    } else if (event.status === "pending") {
      className = styles.pending;
    } else if (event.status === "cancelled") {
      className = styles.cancelled;
    }

    return {
      className,
    };
  };

  return (
    <div className={styles.container}>
      <h1>My Calendar</h1>
      <div className={styles.calendar}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventPropGetter}
          views={["month", "week", "day"]}
          defaultView="month"
          popup
          components={{
            event: ({ event }) => (
              <span>
                <strong>{event.title}</strong>
                <br />
                {moment(event.start).format("YYYY-MM-DD")} - {moment(event.end).format("YYYY-MM-DD")}
              </span>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default MyCalendar;
