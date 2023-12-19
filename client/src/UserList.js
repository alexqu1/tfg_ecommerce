import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

export default function User({ username, setUsers }) {
  const handleDelete = () => {
    fetch(`http://localhost:4000/borrarUser/${username}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Actualizar el estado después de la eliminación
        setUsers(prevUsers => prevUsers.filter(user => user.username !== username));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div className="userlist">
      <p>Usuario: {username}</p>
      <p>
        <Link className="ButtondeleteUser" to={`/PanelAdmin`}>
          <button onClick={handleDelete}>
            <DeleteIcon /> Eliminar
          </button>
        </Link>
      </p>
    </div>
  );
}