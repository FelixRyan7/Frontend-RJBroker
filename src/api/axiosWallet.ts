import axios from "axios";

// instancia de Axios para interactuar con la API de wallet
const apiWallet = axios.create({
  baseURL: import.meta.env.VITE_WALLET_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiWallet.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken"); // o desde cookies / store
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiWallet;