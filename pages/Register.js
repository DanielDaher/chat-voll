import { useState } from "react";

export default function Register() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main className='register'>
      <h1>Crie sua conta agora mesmo</h1>
      <p>Preencha suas informações</p>
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
    </main>
  );
}