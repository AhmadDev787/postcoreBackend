import axios from "axios";
if (!process.env.FRONTEND_URL) {
  throw new Error("Frontend Url is missing in env");
}

const apiReq = axios.create({
  baseURL: process.env.FRONTEND_URL,
  timeout: 15000,
});

export default apiReq;
