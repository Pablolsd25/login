import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Asegúrate de haber instalado axios
import '../components/Registro.component.css';

export default function Registro() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  // Función para validar la contraseña
  const validarContraseña = (password) => {
    // Requisitos de contraseña
    const requisitos = {
      longitud: password.length >= 8,
      mayuscula: /[A-Z]/.test(password),
      minuscula: /[a-z]/.test(password),
      numero: /[0-9]/.test(password),
      caracterEspecial: /[@$!%*?&]/.test(password), // Puedes personalizar esta parte
    };

    // Verifica si todos los requisitos se cumplen
    return Object.values(requisitos).every((requisito) => requisito);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Comprobar si la contraseña cumple con los requisitos
    if (validarContraseña(contraseña)) {
      // Contraseña válida, puedes continuar con el registro
      // Realiza una solicitud POST al servidor para crear un nuevo usuario
      try {
        const response = await axios.post('http://localhost:4000/user', {
          usuario,
          password: contraseña,
        });

        // Verifica la respuesta del servidor
        if (response.status === 200) {
          // Registro exitoso, redirige al usuario o muestra un mensaje de éxito
          setMensaje('Registro exitoso');

          // Redirige al componente Box después de 2 segundos (ajusta el tiempo según lo necesites)
          setTimeout(() => {
            navigate('/'); // Redirige a la página principal
          }, 2000);
        } else {
          // El servidor respondió con un mensaje de error
          setMensaje('Ocurrió un error durante el registro');
        }
      } catch (error) {
        // Manejo de errores
        console.error(error);
        setMensaje('Ocurrió un error durante el registro');
      }
    } else {
      // Contraseña no cumple con los requisitos
      setMensaje('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
    }
  };

  return (
    <div className="box">
      <div className="rectangle">
        <div className="login-form">
          <h2 className="form-title">Registro</h2>
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
            <div className="form-group">
              <label htmlFor="confirmarContraseña" className="form-label">Confirmar Contraseña:</label>
              <input
                type="password"
                id="confirmarContraseña"
                value={confirmarContraseña}
                onChange={(e) => setConfirmarContraseña(e.target.value)}
                placeholder="Confirma tu contraseña"
                className="input-field"
              />
            </div>
            <button type="submit" className="submit-button">
              Registrarse
            </button>
            <p className="mensaje">{mensaje}</p>
          </form>
        </div>
      </div>
    </div>
  );
}
