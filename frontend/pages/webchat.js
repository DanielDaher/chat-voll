import { useEffect, useState } from "react";
import Router from 'next/router';

export default function Webchat() {
  const [userName, setUserName] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log('useEffect');
    const token = sessionStorage.getItem('vollChatToken');
    const nameOfUser = sessionStorage.getItem('vollChatUserName')
    setUserName(nameOfUser)

    if (!token || !nameOfUser) {
      Router.push('/');
    }
  }, []);

  const saveMessages = (e) => {
    e.preventDefault();
    setMessages([...messages, userMessage]); // temporário, pois quando o backend estiver implementado, o setMessages será para pegar as mensagens de lá.
    setUserMessage('');
  };

  const RenderMessage = ({ message, userName }) => {
    return (
      <div key={userName}>
        <h3>{message}</h3>
        <p>{userName}</p>
      </div>
    );
  };

  return (
    <div>
      <h1>WEBCHAT</h1>
      <main>
        {messages.map((message, index) => <RenderMessage key={index} message={message} userName={userName} />)}
        <form>
          <input
            type='text'
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <button type='submit' onClick={(e) => saveMessages(e)} >Enter</button>
        </form>
      </main>
    </div>
  );
}