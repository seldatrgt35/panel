import { useState } from "react";
import { login } from "../services/api"; // Servisi içe aktar
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login(formData.email, formData.password);
            alert("Giriş başarılı!");
            navigate("/dashboard"); // Giriş sonrası yönlendirme
        } catch (errMsg) {
            setError(errMsg);
        }
    };

    return (
        <div className="login-container">
            <h2>Giriş Yap</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="E-posta" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Şifre" onChange={handleChange} required />
                <button type="submit">Giriş Yap</button>
            </form>
        </div>
    );
}
