import { useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client';
import Router from 'next/router';
import { getMessagesFromDatabase } from "../helpers/api";
import OnlineUsers from "./OnlineUsers";
import { IoMdSend } from "react-icons/io";

export default function Webchat() {
  const [userMessage, setUserMessage] = useState('');
  const [userTyping, setUserTyping] = useState('');
  const [messages, setMessages] = useState([]);

  const socketRef = useRef();
  const chatBottomRef = useRef();

  useEffect(() => {
    const token = sessionStorage.getItem('vollChatToken');
    const userName = sessionStorage.getItem('vollChatUserName');
    if (userMessage.length > 0) {
      socketRef.current = io(process.env.NEXT_PUBLIC_API_URL);
      socketRef.current.emit('userTyping', { token, userName });
    }

    if (userMessage.length === 0) {
      socketRef.current = io(process.env.NEXT_PUBLIC_API_URL);
      socketRef.current.emit('userTyping', { token, userName: '' });
    }
    
    socketRef.current = io(process.env.NEXT_PUBLIC_API_URL);
    socketRef.current.on('userTyping', (socketMessageResponse) => {
      if (socketMessageResponse.userName !== userName) {
        setUserTyping(socketMessageResponse.userName);
      }
    })
  }, [userMessage]);

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
      chatBottomRef.current.scrollIntoView();
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

  const RenderMessage = ({ message, userName, timeStamp }) => {
    let positionOfElement = 'flex-start';
    if (userName === sessionStorage.getItem('vollChatUserName')) positionOfElement = 'flex-end'
    return (
      <div
        key={userName}
        className='webchat-message'
        style={{ alignItems: positionOfElement }}
      >
        <section>
          <h3>{message}</h3>
        </section>
        <p>
          <span>{userName}</span> 
          {timeStamp.slice(0, 5)}
        </p>
      </div>
    );
  };

  return (
    <div className='webchat-screen'>
      <OnlineUsers />
      <div>
        <main>
          {messages.map(({ message, userName, timeStamp }, index) => (
            <RenderMessage key={index} message={message} userName={userName} timeStamp={timeStamp} />
          ))}
          <div ref={chatBottomRef}></div>
        </main>
        <form>
          { userTyping !== '' ? <p>{userTyping} está digitando</p> : null }
          <input
            type='text'
            value={userMessage}
            placeholder="Mensagem..."
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <button type='submit' onClick={(e) => sendMessage(e)} ><IoMdSend /></button>
        </form>
      </div>
    </div>
  );
}