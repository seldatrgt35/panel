import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../services/api";

const Home = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Token bulunamadı. Lütfen giriş yapın.");
                }

                const userData = await fetchUserProfile(token);
                setUser(userData);
            } catch (err) {
                setError(err.message);
                localStorage.removeItem("token");
                window.location.href = "/"; // Giriş sayfasına yönlendirme
            }
        };

        fetchUser();
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!user) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Hoş Geldiniz, {user.first_name}!</h1>
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
                Çıkış Yap
            </button>
        </div>
    );
};

export default Home;
