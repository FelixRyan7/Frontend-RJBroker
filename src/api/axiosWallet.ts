import axios from "axios";

// instancia de Axios para interactuar con la API de wallet
const apiWallet = axios.create({
  baseURL: import.meta.env.VITE_WALLET_API_URL,
});

export default apiWallet;