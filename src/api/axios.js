import axios from "axios";

const api = axios.create({
    baseURL: "https://backend.zhennatural.com/api/v2",
    withCredentials: true,
});

export default api;
