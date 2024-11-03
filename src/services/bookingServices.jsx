import axios from "axios";

//obtenemos el token que se guarda en el sessioStorage
const token = sessionStorage.getItem("token_bookings");

// New function to create a booking
const postBooking = async (bookingData) => {
  try {
    const response = await axios.post(
      "https://apibookingsaccomodations-production.up.railway.app/api/V1/booking",
      bookingData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear la reservación", error);
  }
};

export { postBooking };
