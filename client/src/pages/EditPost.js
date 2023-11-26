import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
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
    <form onSubmit={updatePost}>
      {/* Campo de entrada para el título */}
      <input
        type="text"
        placeholder={'Título'}
        value={title}
        onChange={ev => setTitle(ev.target.value)}
      />
      {/* Campo de entrada para el resumen */}
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

      {/* Campo de entrada para seleccionar archivos */}
      <input
        type="file"
        onChange={ev => setFiles(ev.target.files)}
      />
      {/* Editor de texto enriquecido para el contenido de la publicación */}
      <Editor onChange={setContent} value={content} />
      {/* Botón para actualizar la publicación */}
      <button style={{ marginTop: '5px' }}>Actualizar publicación</button>
    </form>
  );
}
