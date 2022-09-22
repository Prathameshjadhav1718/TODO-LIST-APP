// Creates a mongoose model for exports.
const { default: mongoose } = require("mongoose");

// Creates a mongoose. Schema with a description.
const toDoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  dateAndTime: {
    type: String,
    required: true,
  },
});

// Sets the toDo schema.

const toDo = mongoose.model("toDO", toDoSchema);

module.exports = toDo;
