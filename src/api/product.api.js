import api from "./axios";

export const getAllProducts = async () => {
    const res = await api.get("/all-products");
    return res.data;
};
