import axios from "axios";

// instancia de Axios para interactuar con la API de users
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;