import { useState } from "react";

export default function Form() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
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
  );
}
