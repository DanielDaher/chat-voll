import { useRef, useState, useEffect } from "react";
import { io } from 'socket.io-client';
import { RiRadioButtonLine } from 'react-icons/ri';

export default function OnlineUsers() {
  const [users, setUsers] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    const token = sessionStorage.getItem('vollChatToken');
    const userName = sessionStorage.getItem('vollChatUserName');
    socketRef.current = io(process.env.NEXT_PUBLIC_API_URL);
    socketRef.current.emit('online-users', { userName, token });
    return () => {
      socketRef.current.disconnect();
    }
  }, []);

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_API_URL);
    socketRef.current.on('online-users', (socketMessageResponse) => {
      setUsers(socketMessageResponse);
    });
    return () => {
      socketRef.current.disconnect();
    }
  }, [users]);

  return (
    <div className='online-users'>
      <h1>Online Users</h1>
      {users.map((user, index) => (
        <div key={index}>
          <RiRadioButtonLine  className='radio-button-online'/>
          <li>{user.userName}</li>
        </div>
        ))
      }
    </div>
  );
};