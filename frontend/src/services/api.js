import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Backend URL

// İşletme bilgilerini backend'e gönderen fonksiyon
export const sendBusinessInfo = async (data) => {
    const response = await axios.post(`${API_URL}/send-business-info`, data);
    return response.data;
};
