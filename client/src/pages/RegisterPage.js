import { useState } from "react";

// Componente para la página de registro
export default function RegisterPage() {
  // Estados para el nombre de usuario y la contraseña
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Función asincrónica para manejar el registro
  async function register(ev) {
    // Evitar que el formulario se envíe automáticamente
    ev.preventDefault();

    // Enviar una solicitud al servidor para registrar al usuario
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Verificar el estado de la respuesta y mostrar una alerta
    if (response.status === 200) {
      alert('Registro exitoso');
    } else {
      alert('Error en el registro');
    }
  }

  // JSX para renderizar el formulario de registro
  return (
    <form className="register" onSubmit={register}>
      <h1>Registro</h1>
      {/* Campo de entrada para el nombre de usuario */}
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      {/* Campo de entrada para la contraseña */}
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      {/* Botón para enviar el formulario de registro */}
      <button>Registrarse</button>
    </form>
  );
}