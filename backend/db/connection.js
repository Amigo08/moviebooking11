const mongoose = require("mongoose");

const URL =
  "mongodb+srv://amigozz:HECet4DAvL0IJuTk@cluster0.ucoxody.mongodb.net/moviebooking?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(URL)
  .then(() => {
    console.log(`DB CONNECTED`);
  })
  .catch((error) => {
    console.log(error);
  });
