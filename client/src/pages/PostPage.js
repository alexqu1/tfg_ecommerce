

import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {formatISO9075} from "date-fns";
import {UserContext} from "../UserContext";
import {Link} from 'react-router-dom';
import { Navigate } from "react-router-dom";
import PlaceIcon from '@mui/icons-material/Place';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    // Verificar si id es null antes de hacer la solicitud
    if (id) {
      fetch(`http://localhost:4000/post/${id}`)
        .then((response) => {
          // Verificar si la respuesta es exitosa (status 200)
          if (response.ok) {
            response.json().then((postInfo) => {
              setPostInfo(postInfo);
            });
          } else {
            // Manejar errores de la solicitud, por ejemplo, mostrar un mensaje de error
            console.error(`Error fetching post: ${response.status}`);
          }
        })
        .catch((error) => {
          // Manejar errores de red u otros errores
          console.error('Error fetching post:', error);
        });
    }
  }, [id]);
  // Agregar id al array de dependencias


  const handleDelete = () => {
    fetch(`http://localhost:4000/delete/${postInfo._id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
     
      .catch((error) => {
        // Manejar errores de red u otros errores
        console.error('Error deleting post:', error);
      });
  };


  // Verificar si postInfo es nulo antes de intentar acceder a sus propiedades
  if (!postInfo) return 'Cargando...';
  
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <p className="info">
        <div className="ciudad"><PlaceIcon/>{postInfo.city}</div> 
        <time>Anuncio creado: {formatISO9075(new Date(postInfo.createdAt))}</time>
        {postInfo.author && (
          <div className="author">Anunciante: <b>{postInfo.author.username}</b></div>
        )}
      </p>
  
      {userInfo.id && postInfo.author && (
        (userInfo.username === 'admin' || userInfo.id === postInfo.author._id) && (
          <div className="botonesAdminPostpage">
            <Link className="delete-btn" to={`/MyAdvertisementsPage`}>  
              <button onClick={handleDelete}>
                <DeleteIcon/> Descartar
              </button>
            </Link>
  
            <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
              <button>
                <CreateIcon/> Editar 
              </button>
            </Link>
          </div>
        )
      )}
  
      <div className="image">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
      </div>
      <div className="contentPostPage" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
  
  
  
}
