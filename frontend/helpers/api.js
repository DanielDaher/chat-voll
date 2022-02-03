const validateFields = ({ userName, password }) => {
  if (userName.length < 2 || password.length < 4) return false;
  return true;
};

export const createUser = async ({ userName, password }) => {
  const userError = 'Usuário inválido ou senha insegura';
  try {
    if (!validateFields({ userName, password })) return { registerInfo: { error: userError } };

    const url = `${process.env.NEXT_PUBLIC_API_URL}/users` /* || 'http://localhost:3001/users/' */;
    console.log('url ', url);

      const registerUser = await fetch(url, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });
      const registerInfo = await registerUser.json();
      console.log('registerInfo ', registerInfo);
      return { registerInfo };
  } catch (error) {
    console.error(error);
    return { registerInfo: { error: 'Falha ao se conectar ao banco de dados' } }
  }
};

export const makeLogin = async ({ userName, password }) => {
  const userError = 'Usuário ou senha incorretos';
  try {
    if (!validateFields({ userName, password })) return { loginResponse: { error: userError } };

    const url = `${process.env.NEXT_PUBLIC_API_URL}/login` /* || 'http://localhost:3001/users/' */;
    console.log('url ', url);
    
      const APIResponse = await fetch(url, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });
      const loginResponse = await APIResponse.json();
      console.log('loginResponse ', loginResponse);
      return { loginResponse };
  } catch (error) {
    console.error(error);
    return { loginResponse: { error: 'Falha ao se conectar ao banco de dados' } }
  }
};

export const getMessagesFromDatabase = async (token) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/messages` /* || 'http://localhost:3001/users/' */;
    console.log('url ', url);
    
      const APIResponse = await fetch(url, {
        method: "GET",
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
      });
      const { messages } = await APIResponse.json();
      console.log(messages);
      return messages;
  } catch (error) {
    console.error(error);
    return error;
  }
};
