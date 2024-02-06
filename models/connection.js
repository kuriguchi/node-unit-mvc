// This file is initializing the mongodb connection
// and exporting it for use in all other files through the module.exports
const mongoose = require('mongoose');
const databaseURL = 'mongodb://localhost:27017';

// const options = { useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false };

mongoose.connect(databaseURL, {});
beforeAll(done => {
    done()
  })
  
  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
  })
module.exports = mongoose;
