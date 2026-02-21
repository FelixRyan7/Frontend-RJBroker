import axios from "axios";

// instancia de Axios para interactuar con la API de wallet
const apiMessage = axios.create({
  baseURL: import.meta.env.VITE_MESSAGE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiMessage.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken"); // o desde cookies / store
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiMessage;