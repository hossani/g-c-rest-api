const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const app = express();

app.use(express.json());


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



const mongodb_uri = process.env.MONGODB_URI || 'mongodb://localhost/mydatabase';

mongoose.connect(mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connected');
}).catch((error) => {
  console.log('Error connecting to database:', error.message);
});





app.post('/users', (req, res) => {
  const { username, email, password } = req.body;

  const user = new User({ username, email, password });

  user.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating user');
    } else {
      res.status(201).send('User created');
    }
  });
});




mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// GET all users
app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving users');
    } else {
      res.status(200).json(users);
    }
  });
});

// POST a new user
app.post('/users', (req, res) => {
  const { username, email, password } = req.body;

  const user = new User({ username, email, password });

  user.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating user');
    } else {
      res.status(201).send('User created');
    }
  });
});

// PUT update a user by ID
app.put('/users/:id', (req, res) => {
  const { username, email, password } = req.body;

  User.findByIdAndUpdate(req.params.id, { username, email, password }, { new: true }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating user');
    } else {
      res.status(200).json(user);
    }
  });
});

// DELETE a user by ID
app.delete('/users/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting user');
    } else {
      res.status(200).send('User deleted');
    }
  });
});

app.listen(3500, () => console.log('Server running on port 3500'));
