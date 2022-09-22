// Configure the express and port.
const express = require("express");
// Requires a path.
const path = require("path");
// Sets the const port to 80
const port = 80;

// Load mongoose config
const db = require("./config/mongoose");

// Requires the TODO constant.
const TODO = require("./models/toDo");

// Extends the express app with a new app.
const app = express();

// Sets the view engine.
app.set("view engine", "ejs");

// Sets the views directory.
app.set("views", path.join(__dirname, "views"));

// Use the express urlencoded to encode the url.
app.use(express.urlencoded());

// Use express static assets.
app.use(express.static("assets"));

// Return a list of all todos in the game
var todo_list = [
  {
    description: "Love to code early morning",
    category: "Important",
    dateAndTime: "12/9/2022",
  },
  {
    description: "Visit store to get needy items ",
    category: "Office",
    dateAndTime: "13/9/2022",
  },
];

// Fetch a ToDo List
app.get("/", function (req, res) {
  TODO.find({}, function (error, todo) {
    // {}-> this is empty because we want every contact
    if (error) {
      console.log("Error in fetching from db");
      return;
    } else {
      return res.render("toDoHome", {
        title: "Let's make a ToDo List",
        TODO_LIST: todo /*todo_list*/,
      });
    }
  });
});

// Create a ToDo List

app.post("/create-todo", function (req, res) {
  TODO.create(
    {
      //defined them in schema.
      description: req.body.description,
      category: req.body.category,
      dateAndTime: req.body.dateAndTime,
    },
    function (error, newTODO) {
      if (error) {
        console.log("error in creating a ToDo List");
        return;
      } else {
        console.log("****************", newTODO);
        return res.redirect("back");
      }
    }
  );
});

/*********************************deleting************************************ */

// Delete an object from the database
app.get("/delete-toDo", function (req, res) {
  console.log(req.query);
  let id = req.query.id;

  // Deletes an object from the database
  TODO.findByIdAndDelete(id, function (error) {
    //find the contact in the database using id and delete
    if (error) {
      console.log("error in deleting an object from database");
      return;
    } else {
      return res.redirect("back");
    }
  });
});

// Starts Yup! server.
app.listen(port, function (error) {
  if (error) {
    console.log("error in running the server", error);
  } else {
    console.log("Yup! server is up and running on", port);
  }
});
