const API_BASE_URL = "http://localhost:5000/api"; // Backend API URL'si

// Kullanıcı giriş fonksiyonu
export const loginUser = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error("Giriş başarısız! Kullanıcı adı veya şifre yanlış.");
    }

    return response.json(); // Token döner
};

// Kullanıcı profil bilgisi fonksiyonu
export const fetchUserProfile = async (token) => {
    const response = await fetch(`${API_BASE_URL}/profile`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Kullanıcı bilgileri alınamadı.");
    }

    return response.json(); // Kullanıcı bilgisi döner
};
