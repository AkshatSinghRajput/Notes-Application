const mongoose = require("mongoose");
const mongoURI =
  "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
};
const connectToMongo = () => {
  mongoose.connect(mongoURI, options, (err) => {
    console.log(err ? err : "Connected to Mongo Successfully");
  });
};

module.exports = connectToMongo;
