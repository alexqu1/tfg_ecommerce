import { useState } from "react";

export default function RegisterPage() {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    async function register(ev) {
          //se evita ese comportamiento predeterminado y se detiene la recarga de la página
        ev.preventDefault();


         //solicitud POST al servidor 
      const response = await fetch('http://localhost:4000/register', {
        method:'POST',
        body: JSON.stringify({username,password}),
        headers:{'Content-Type':'application/json'},
    })

      if(response.status === 200){
        alert('Registrado correctamente');
      }else{
        alert('Usuario ya existente');
      }
    
       
    }
    
    return(
        
         
        <form className="register" onSubmit={register}>
        <h1>Register</h1>
            <input type="text" placeholder="username" 
            value={username} 
            onChange={ ev => setUsername(ev.target.value)}
            />
            <input type="password" placeholder="password"
             value={password}
             onChange={ ev => setPassword(ev.target.value)}
             />
            
            <button>Register</button>
        </form>
       

    );
}