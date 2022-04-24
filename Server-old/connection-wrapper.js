const mongoose = require('mongoose');

const dbURI =
  'mongodb+srv://bensha:benshale@cluster0.ooqnx.mongodb.net/vacations-app?retryWrites=true&w=majority';

async function connect() {
    console.log('hey connect')
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connected to MONGO-DB successfully!');
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  connect,
};

//   const dbURI =
//   'mongodb+srv://bensha:benshale@cluster0.ooqnx.mongodb.net/vacations-app?retryWrites=true&w=majority';

//   mongoose
//   .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then((res) => {
//     console.log('connected to MONGO-DB successfully!');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
