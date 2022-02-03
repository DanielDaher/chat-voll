const connection = require('./connection');

const create = async ({ userName, password }) => {
  try {
    const query = {
      userName,
      password,
    };
    const db = await connection();
    await db.collection('users').insertOne(query);
    return 'user created successfully';  
  } catch (error) {
    console.error(error);
    return 'error on database query';
  }
};

const getByName = async (userName) => {
  const findUser = { userName };
  const db = await connection();
  const user = await db.collection('users').findOne(findUser);
  return user;
};

module.exports = {
  create,
  getByName,
};