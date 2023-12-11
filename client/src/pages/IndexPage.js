import Post from "../Post";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

// Componente para la página principal (índice)
export default function IndexPage() {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda
  const [searchResults, setSearchResults] = useState([]); // Estado para almacenar los resultados de la búsqueda
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNoResultsAlert, setShowNoResultsAlert] = useState(false);

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
    setShowNoResultsAlert(false);
    if (results.length === 0) {
      setShowNoResultsAlert(true);
      //alert("No se encontraron resultados.");
    }
  } catch (error) {
    console.error("Error al realizar la búsqueda:", error);
  }
};

  return (
    <div>
      <div className="imagenConBuscar">
  
      {/* Formulario de búsqueda */}
      <form onSubmit={handleSearchSubmit}>
      <h1>Estrena tu nuevo hogar</h1>
        <input
          placeholder="Búsqueda"
          type="text"
          value={searchTerm}
          className="inputindex"
          onChange={handleSearchChange}
        />
        <Button type="submit" variant="contained">
          Buscar
        </Button>
      </form>
      </div>
{/* 
      <div className="contenedorIndex">
      <div>

      </div>
      <div>
        <p>Trabajamos con todos los bancos para conseguir tu mejor hipoteca valoramos gratuitamente tu casa </p>
      </div>
      </div> */}


      {/* Mostrar alerta si no hay resultados */}
      {showNoResultsAlert && (
        <Alert severity="error" color="info">
          No se encontraron resultados.
        </Alert>
      )}

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
          
    </div>
  );
            }
