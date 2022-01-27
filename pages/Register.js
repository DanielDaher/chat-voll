export default function Register() {
  return (
    <main className='register'>
      <h1>Crie sua conta agora mesmo</h1>
      <p>Preencha suas informações</p>
      <form>
        <input
          type='text'
          placeholder="Insira seu nome de usuário"
        />
        <input
          type='password'
          placeholder="Insira sua senha"
        />
        <button>Entrar</button>
      </form>
    </main>
  );
}