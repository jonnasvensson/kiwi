
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

module.exports.getBookClubs = getBookClubs;
