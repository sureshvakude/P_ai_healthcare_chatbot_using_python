import axios from "axios";

interface AppointmentData {
  patient_name: string;
  phone: string;
  email: string;
  reason: string;
  doctor: number | null;
  time_slot: number | null;
}

const API_URL = "https://actysuresh.pythonanywhere.com/api/appointments/";

const setAppointment = async (appointmentData: AppointmentData) => {
  try {
    const response = await axios.post(API_URL, appointmentData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error setting appointment:", error);
    throw error;
  }
};

export default setAppointment;
