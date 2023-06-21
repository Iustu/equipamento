const express = require('express');
const router = express.Router();

const todos = [
];
// Get all todos
app.get("/", (req, res) => {
    return res.status(200).json({
        data: todos,
        error: null,
    });
});

app.post("/", (req, res) => {
    try {
        const { id, item, completed } = req.body;
        const newTodo = {
            id,
            item,
            completed,
        };
        todos.push(newTodo);
        return res.status(201).json({
            data: todos,
            error: null,
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            error: error,
        });
    }
});

app.put("/:id", (req, res) => {
    try {
        const id = req.params.id
        const todo = todos.find((todo) => todo.id == id);
        if(!todo) {
            throw new Error("Todo not found")
        }
        todo.completed = req.body.completed;
        return res.status(201).json({
            data: todo,
            error: null,
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            error: error,
        });
    }
});

app.delete("//:id", (req, res) => {
    try {
        const id = req.params.id
        const todo = todos[0]
        if(todo) {
            todos.splice(id, 1)
        }
        return res.status(200).json({
            data: todos,
            error: null,
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            error: error,
        });
    }
});