const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const { connect } = require("./db");
const Todo = require("./todo");

app.use(express.json());
app.use(cors());

app.get("/getTodos", async (req, res) => {
  await connect();
  try {
    const todos = await Todo.find();
    const transformedTodos = todos.map((todo) => ({
      id: todo._id.toString(),
      title: todo.title,
      completed: todo.completed,
    }));
    res.send(transformedTodos);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/addTodo", async (req, res) => {
  await connect();
  const { title } = req.body;

  try {
    const newTodo = new Todo({ title });
    await newTodo.save();
    const transformedNewTodo = {
      id: newTodo._id.toString(),
      title: newTodo.title,
      completed: newTodo.completed,
    };
    res.status(201).send(transformedNewTodo);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/deleteTodo/:id", async (req, res) => {
  await connect();
  try {
    const response = await Todo.findByIdAndDelete(req.params.id);
    if (!response) {
      return res.status(404).send();
    }
    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/editTodo/:id", async (req, res) => {
  await connect();
  try {
    const response = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!response) {
      return res.status(404).send();
    }
    const editedTodo = {
      id: response._id.toString(),
      title: response.title,
      completed: response.completed,
    };
    res.send(editedTodo);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
