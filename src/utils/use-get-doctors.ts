import axios from 'axios';

const API_URL = 'https://actysuresh.pythonanywhere.com/api/doctors/';

const getDoctors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

export default getDoctors;
