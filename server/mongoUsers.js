import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

class Users {
  constructor(dburl) {
    this.dburl = dburl;
    this.connect();
  }

  async connect() {
    this.client = await MongoClient.connect(this.dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi : ServerApiVersion.v1
    });
    // Fill db name here
    this.db = await this.client.db('scrabble');
    // Fill db collection here
    this.usersCollection = await this.db.collection('users');
    // console.log(this.usersCollection);
  }

  async close() {
    this.client.close();
  }

  async addUser(name, pass) {
    if (await this.findUser(name)) {
      return false;
    } else {
      await this.usersCollection.insertOne({ username: name, password: pass });
      return true;
    }
  }

  async findUser(username) {
    const user = await this.usersCollection.findOne({ username: username });
    return user !== null;
  }

  async validatePassword(name, pwd) {
    const user = await this.usersCollection.findOne({ username: name });
    if (!user) {
      return false;
    } else if (user.password !== pwd) {
      return false;
    } else {
      return true;
    }
  }
  
}

const users = new Users(process.env.DB_URL);

export { users };