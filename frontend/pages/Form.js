import { useEffect, useState } from "react";
import Router from 'next/router';
import { createUser, makeLogin } from "../helpers/api";
import Loading from "./Loading";
import PropTypes from "prop-types";

export default function Form({ submitType }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [showError, setShowError] = useState(false);

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
      registerInfo.token ? setToken(registerInfo.token) : setShowError(registerInfo.error);
    }

    if (submitType === 'login') {
      const { loginResponse } = await makeLogin({ userName, password });
      loginResponse.token ? setToken(loginResponse.token) : setShowError(loginResponse.error);
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
      {showError && <p>{showError}</p>}
      <button
        type="submit"
        onClick={(e) => submitUserInfo(e)}
      >
        Entrar
      </button>
    </form>
  );
}

Form.propTypes = {
  submitType: PropTypes.string.isRequired,
};
