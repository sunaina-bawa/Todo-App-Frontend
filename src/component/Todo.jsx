import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Todo.css";

const Todo = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchTodos = async () => {
    const response = await axios.get(
      "https://todo-backend-2-lwl5.onrender.com/api/todos",
      {
        headers: { "x-auth-token": token },
      }
    );
    setTodos(response.data);
  };

  const addTodo = async () => {
    await axios.post(
      "https://todo-backend-2-lwl5.onrender.com/api/todos",
      { title },
      {
        headers: { "x-auth-token": token },
      }
    );
    setTitle("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(
      `https://todo-backend-2-lwl5.onrender.com/api/todos/${id}`,
      {
        headers: { "x-auth-token": token },
      }
    );
    fetchTodos();
  };

  const editTodo = async (id) => {
    const todoToEdit = todos.find((todo) => todo._id === id);
    setTitle(todoToEdit.title);
    setEditId(id);
  };

  const updateTodo = async () => {
    await axios.put(
      `https://todo-backend-2-lwl5.onrender.com/api/todos/${editId}`,
      { title },
      {
        headers: { "x-auth-token": token },
      }
    );
    setTitle("");
    setEditId(null);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add/Edit Todo"
          className="todo-input"
        />
        <button onClick={editId ? updateTodo : addTodo} className="todo-button">
          {editId ? "Update" : "Add"}
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            <span className="todo-text">{todo.title}</span>
            <div className="button-group">
              <button
                onClick={() => editTodo(todo._id)}
                className="edit-button"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
