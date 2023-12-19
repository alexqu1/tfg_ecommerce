import React, { useState } from "react";
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function ContactaPage() {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [comentario, setComentario] = useState('');
  const [showNoResultsAlert, setShowNoResultsAlert] = useState(false);

  const contacta = (ev) => {
    ev.preventDefault();

    // Simulación de envío exitoso
    // Puedes reemplazar esto con la lógica real para enviar el formulario
    setShowNoResultsAlert(true);

    // Establecer los campos en blanco después del envío
    setNombre('');
    setApellidos('');
    setTelefono('');
    setEmail('');
    setComentario('');
  };

  return (
    <div className="contact-page">
      <form onSubmit={contacta}>
        <h1 style={{ fontSize: '40px' }}>CONTACTA </h1>
        <TextField
          type="text"
          id="outlined-basic"
          label="Nombre"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={nombre}
          onChange={(ev) => setNombre(ev.target.value)}
        />

        <TextField
          type="text"
          id="outlined-basic"
          label="Apellidos"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={apellidos}
          onChange={(ev) => setApellidos(ev.target.value)}
        />

        <TextField
          type="text"
          id="outlined-basic"
          label="Telefono"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={telefono}
          onChange={(ev) => setTelefono(ev.target.value)}
        />

        <TextField
          type="text"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />

        <TextField
          type="text"
          id="outlined-basic"
          label="Comentario"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={comentario}
          onChange={(ev) => setComentario(ev.target.value)}
        />

        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>

      {showNoResultsAlert && (
        <Alert severity="success" color="success">
          Email Enviado con éxito
        </Alert>
      )}
    </div>
  );
}
