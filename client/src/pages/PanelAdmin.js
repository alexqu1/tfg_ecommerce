
import React, { useEffect, useState, useContext } from "react";
import User from "../UserList"; // Ajusta la ruta según tu estructura de carpetas
import { UserContext } from "../UserContext";

export default function PanelAdmin() {
  const [users, setUsers] = useState([]);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    if (userInfo && userInfo.username === "admin") {
      fetch(`http://localhost:4000/user`, {
        credentials: 'include',
      })
        .then(response => response.json())
        .then(users => {
          setUsers(users);
        })
        .catch(error => {
          console.error('Error fetching user list:', error);
        });
    }
  }, [userInfo]);

  return (
    <>
      {users.map(user => (
        <User key={user.username} username={user.username} setUsers={setUsers} />
      ))}
    </>
  );
}