
import { useContext, useState } from "react";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';  

export default function ContactaPage() {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [comentario, setComentario] = useState('');

    return (
        <div className="contact-page">
            <h1 style={{ fontSize: '40px' }}>CONTACTA </h1>
         <TextField
        type="text"
        id="outlined-basic"
        label="Nombre"
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={ev => setNombre(ev.target.value)}
      />

<TextField
        type="text"
        id="outlined-basic"
        label="Apellidos"
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={ev => setApellidos(ev.target.value)}
      />

<TextField
        type="text"
        id="outlined-basic"
        label="Telefono"
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={ev => setTelefono(ev.target.value)}
      />


<TextField
        type="text"
        id="outlined-basic"
        label="Email"
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={ev => setEmail(ev.target.value)}
      />


<TextField
        type="text"
        id="outlined-basic"
        label="Comentario"
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={ev => setComentario(ev.target.value)}
      />
        <button>Enviar</button> 
        </div>
    )

}