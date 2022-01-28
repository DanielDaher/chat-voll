export const createUser = async ({ userName, password }) => {
  try {
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
  }
};

export const makeLogin = async ({ userName, password }) => {
  try {
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
      return { loginResponse };
  } catch (error) {
    console.error(error);
  }
};
