import { Link } from "react-router-dom";

export default function Header() {
    return (
     
        <header>
          <Link to="/" className="logo">Mi Blog</Link>
            <nav>
            <Link to="/login" >Iniciar Sesion</Link>
            <Link to="/register" >Registro</Link>
            </nav>
        </header> 
    )
}