const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;

app.use(express.json());
app.use(cors());

let todos = [];

app.get("/testing", (req, res) => {
  res.status(200).send("hello");
});

// listing todos
app.get("/getTodos", (req, res) => {
  res.status(200).send(todos);
});

// adding a todo
app.post("/addTodo", (req, res) => {
  const todo = { id: Date.now(), ...req.body };
  todos.push(todo);
  res.status(201).send(todo);
});

// delete
app.delete("/deleteTodo/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id !== parseInt(id));
  res.status(204).send();
});

//update
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  let foundIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  if (foundIndex === -1) {
    res.status(404).send();
  } else {
    todos[foundIndex] = { ...todos[foundIndex], ...req.body };
    res.status(200).send(todos[foundIndex]);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
