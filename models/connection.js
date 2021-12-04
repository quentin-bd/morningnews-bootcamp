const mongoose = require('mongoose');


var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
 };


mongoose.connect(process.env.MONGO_CS,
   options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because u suck --> ${err}`);
    } else {
      console.info('*** You Entered the Vault, Success is yours ***');
    }
   }
);
