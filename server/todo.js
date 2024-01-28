const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const todoUserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  todos: [todoSchema],
  // todos: {
  //   type: Map,
  //   of: { type: mongoose.Schema.Types.ObjectId, ref: "TodoItem" },
  //   default: {},
  // },
});

const TodoUser = mongoose.model("TodoUser", todoUserSchema);
const TodoItem = mongoose.model("TodoItem", todoSchema);

module.exports = { TodoItem, TodoUser };
