import axios from "axios";
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

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
      title: `${moment(booking.check_in_date).format('YYYY-MM-DD')} - Reservation for ${booking.user} - ${booking.accomodation}`,
      start: moment(booking.check_in_date).toDate(),
      end: moment(booking.check_out_date).toDate(),
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
    const startDate = moment(event.start).format("YYYY-MM-DD");
    const endDate = moment(event.end).format("YYYY-MM-DD");

    return {
      style: {
        backgroundColor: `#646cffaa`, // Light background for booked dates
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: "5px",
        margin: "5px 0",
        // Add more styles as needed
      },
      title: (
        <span>
          {event.title} - {startDate} to {endDate}
        </span>
      ),
    };
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      eventPropGetter={eventPropGetter}
    />
  );
};

export default MyCalendar;
