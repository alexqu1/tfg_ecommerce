import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

// Componente para representar una publicación
export default function Post({ _id, title, summary, city , cover, content, createdAt, author }) {
  // JSX para renderizar la publicación
  return (
    <div className="post">
      {/* Enlace a la página de detalles de la publicación */}
      <div className="image">
        <Link to={`/post/${_id}`}>
          {/* Mostrar la imagen de la portada de la publicación */}
          <img src={`http://localhost:4000/${cover}`} alt="" />
        </Link>
      </div>
      <div className="texts">
        {/* Enlace al detalle de la publicación */}
        <Link to={`/post/${_id}`}>
         
          <h2>{title}</h2>
        </Link>
 
        <p className="info">
          {/* Enlace al perfil del autor */}
          <Link to={`/author/${author._id}`} className="author">{author.username}</Link>
          {/* Fecha de creación de la publicación */}
          <time>{formatISO9075(new Date(createdAt))}</time>
         {city}
        </p>
      
        {/* Resumen de la publicación */}
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
