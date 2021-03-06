import { useEffect, useState } from "react";
import { createUser, makeLogin } from "../helpers/api";
import Loading from "./Loading";
import PropTypes from "prop-types";
import { redirectTo } from "../helpers/redirect";

export default function Form({ submitType }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (token && token.length > 1) {
      sessionStorage.setItem("vollChatToken", token);
      sessionStorage.setItem("vollChatUserName", userName);
      redirectTo('/webchat');
    }
  }, [token]);

  useEffect(() => {
    setLoading(false);
    setShowError(false);
  }, [userName, password]);

  const submitUserInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    let APIResponse;

    if (submitType === 'register') {
      const { registerInfo } = await createUser({ userName, password });
      APIResponse = registerInfo;
    }
    if (submitType === 'login') {
      const { loginResponse } = await makeLogin({ userName, password });
      APIResponse = loginResponse;
    }

    APIResponse.token ? setToken(APIResponse.token) : setShowError(APIResponse.error);
    setLoading(false);
  };

  return (
    <form className='homepage-form'>
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
      <button
        type="submit"
        data-testid='submit-button'
        onClick={(e) => submitUserInfo(e)}
      >
        Entrar
      </button>
      {showError && <p data-testid='show-error-message'>{showError}</p>}
      {loading && <Loading />}
    </form>
  );
}

Form.propTypes = {
  submitType: PropTypes.string.isRequired,
};
