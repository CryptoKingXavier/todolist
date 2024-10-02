import { v4 as uuidv4 } from "uuid";
import React, { Fragment, useState, useRef, useEffect } from "react";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const todoNameRef = useRef(null);
  const LOCAL_STORAGE_KEY = "TodoApp.Todos";
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY)
    return storedTodos ? JSON.parse(storedTodos) : []
  });

  useEffect(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedTodos) setTodos(JSON.parse(storedTodos))
  }, []);

  useEffect(() => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)), [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  };

  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: uuidv4(), name: name, complete: false },
    ]);
    todoNameRef.current.value = null;
  };

  const handleClearTodos = () => {
    setTodos(todos.filter((todo) => !todo.complete));
  };

  const renderTodos = () => {
    if (todos.length) {
      return (
        <section className="todo-list">
          <TodoList todos={todos} toggleTodo={toggleTodo} />
        </section>
      );
    } else {
      return (
        <section className="no-todos">
          <h1>No Todos!</h1>
        </section>
      );
    }
  };

  return (
    <Fragment>
      <div className="container">
        <section>
          <input ref={todoNameRef} type="text" placeholder="New Todo" />
          <div className="todo-actions">
            <button onClick={handleAddTodo}>Add Todo</button>
            <button onClick={handleClearTodos}>Clear Complete</button>
          </div>
          <div className="todo-counter">
            {todos.filter((todo) => !todo.complete).length} left to do
          </div>
        </section>
        {renderTodos()}
      </div>
    </Fragment>
  );
}

export default App;
