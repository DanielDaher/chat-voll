import { useRef, useState, useEffect } from "react";
import { io } from 'socket.io-client';

export default function OnlineUsers() {
  const [users, setUsers] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    const token = sessionStorage.getItem('vollChatToken');
    const userName = sessionStorage.getItem('vollChatUserName');
    socketRef.current = io(process.env.NEXT_PUBLIC_API_URL);
    socketRef.current.emit('online-users', { userName, token });
    return () => {
      socketRef.current.disconnect(userName);
    }
  }, []);

  useEffect(() => {
    const userName = sessionStorage.getItem('vollChatUserName');
    socketRef.current = io(process.env.NEXT_PUBLIC_API_URL);
    socketRef.current.on('online-users', (socketMessageResponse) => {
      setUsers(socketMessageResponse);
    });
    return () => {
      socketRef.current.disconnect(userName);
    }
  }, [users]);

  return (
    <div>
      <h1>Online Users</h1>
      {users.map((user, index) => <p key={index}>{user.userName}</p>)}
    </div>
  );
};