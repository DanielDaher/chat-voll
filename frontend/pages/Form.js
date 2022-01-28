import { useEffect, useState } from "react";
import Router from 'next/router';
import { createUser, makeLogin } from "../helpers/api";
import Loading from "./Loading";

export default function Form({ submitType }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (token && token.length > 1) {
      sessionStorage.setItem("vollChatToken", token);
      Router.push('/webchat');
    }
  }, [token]);

  const submitUserInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (submitType === 'register') {
      const { registerInfo } = await createUser({ userName, password });
      console.log(registerInfo);
      setToken(registerInfo.token);
    }

    if (submitType === 'login') {
      const { loginResponse } = await makeLogin({ userName, password });
      console.log(loginResponse);
      setToken(loginResponse.token);
    }
    setLoading(false);
  };

  return (
    <form>
      <input
        type='text'
        placeholder="Insira seu nome de usuário"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input 
        type='password'
        placeholder="Insira sua senha"
        onChange={(e) => setPassword(e.target.value)}
      />
      {loading && <Loading />}
      <button
        type="submit"
        onClick={(e) => submitUserInfo(e)}
      >
        Entrar
      </button>
    </form>
  );
}
