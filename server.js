const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect DB
connectDB();

// No need to instal body parser, use Init Middleware
app.use(express.json({ extended: false }));
//app.use(express.json()); //Used to parse JSON bodies
//app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
//endpoint
app.get('/', (req, res) => res.send('API Running'));

// Define Routes, so that we can use them
app.use('/api/users', require('./config/routes/api/users'));
app.use('/api/auth', require('./config/routes/api/auth'));
app.use('/api/profile', require('./config/routes/api/profile'));
app.use('/api/posts', require('./config/routes/api/posts'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
