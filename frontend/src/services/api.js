import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Backend adresin

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        localStorage.setItem("token", response.data.token); // Token'ı kaydet
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Giriş başarısız!";
    }
};

export const logout = () => {
    localStorage.removeItem("token");
};
