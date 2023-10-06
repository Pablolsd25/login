import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../components/Box.component.css';

export default function Box() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensajeBienvenida, setMensajeBienvenida] = useState('');
  const [datosUsuario, setDatosUsuario] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/user', {
        usuario,
        password: contraseña,
      });

      if (response.status === 200) {
        // Inicio de sesión exitoso, muestra un mensaje de bienvenida
        const usuarioData = response.data;
        setMensajeBienvenida(`¡Bienvenido, ${usuarioData.usuario}!`);
        // Actualiza los datos del usuario
        setDatosUsuario(usuarioData);
      }
    } catch (error) {
      // Manejo de errores
      console.error(error);
      setMensajeBienvenida('Usuario o contraseña incorrectos');
      setDatosUsuario(null);
    }
  };

  return (
    <div className="box">
      <div className="rectangle">
        <div className="login-form">
          <h2 className="form-title">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="usuario" className="form-label">Usuario:</label>
              <input
                type="text"
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ingresa tu usuario"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contraseña" className="form-label">Contraseña:</label>
              <input
                type="password"
                id="contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="input-field"
              />
            </div>
            <button type="submit" className="submit-button">
              Ingresar
            </button>
          </form>
          {mensajeBienvenida && <p className="bienvenida">{mensajeBienvenida}</p>}
          {datosUsuario && (
            <div className="datos-usuario">
              <p>Usuario: {datosUsuario.usuario}</p>
              <p>Contraseña: {datosUsuario.password}</p>
            </div>
          )}
          <p className="register-link">
            ¿No tienes una cuenta? <Link to="/registro" className="register-text">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
