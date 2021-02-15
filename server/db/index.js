
// module.exports = {
//   mongoURI: 'mongodb://dbkiwi:27017/dbkiwi',
// };

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectID;

const url = 'mongodb://dbkiwi:27017';
const dbName = 'dbKiwi';

const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect();
let db = client.db(dbName);

async function createBookClub (bookClub) {
  try {
    const result = await db
    .collection('bookClubs')
    .insertOne(bookClub)
    return result
  } catch {
    throw error;
  }
}

async function getBookClubs() {
  try {
    const result = await db
    .collection('bookClubs')
    .find({})
    .toArray();
    return result;
  } catch {
      throw error;
  }
}

async function addMemberToBookClub(bookClubId, updatedBookClub) {
  console.log('ID', bookClubId);
  console.log('updated', updatedBookClub);
  try {
    const result = await db
    .collection('bookClubs')
    .findOneAndUpdate( {_id: ObjectId(bookClubId) }, { $set: updatedBookClub })
    return result;
  } catch {
      throw error;
  }
}

async function getUser(userId) {
  try {
    const result = await db
    .collection('users')
    .findOne({_id: ObjectId(userId)});
    return result;
  } catch {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const result = await db
    .collection('users')
    .find({})
    .toArray();
    return result;
  } catch {
    throw error;
  }
}

async function postUser(user) {
  try {
    const result = await db
    .collection('users')
    .findOne({ username: user.username })
    return result;
  } catch {
      throw error;
  }
}

async function register(user) {
  try {
    const result = await db
    .collection('users')
    .insertOne(user)
    return result;
  } catch {
    throw error;
  }
}

module.exports.createBookClub = createBookClub;
module.exports.getAllUsers = getAllUsers;
module.exports.getBookClubs = getBookClubs;
module.exports.getUser = getUser;
module.exports.postUser = postUser;
module.exports.register = register;
module.exports.addMemberToBookClub = addMemberToBookClub;

