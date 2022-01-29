import { useEffect } from "react";
import Router from 'next/router';

export default function Webchat() {
  useEffect(() => {
    if (!sessionStorage.getItem('vollChatToken')) {
      Router.push('/');
    }
  }, []);
  return (
    <h1>WEBCHAT</h1>
  );
}