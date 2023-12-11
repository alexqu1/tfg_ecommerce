import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// Componente para la página de inicio de sesión
export default function LoginPage() {
  // Estados para el nombre de usuario, contraseña, redirección y contexto de usuario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const [showNoResultsAlert, setShowNoResultsAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  // Función para manejar el inicio de sesión
  async function login(ev) {
    // Evitar que el formulario se envíe automáticamente
    ev.preventDefault();


    //mostrar contrasena
    



    // Enviar una solicitud al servidor para iniciar sesión
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    // Verificar si la solicitud fue exitosa
    if (response.ok) {
      setShowNoResultsAlert(false);
      // Obtener la información del usuario y actualizar el contexto de usuario
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        // Establecer la redirección a la página principal
        setRedirect(true);
      });
    } else {
      // Mostrar una alerta en caso de credenciales incorrectas
      setShowNoResultsAlert(true);
    }
  }

  // Si la redirección es verdadera, navegar a la página principal
  if (redirect) {
    return <Navigate to={'/'} />;
  }

  // JSX para renderizar el formulario de inicio de sesión
  return (

    <div className="sectionLogin">
  
    <form className="login" onSubmit={login}>
      {showNoResultsAlert && (
        <Alert severity="error" color="info">
          Usuario o contraseña incorrectas
        </Alert>
      )}
      <h1>INICIAR SESION</h1>
      {/* Campo de entrada para el nombre de usuario */}
      <TextField
        type="text"
        id="outlined-basic"
        label="Usuario"
        variant="filled"
        margin="dense"
        fullWidth
        onChange={ev => setUsername(ev.target.value)}
        InputProps={{
          style: { color: 'black', 
          backgroundColor: 'white'
        },
          
        }}
        InputLabelProps={{
          style: { color: 'black', 
         
          },
        }}
      />
      {/* Campo de entrada para la contraseña */}
      <TextField
          id="outlined-password-input"
          type={showPassword ? "text" : "password"}
          label="Contraseña"
          margin="dense"
          variant="filled"
          fullWidth
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          InputProps={{
            style: { color: "black", backgroundColor: "white" },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            style: { color: "black" },
          }}
        />


      {/* Botón para iniciar sesión */}
      <button className="EnviarRegistro">Entrar a HouseState</button>
    </form>
    </div>
  );
}
