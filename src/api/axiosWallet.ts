import axios from "axios";

const apiWallet = axios.create({
  baseURL: import.meta.env.VITE_WALLET_API_URL,
});

export default apiWallet;