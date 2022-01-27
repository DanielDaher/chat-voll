import { useState } from "react";

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <nav className='login'>
      <h1>Chat Voll</h1>
      <p>Acesse sua conta para entrar no chat!</p>
      <form>
        <input
          type='text'
          placeholder="Insira seu nome de usuário"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input 
          type='password'
          placeholder="Insira sua senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Entrar</button>
      </form>
    </nav>
  );
}
