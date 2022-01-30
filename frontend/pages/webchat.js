import { useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client';
import Router from 'next/router';
import { getMessagesFromDatabase } from "../helpers/api";

export default function Webchat() {
  const [userName, setUserName] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io('localhost:3001'); // USAR DOTENV AQUI FUTURAMENTE
    socketRef.current.on('message', (socketMessageResponse) => {
      setMessages([
        ...messages,
        socketMessageResponse
      ]);
    });
    return () => socketRef.current.disconnect();
  }, [messages]);

  useEffect(() => {
    const token = sessionStorage.getItem('vollChatToken');
    const getMessages = async () => {
      const allMessages = await getMessagesFromDatabase(token);
      setMessages(allMessages);
    }

    getMessages();
  }, []);


  useEffect(() => {
    const token = sessionStorage.getItem('vollChatToken');
    const nameOfUser = sessionStorage.getItem('vollChatUserName')
    setUserName(nameOfUser)

    if (!token || !nameOfUser) {
      Router.push('/');
    }
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem(('vollChatToken'));
    socketRef.current.emit('message', { message: userMessage, token });
    setUserMessage('');
  };

  const RenderMessage = ({ message, userName }) => {
    console.log(messages);
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
        {messages.map(({ message, userName: user }, index) => (
          <RenderMessage key={index} message={message} userName={user} />
        ))}
        <form>
          <input
            type='text'
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <button type='submit' onClick={(e) => sendMessage(e)} >Enter</button>
        </form>
      </main>
    </div>
  );
}