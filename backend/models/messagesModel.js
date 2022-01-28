const connection = require('./connection');

const create = async ({ userID, messageText, timeStamp }) => {
  const query = {
    userID,
    messageText,
    timeStamp,
  };
  const db = await connection();
  await db.collection('messages').insertOne(query);
  return 'user created successfully';
};

const getLastThirtyMessages = async () => {
  const query = {};
  const orderby = {
    $natural: -1
  };
  const db = await connection();
  const user = await db.collection('messages').find({ query, $orderby: orderby }).limit(30);
  // https://stackoverflow.com/questions/4421207/how-to-get-the-last-n-records-in-mongodb
  return user;
};

module.exports = {
  create,
  getLastThirtyMessages,
};