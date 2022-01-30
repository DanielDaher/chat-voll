import { useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client';
import Router from 'next/router';
import { getMessagesFromDatabase } from "../helpers/api";

export default function Webchat() {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const socketRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_API_URL);
    socketRef.current.on('message', (socketMessageResponse) => {
      setMessages([
        ...messages,
        socketMessageResponse
      ]);
    });
    return () => {
      socketRef.current.disconnect();
      buttonRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    const token = sessionStorage.getItem('vollChatToken');
    if (!token) {
      Router.push('/');
    }
    const getMessages = async () => {
      const allMessages = await getMessagesFromDatabase(token);
      setMessages(allMessages);
    }

    getMessages();
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem(('vollChatToken'));
    socketRef.current.emit('message', { message: userMessage, token });
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
        {messages.map(({ message, userName }, index) => (
          <RenderMessage key={index} message={message} userName={userName} />
        ))}
        <form>
          <input
            type='text'
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <button ref={buttonRef} type='submit' onClick={(e) => sendMessage(e)} >Enter</button>
        </form>
      </main>
    </div>
  );
}