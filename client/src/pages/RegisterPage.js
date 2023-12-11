import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Componente para la página de registro
export default function RegisterPage() {
  // Estados para el nombre de usuario y la contraseña
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const [showNoResultsAlert, setShowNoResultsAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      setRedirect(true);
    } else {
      //return <Navigate to={'/login'} />;
      setShowNoResultsAlert(true);
    }
  }


  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  // JSX para renderizar el formulario de registro
  return (
    
    <div className="sectionRegister">
    <form className="register" onSubmit={register}>
      <h1>REGISTRO</h1>

      {showNoResultsAlert && (
        <Alert severity="error" color="info">
          !Error! Este usuario ya existe
        </Alert>
      )}

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

    
        <button className="EnviarRegistro">¡Vamos para dentro!</button>
    </form>
    </div>
  );
}