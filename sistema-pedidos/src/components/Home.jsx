// src/components/Home.jsx
//Pantalla de inicio con el logo y botón para armar pedido.
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <img src="/logo.png" alt="Logo del Negocio" className="logo" />
      <h1>¡Bienvenido a Subi!</h1>
      <button onClick={() => navigate("/menu")}>Arma tu pedido</button>
    </div>
  );
}

export default Home;
