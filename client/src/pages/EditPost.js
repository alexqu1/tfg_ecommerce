import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Editor from "../Editor";

// Componente para editar una publicación existente
export default function EditPost() {
  // Obtener el parámetro de la URL que representa el ID de la publicación
  const { id } = useParams();

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

  // Efecto para cargar la información de la publicación al montar el componente
  useEffect(() => {
    // Hacer una solicitud al servidor para obtener la información de la publicación
    fetch(`http://localhost:4000/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          // Actualizar los estados con la información de la publicación
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
          setCity(postInfo.city);
          setRoom(postInfo.room);
          setPrice(postInfo.price);
          setMeter(postInfo.meter);
          setFloor(postInfo.floor);
        });
      });
  }, [id]); // El ID como dependencia para recargar la información cuando cambia

  // Función para actualizar la publicación
  async function updatePost(ev) {
    // Evitar que el formulario se envíe automáticamente
    ev.preventDefault();

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
    data.set('id', id);

    // Agregar el archivo seleccionado, si hay alguno
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }

    // Enviar una solicitud al servidor para actualizar la publicación
    const response = await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });

    // Verificar si la solicitud fue exitosa y redirigir a la página de detalles de la publicación
    if (response.ok) {
      setRedirect(true);
    }
  }

  // Si la redirección es verdadera, navegar a la página de detalles de la publicación
  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  // JSX para renderizar el formulario de edición de la publicación
  return (
    <form className='crearanuncio' onSubmit={updatePost}>
      <h2>Editar anuncio</h2>
      {/* Campo de entrada para el título */}
      <TextField
        type="text"
        id="outlined-basic"
        label="Titulo"
        variant="filled"
        value={title}
        required
        margin="dense"
        maxLength="100"
        fullWidth
        onChange={ev => setTitle(ev.target.value)}
        inputProps={{ maxLength: 100 }}
        InputProps={{
          style: {
            color: 'black',
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
        required
        margin="dense"
        value={summary}

        fullWidth
        onChange={ev => setSummary(ev.target.value)}
        inputProps={{ maxLength: 130 }}
        InputProps={{
          style: {
            color: 'black',
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
        label="ciudad"
        variant="filled"
        margin="dense"
        value={city}
        required
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
        value={city}
        required
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
        value={price}
        required
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
        required
        value={meter}
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
        required
        margin="dense"
        value={room}
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
        required
        value={floor}
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

      {/* Campo de entrada para seleccionar archivos */}
      <input
        type="file"
        
        onChange={ev => setFiles(ev.target.files)}
      />
      {/* Editor de texto enriquecido para el contenido de la publicación */}
      <Editor onChange={setContent} value={content} />
      {/* Botón para actualizar la publicación */}
      <button style={{ marginTop: '5px' }}>Actualizar </button>
    </form>
  );
}
