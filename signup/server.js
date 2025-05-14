const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const User = require('./models/User');
const ChatMessage = require('./models/ChatMessage');

// === Create HTTP Server for Socket.IO ===
const app = express();
const http = require('http');
const server = http.createServer(app); // 👈 create http server
const { Server } = require('socket.io');
const io = new Server(server); // 👈 create socket.io server

// === Middleware ===
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// === MongoDB Connection ===
// === MongoDB Connection ===
if (require.main === module) {
  mongoose.connect('mongodb://localhost:27017/signup')
    .then(() => {
      console.log('✅ MongoDB connected');
      const PORT = 3000;
      server.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err);
    });
}

module.exports = app;


// === Static Files ===
app.use(express.static(path.join(__dirname, 'public')));

// === Routes ===

// Serve signup.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Handle signup form submission
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = new User({ username, password });
    await user.save();

    console.log("✅ User registered:", user);
    res.send('User registered successfully!');
  } catch (error) {
    console.error("❌ Error saving user:", error);
    res.status(500).send('Error saving user');
  }
});

// === Chat Routes ===

// POST: Store a new chat message
app.post('/chat', async (req, res) => {
  const { message, username } = req.body;

  try {
    const chatMessage = new ChatMessage({ message, username, timestamp: new Date() });
    await chatMessage.save();
    console.log("✅ Chat message saved:", chatMessage);
    res.status(200).send('Message sent!');
  } catch (error) {
    console.error("❌ Error saving message:", error);
    res.status(500).send('Error saving message');
  }
});

// GET: Retrieve all chat messages
app.get('/chat', async (req, res) => {
  try {
    const chatMessages = await ChatMessage.find().sort({ timestamp: 1 }); // Oldest first
    res.json(chatMessages);
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
    res.status(500).send('Error fetching messages');
  }
});

// === Socket.IO Connection ===
io.on('connection', (socket) => {
  console.log('🟢 A user connected');

  socket.on('send_message', async (data) => {
    const { message, username } = data;
    const timestamp = new Date();

    console.log('📩 Message received:', data);

    try {
      const chatMessage = new ChatMessage({ message, username, timestamp });
      await chatMessage.save();
      console.log("✅ Chat message saved via socket:", chatMessage);

      // Broadcast the message with timestamp
      io.emit('receive_message', {
        username,
        message,
        timestamp,
      });
    } catch (error) {
      console.error("❌ Socket message save error:", error);
    }
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected');
  });
});
module.exports = app;

if (require.main === module) {
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}



