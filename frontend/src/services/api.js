const API_URL = "http://localhost:5000/api"; // Backend adresin

export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Giriş başarısız!");
        }

        localStorage.setItem("token", data.token); // Token'ı kaydet
        return data;
    } catch (error) {
        throw error.message;
    }
};

export const logout = () => {
    localStorage.removeItem("token");
};
