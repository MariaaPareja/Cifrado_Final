import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/LoginForm.css'; // Asegúrate de crear un archivo CSS para los estilos

function LoginForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = async () => {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        alert("Inicio de sesión exitoso");
        // Redirigir a la página principal
        navigate('/cities');
      } else {
        alert("Credenciales inválidas");
      }
    }
  
    return (
      <div className="login-container">
        <div className="logo-container">
          <img src="logoUrban.png" alt="UrbanGo Logo" className="logo" />
          <p>Conoce más lugares, sé feliz.</p>
        </div>
        <div className="login-form">
          <h2>BIENVENIDO</h2>

          <input type="text" placeholder="Email" className="input-field" 
          value={email} onChange={(e) => setEmail(e.target.value)}
          />

          <input type="password" placeholder="Contraseña" className="input-field"
          value={password} onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-button" onClick={handleLogin}>INGRESAR</button>
          <p>Aún no tiene una cuenta</p>
          <p><Link to="/register">REGISTRARSE</Link></p>
        </div>
      </div>
    );
  }
  
  export default LoginForm;
