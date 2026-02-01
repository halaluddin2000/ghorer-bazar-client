import axios from "axios";

const api = axios.create({
    baseURL: "https://backend.zhenaura.net/api/v2",
    headers: {
        "Content-Type": "application/json",
    },

});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    const tempUserId = localStorage.getItem("temp_user_id");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else if (tempUserId) {
        config.headers["temp-user-id"] = tempUserId;
    }

    return config;
});

export default api;
