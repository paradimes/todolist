const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const { connect } = require("./db");
const { TodoItem, TodoUser } = require("./todo");

app.use(express.json());
app.use(cors());

app.get("/testing", async (req, res) => {
  res.send("Testing!");
});

app.get("/getTodos", async (req, res) => {
  await connect();
  const { userId } = req.query;
  try {
    const user = await TodoUser.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const todos = user.todos;
    const transformedTodos = todos.map((todo) => ({
      id: todo._id.toString(),
      title: todo.title,
      completedStatus: todo.completedStatus,
    }));
    res.send(transformedTodos);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/addTodo", async (req, res) => {
  await connect();
  const { userId, title } = req.body;

  try {
    let user = await TodoUser.findOne({ userId });

    if (!user) {
      user = new TodoUser({ userId, todos: [] });
    }

    const newTodo = new TodoItem({ title });
    await newTodo.save();

    user.todos.push(newTodo);
    await user.save();

    const transformedNewTodo = {
      id: newTodo._id.toString(),
      title: newTodo.title,
      completedStatus: newTodo.completedStatus,
    };
    res.status(201).send(transformedNewTodo);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/deleteTodo", async (req, res) => {
  await connect();
  const { userId, taskId } = req.body;

  try {
    let user = await TodoUser.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.todos = user.todos.filter((todo) => todo._id.toString() !== taskId);
    await user.save();

    res.send(user.todos);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/editTodo", async (req, res) => {
  await connect();
  const { userId, taskId, update } = req.body;

  try {
    let user = await TodoUser.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const todoIndex = user.todos.findIndex(
      (todo) => todo._id.toString() === taskId
    );

    if (todoIndex === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    user.todos[todoIndex] = { ...user.todos[todoIndex].toObject(), ...update };

    await user.save();

    const editedTodo = {
      id: user.todos[todoIndex]._id.toString(),
      title: user.todos[todoIndex].title,
      completedStatus: user.todos[todoIndex].completedStatus,
    };
    res.send(editedTodo);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
