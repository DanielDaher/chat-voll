import Form from "./Form";

export default function Register() {
  return (
    <main className='register'>
      <h1>Crie sua conta agora mesmo</h1>
      <p>Preencha suas informações</p>
      <Form submitType='register'/>
    </main>
  );
}