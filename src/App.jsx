import { useEffect } from "react";
// ❌ Remover esta linha: import { db } from "./firebase";

export default function App() {
    useEffect(() => {
        console.log("🔥 Firebase conectado");
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>🚀 Hub – ThePortfolioWebsite</h1>
            <p>✅ Firebase configurado com sucesso</p>
        </div>
    );
}
