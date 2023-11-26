import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

// Componente para crear una nueva publicación
export default function CreatePost() {
  // Estados para el título, resumen, contenido, archivos y redirección
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [city, setCity] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  // Función para crear una nueva publicación
  async function createNewPost(ev) {
    // Crear un objeto FormData para enviar datos al servidor
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('city', city);
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
    
      <input
        type="text"
        placeholder={'Título'}
        value={title}
        onChange={ev => setTitle(ev.target.value)}
      />

      <input
        type="text"
        placeholder={'Resumen'}
        value={summary}
        onChange={ev => setSummary(ev.target.value)}
      />

<input
        type="text"
        placeholder={'Ciudad'}
        value={city}
        onChange={ev => setCity(ev.target.value)}
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