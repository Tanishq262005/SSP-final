const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server'); // We'll modify server.js slightly to export `app`

const User = require('../models/User');
const ChatMessage = require('../models/ChatMessage');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
  await ChatMessage.deleteMany({});
});

describe('POST /signup', () => {
  it('should create a user', async () => {
    const res = await request(app)
      .post('/signup')
      .send({ username: 'testuser', password: 'testpass' });

    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('User registered');
  });
});

describe('POST /chat', () => {
  it('should save a chat message', async () => {
    const res = await request(app)
      .post('/chat')
      .send({ username: 'tester', message: 'Hello world' });

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Message sent!');
  });
});

describe('GET /chat', () => {
  it('should return all chat messages', async () => {
    await ChatMessage.create({ username: 'tester', message: 'Hello', timestamp: new Date() });

    const res = await request(app).get('/chat');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].message).toBe('Hello');
  });
});
