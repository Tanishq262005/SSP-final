const User = require('../models/User');
const ChatMessage = require('../models/ChatMessage');

describe('User Model', () => {
  it('should create a User instance correctly', () => {
    const user = new User({ username: 'john', password: 'secret' });

    console.log('User Instance:', user); // Log the User instance

    expect(user.username).toBe('john');
    expect(user.password).toBe('secret');

    console.log('User test passed!');
  });
});

describe('ChatMessage Model', () => {
  it('should create a ChatMessage instance correctly', () => {
    const msg = new ChatMessage({
      username: 'tester',
      message: 'Test message',
      timestamp: new Date('2025-01-01T00:00:00Z'),
    });

    console.log('ChatMessage Instance:', msg); // Log the ChatMessage instance

    expect(msg.username).toBe('tester');
    expect(msg.message).toBe('Test message');
    expect(msg.timestamp.toISOString()).toBe('2025-01-01T00:00:00.000Z');

    console.log('ChatMessage test passed!');
  });
});
