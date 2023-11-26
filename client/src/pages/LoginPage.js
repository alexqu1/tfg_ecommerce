import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

// Componente para la página de inicio de sesión
export default function LoginPage() {
  // Estados para el nombre de usuario, contraseña, redirección y contexto de usuario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  // Función para manejar el inicio de sesión
  async function login(ev) {
    // Evitar que el formulario se envíe automáticamente
    ev.preventDefault();

    // Enviar una solicitud al servidor para iniciar sesión
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    // Verificar si la solicitud fue exitosa
    if (response.ok) {
      // Obtener la información del usuario y actualizar el contexto de usuario
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        // Establecer la redirección a la página principal
        setRedirect(true);
      });
    } else {
      // Mostrar una alerta en caso de credenciales incorrectas
      alert('Credenciales incorrectas');
    }
  }

  // Si la redirección es verdadera, navegar a la página principal
  if (redirect) {
    return <Navigate to={'/'} />
  }

  // JSX para renderizar el formulario de inicio de sesión
  return (
    <form className="login" onSubmit={login}>
      <h1>Iniciar Sesión</h1>
      {/* Campo de entrada para el nombre de usuario */}
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={ev => setUsername(ev.target.value)}
      />
      {/* Campo de entrada para la contraseña */}
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={ev => setPassword(ev.target.value)}
      />
      {/* Botón para iniciar sesión */}
      <button>Iniciar Sesión</button>
    </form>
  );
}
