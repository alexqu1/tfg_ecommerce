// Importar módulos y componentes necesarios de React y otras bibliotecas
import { Link } from "react-router-dom";
import { useContext, useEffect,useState  } from "react";
import { UserContext } from "./UserContext";
import Button from '@mui/material/Button';
import Post from "./Post";
// Componente funcional para el encabezado
export default function Header() {
  // Desestructurar valores del contexto de usuario
  const { setUserInfo, userInfo } = useContext(UserContext);
  
  

  // El gancho useEffect para obtener la información del perfil del usuario cuando el componente se monta
  useEffect(() => {
    // Obtener el perfil del usuario desde el servidor
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        // Establecer la información del usuario en el contexto
        setUserInfo(userInfo);
      });
    });
  }, []); // El array de dependencias vacío asegura que este efecto se ejecute solo una vez al montar




  // Función para manejar el cierre de sesión del usuario
  function logout() {
    // Realizar una solicitud POST al punto final de cierre de sesión
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });

    // Borrar la información del usuario 
    setUserInfo(null);

    // Recargar la página y redirigir a '/'
    window.location.reload();
  }

  // Obtener el nombre de usuario desde la información del usuario
  const username = userInfo?.username;

 



  return (
    <header>
      {/* Enlace a la página de inicio con el logotipo */}
      <Link to="/" className="logo">  <h3>House<span>State</span></h3></Link>

      {/* Sección de navegación */}
      <nav>
       
      <Link to="/" className="Inicio"><Button variant="text" color="inherit" > Inicio</Button></Link>

      <Link to="/ultimosPost"><Button variant="text" color="inherit">Ultimos Anuncios</Button></Link>
      <Link to="/contactaPage"><Button variant="inherit">Contacta</Button></Link>

      {username && username === 'admin' && (
  <Link to="/panelAdmin"><Button variant="outlined" color="inherit">Panel</Button></Link>
)} 


        {/* Si un usuario ha iniciado sesión */}
       <div>
        {username && (
          <>
             <Link to="/MyAdvertisementsPage"><Button variant="outlined" color="inherit">Mis anuncios publicados</Button></Link>

            <Link to="/create"><Button variant="contained">Crear nueva publicación</Button></Link>

        
            <a onClick={logout}><Button variant="contained" color="error"> Cerrar sesión ({username})</Button> </a>
          </>
        )}

        {/* Si no hay ningún usuario conectado */}
        {!username && (
          <>
       
            <Link to="/login"><Button variant="contained" style={{ color: 'black' }} color="inherit"> Iniciar sesión </Button></Link>

           
            <Link to="/register"><Button variant="contained" color="info"> Registrarse </Button></Link>
          </>
        )}
      </div>


    
      </nav>
    </header>
  );
}


