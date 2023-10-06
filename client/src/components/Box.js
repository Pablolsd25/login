import React, { useState } from 'react';
import '../components/Box.component.css';

export default function Box() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuario:', usuario);
    console.log('Contraseña:', contraseña);
    setUsuario('');
    setContraseña('');
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
            <p className="register-link">
              <a href="/registro" className="register-text">¿No tienes una cuenta? Regístrate</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
