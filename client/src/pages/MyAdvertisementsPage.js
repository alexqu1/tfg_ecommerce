import React, { useEffect, useState, useContext } from "react";
import Post from "../Post";
import { UserContext } from "../UserContext";

export default function MyAdvertisementsPage() {
  const [posts, setPosts] = useState(null);
  const { userInfo } = useContext(UserContext);
// Agrega logs en otras partes de tu aplicación para rastrear userInfo
//console.log('UserInfo en MyAdvertisementsPage:', userInfo);

useEffect(() => {
    // Verificar si hay un usuario logueado antes de hacer la solicitud
    if (userInfo && userInfo.id) {
      fetch(`http://localhost:4000/findAuthor?author=${userInfo.id}`, {
        credentials: 'include',
      }).then(response => {
        response.json().then(posts => {
          setPosts(posts);
        });
      });
    }
  }, [userInfo]);
  console.log('UserInfo en MyAdvertisementsPage:', userInfo);

  return (
    <>
      {/* Verificar si hay publicaciones y mapearlas para renderizar cada una */}
      {posts && posts.length > 0 && posts.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </>
  );
  
}
