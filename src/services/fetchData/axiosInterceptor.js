import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Se crear una instancia de axios
const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export default axiosInstance;