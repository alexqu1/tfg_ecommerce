import Post from "../Post";
import { useEffect, useState } from "react";

// Componente para la página principal (índice)
export default function UsarltimosPost() {
  // Estado para almacenar la lista de publicaciones
  const [posts, setPosts] = useState([]);

  // Efecto para cargar las publicaciones cuando el componente se monta
  useEffect(() => {
    // Hacer una solicitud al servidor para obtener la lista de publicaciones
    fetch('http://localhost:4000/post').then(response => {
      response.json().then(posts => {
        // Actualizar el estado con las publicaciones obtenidas
        setPosts(posts);
      });
    });
  }, []); // El array de dependencias vacío asegura que este efecto se ejecute solo una vez al montar

 
  return (
    <>
      {/* Verificar si hay publicaciones y mapearlas para renderizar cada una */}
      {posts.length > 0 && posts.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </>
  );
}
