// require the library
const mongoose = require("mongoose");

// connect to database
mongoose.connect("mongodb://localhost/toDo_List_db");

//acquire connection (to check if it is successfull);
const db = mongoose.connection;

// error....
db.on("error", console.error.bind(console, "error connecting to db"));

// up and running then print the message....
db.once("open", function () {
  console.log("Successfully connected to the database");
});
