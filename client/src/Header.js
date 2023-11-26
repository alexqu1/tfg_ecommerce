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
  
  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda
  const [searchResults, setSearchResults] = useState([]); // Estado para almacenar los resultados de la búsqueda
  const [showSearchResults, setShowSearchResults] = useState(false);

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

 
 // Función para manejar cambios en el campo de búsqueda
 const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
};

// Función para realizar la búsqueda cuando se envía el formulario
const handleSearchSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(`http://localhost:4000/search/?search=${searchTerm}`);
    const results = await response.json();
    setSearchResults(results);
    setShowSearchResults(true);
    if (results.length === 0) {
      alert("No se encontraron resultados.");
    }
  } catch (error) {
    console.error("Error al realizar la búsqueda:", error);
  }
};


  return (
    <header>
      {/* Enlace a la página de inicio con el logotipo */}
      <Link to="/" className="logo">MyBlog</Link>

      {/* Sección de navegación */}
      <nav>
        {/* Si un usuario ha iniciado sesión */}
        {username && (
          <>
        
            <Link to="/create"><Button variant="contained">Crear nueva publicación</Button></Link>

        
            <a onClick={logout}><Button variant="contained" color="error"> Cerrar sesión ({username})</Button> </a>
          </>
        )}

        {/* Si no hay ningún usuario conectado */}
        {!username && (
          <>
       
            <Link to="/login"><Button variant="contained" color="inherit"> Iniciar sesión </Button></Link>

           
            <Link to="/register"><Button variant="contained" color="info"> Registrarse </Button></Link>
          </>
        )}


 {/* Formulario de búsqueda */}
 <form onSubmit={handleSearchSubmit}>
          <input
            placeholder="Búsqueda"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button type="submit" variant="contained">Buscar</Button>
        </form>

        {/* Mostrar resultados de búsqueda */}
        {searchResults.length > 0 && (
          <div>
            <h2>Resultados de la búsqueda:</h2>
            <ul>
              {searchResults.map((result) => (
                    <Post key={result._id} {...result} />
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}



        {/* <input placeholder="busqueda" type="text"></input>
      </nav>
    </header>
  );
} */}
