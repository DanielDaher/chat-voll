import { useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client';

export default function UserTyping({ userMessage }) {
  const [userTyping, setUserTyping] = useState('');
  const socketRef = useRef();

  useEffect(() => {
    const token = sessionStorage.getItem('vollChatToken');
    const userName = sessionStorage.getItem('vollChatUserName');
    socketRef.current = io(process.env.NEXT_PUBLIC_API_URL);
    
    if (userMessage !== '') {
    socketRef.current.emit('userTyping', { token, userName });
    }
    if (userMessage === '') {
      socketRef.current.emit('userTyping', { token, userName: '' });
    }
    
    socketRef.current.on('userTyping', (socketMessageResponse) => {
      if (socketMessageResponse.userName !== userName) {
        setUserTyping(socketMessageResponse.userName);
      };
    });

    return () => {
      socketRef.current.disconnect();
    }
  }, [userMessage]);

  const paragraphStyle = {
    width: '150px',
  };

  return (
    userTyping !== '' ? <p style={paragraphStyle}>{userTyping} está digitando</p> : null
  );
};