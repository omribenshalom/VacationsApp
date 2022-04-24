const express = require('express');
const cors = require('cors');
const vacationsController = require('./controllers/vacations-controller');
const mongoose = require('mongoose');

const port = 7070;
const app = express();

app.use(cors({ origin: 'http://localhost:3000' })); //https not!!
app.use(express.json());

//connect to mongoDB
// ---------------------
const dbURI =
  'mongodb+srv://bensha:benshale@cluster0.ooqnx.mongodb.net/vacations-app?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log('connected to MONGO db...');
  })
  .catch((err) => {
    console.log(err.message);
  });
// ---------------------

app.use('/api/vacations', vacationsController);

app.listen(port, () => console.log(`poking on http://localhost:${port}....`));
