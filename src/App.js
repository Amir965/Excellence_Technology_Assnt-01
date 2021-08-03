import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./List";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const addTodo = (e) => {
    e.preventDefault();
    if (!todo) {
      alert("Please enter the value");
    } else if (isEditing) {
      setTodos(
        todos.map((item) => {
          if (item.id === editId) {
            return { ...item, title: todo };
          }
          return item;
        })
      );
      setIsEditing(false);
      setTodo("");
      setEditId(null);
    } else {
      const newTodo = { id: new Date().getTime().toString(), title: todo };
      setTodos([...todos, newTodo]);
      setTodo("");
    }
  };

  const removeTodo = (id) => {
    const newTodo = todos.filter((item) => item.id !== id);
    setTodos(newTodo);
  };

  const editTodo = (id) => {
    const specificItem = todos.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setTodo(specificItem.title);
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <div className="App">
      <form>
        <h1>Todo</h1>
        <input
          type="text"
          style={{borderRadius:"5px"}}
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button disabled={!todo} onClick={addTodo} style={{borderRadius:"5px"}}>
          {isEditing ? "Edit" : "Add"}
        </button>
      </form>
        {todos.length > 0 && (
          <List items={todos} removeTodo={removeTodo} editTodo={editTodo} />
        )}
      </div>
  );
}

export default App;
