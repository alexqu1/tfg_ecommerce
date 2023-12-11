import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import TextField from '@mui/material/TextField';
// Componente para crear una nueva publicación
export default function CreatePost() {
  // Estados para el título, resumen, contenido, archivos y redirección
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [city, setCity] = useState('');
  const [files, setFiles] = useState('');
  const [room, setRoom] = useState('');
  const [price, setPrice] = useState('');
  const [floor, setFloor] = useState('');
  const [meter, setMeter] = useState('');
  const [redirect, setRedirect] = useState(false);

  // Función para crear una nueva publicación
  async function createNewPost(ev) {
    // Crear un objeto FormData para enviar datos al servidor
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('city', city);
    data.set('room', room);
    data.set('price', price);
    data.set('meter', meter);
    data.set('floor', floor);
    data.set('file', files[0]);

    // Evitar que el formulario se envíe automáticamente
    ev.preventDefault();

    // Enviar una solicitud al servidor para crear una nueva publicación
    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });

    // Verificar si la solicitud fue exitosa y redirigir a la página principal
    if (response.ok) {
      setRedirect(true);
    }
  }

  // Si la redirección es verdadera, navegar a la página principal
  if (redirect) {
    return <Navigate to={'/'} />
  }


  return (
    <form onSubmit={createNewPost}>
    <h2>Crear nuevo anuncio</h2>

    <TextField
        type="text"
        id="outlined-basic"
        label="Titulo"
        variant="filled"
        margin="dense"
        maxLength="100"
        fullWidth
        onChange={ev => setTitle(ev.target.value)}
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
      {/* <input
        type="text"
        placeholder={'Título'}
        value={title}
        maxLength="100"
        onChange={ev => setTitle(ev.target.value)}
      /> */}


<TextField
        type="text"
        id="outlined-basic"
        label="Resumen"
        variant="filled"
        margin="dense"
        maxLength="150"
        fullWidth
        onChange={ev => setSummary(ev.target.value)}
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

      {/* <input
        type="text"
        placeholder={'Resumen'}
        maxLength="150"
        value={summary}

        onChange={ev => setSummary(ev.target.value)}
      /> */}


<TextField
        type="text"
        id="outlined-basic"
        label="Resumen"
        variant="filled"
        margin="dense"
     
        fullWidth
        onChange={ev => setCity(ev.target.value)}
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


{/* <input
        type="text"
        placeholder={'Ciudad'}
        value={city}
        onChange={ev => setCity(ev.target.value)}
      /> */}




<TextField
        type="text"
        id="outlined-basic"
        label="Ciudad"
        variant="filled"
        margin="dense"
     
        fullWidth
        onChange={ev => setCity(ev.target.value)}
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


{/* <input
        type="number"
        placeholder={'Precio'}
        value={price}
        onChange={ev => setPrice(ev.target.value)}
      /> */}



<TextField
        type="text"
        id="outlined-basic"
        label="Precio"
        variant="filled"
        margin="dense"
     
        fullWidth
        onChange={ev => setPrice(ev.target.value)}
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



{/* 
<input
        type="number"
        placeholder={'Metros cuadrados'}
        value={meter}
        onChange={ev => setMeter(ev.target.value)}
      /> */}




<TextField
        type="text"
        id="outlined-basic"
        label="Metros cuadrados"
        variant="filled"
        margin="dense"
     
        fullWidth
        onChange={ev => setMeter(ev.target.value)}
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
        type="text"
        id="outlined-basic"
        label="Habitaciones"
        variant="filled"
        margin="dense"
     
        fullWidth
        onChange={ev => setRoom(ev.target.value)}
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

{/* <input
        type="number"
        placeholder={'Habitaciones'}
        value={room}
        onChange={ev => setRoom(ev.target.value)}
      /> */}

{/* <input
        type="number"
        placeholder={'Planta'}
        value={floor}
        onChange={ev => setFloor(ev.target.value)}
      /> */}



<TextField
        type="text"
        id="outlined-basic"
        label="Planta"
        variant="filled"
        margin="dense"
     
        fullWidth
        onChange={ev => setFloor(ev.target.value)}
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


      <input
        type="file"
        onChange={ev => setFiles(ev.target.files)}
      />
      {/* Editor de texto enriquecido para el contenido de la publicación */}
      <Editor value={content} onChange={setContent} />
      
      <button style={{ marginTop: '5px' }}>Crear publicación</button>
    </form>
  );
}