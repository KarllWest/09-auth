import axios from "axios";

function getBaseURL() {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL + "/api";
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api`;
  }
  return "http://localhost:3000/api";
}

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

export default axiosInstance;
