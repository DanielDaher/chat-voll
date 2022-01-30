const connection = require('./connection');

const create = async ({ userID, userName, message, timeStamp }) => {
  try {
    const query = {
      userID,
      userName,
      message,
      timeStamp,
    };
    const db = await connection();
    const insertMessageOnDatabase = await db.collection('messages').insertOne(query);
    return 'message inserted on database';  
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getLastThirtyMessages = async () => {
  const query = {};
  const orderby = {
    $natural: -1
  };
  const db = await connection();
  const lastMessages = await db.collection('messages').find().sort(orderby).limit(30).toArray();
  // https://stackoverflow.com/questions/4421207/how-to-get-the-last-n-records-in-mongodb
  return lastMessages.reverse();
};

module.exports = {
  create,
  getLastThirtyMessages,
};