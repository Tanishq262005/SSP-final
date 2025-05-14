// tests/unit/models.test.js
const User = require('../models/User');
const ChatMessage = require('../models/ChatMessage');

describe('User Model', () => {
  it('should create a User instance correctly', () => {
    const user = new User({ username: 'john', password: 'secret' });

    expect(user.username).toBe('john');
    expect(user.password).toBe('secret');
  });
});

describe('ChatMessage Model', () => {
  it('should create a ChatMessage instance correctly', () => {
    const msg = new ChatMessage({
      username: 'tester',
      message: 'Test message',
      timestamp: new Date('2025-01-01T00:00:00Z'),
    });

    expect(msg.username).toBe('tester');
    expect(msg.message).toBe('Test message');
    expect(msg.timestamp.toISOString()).toBe('2025-01-01T00:00:00.000Z');
  });
});
