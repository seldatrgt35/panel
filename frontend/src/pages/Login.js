import React, { useState } from "react";
import { loginUser } from "../services/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Hata mesajını sıfırla

        try {
            const data = await loginUser(email, password);
            localStorage.setItem("token", data.token);
            window.location.href = "/home"; // Ana sayfaya yönlendirme
        } catch (err) {
            setError(err.message || "Bir hata oluştu.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded-lg shadow-md w-80"
            >
                <h2 className="text-2xl font-bold text-center mb-4">Giriş Yap</h2>
                {error && (
                    <div className="text-red-500 text-sm mb-4">{error}</div>
                )}
                <div className="mb-4">
                    <label className="block text-sm font-medium">E-posta</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border p-2 w-full rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Şifre</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border p-2 w-full rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
                >
                    Giriş Yap
                </button>
            </form>
        </div>
    );
};

export default Login;
