import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(userInfo => {
            setUsername(userInfo.username); // Actualizar el estado con el nombre de usuario
        })
        .catch(error => {
            console.error('Error fetching profile:', error);
        });
    }, []); // La dependencia vacía asegura que useEffect se ejecute solo una vez al montar el componente

    return (
        <header>
            <Link to="/" className="logo">Mi Blog</Link>
            <nav>
                {username ? (
                    <>
                        <Link to="/create">Crear nuevo post</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">Iniciar Sesión</Link>
                        <Link to="/register">Registro</Link>
                    </>
                )}
            </nav>
        </header>
    );
}