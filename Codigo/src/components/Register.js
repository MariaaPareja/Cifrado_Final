import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from "react";
import '../styles/Register.css';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.text();
    if (response.ok) {
      alert("Usuario registrado con éxito");
    } else {
      alert(data); // Muestra el error enviado por el servidor
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          required/>
        <label>Contraseña:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          required/>
        <button type="submit">Registrarse</button>
        <Link to="/">Volver al Inicio</Link>
      </form>
    </div>
  );
}

export default Register;
