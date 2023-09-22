const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Atlas connection
const atlasConnectionUri = 'mongodb+srv://hemanth00405:mongopass@cluster.mongodb.net/Cluster0';

mongoose.connect(atlasConnectionUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

// Routes
const documentRouter = require('./controllers/documentController');
app.use('/documents', documentRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
