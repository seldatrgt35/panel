import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/api";

export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div>
            <h2>Hoşgeldiniz!</h2>
            <button onClick={() => { logout(); navigate("/"); }}>Çıkış Yap</button>
        </div>
    );
}
