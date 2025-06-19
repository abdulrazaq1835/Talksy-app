import axios from "axios";
// const BASE_URL="http://localhost:5001/api"

export const axiosInstance = axios.create({
  baseURL:import.meta.env.MODE === "development" ? "http://localhost:5001/api":"/api",
  withCredentials: true,
});