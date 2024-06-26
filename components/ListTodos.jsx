"use client";
import { useEffect, useState } from "react";
import { deleteTodo, getTodos, markisFinished } from "./utils/local-storage";
import { Check, Cross, Edit, Trash } from "lucide-react";
import Todo from "./Todo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const todo = getTodos();
      setTodos(todo);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  
  return (
    <div className="w-full flex flex-wrap gap-10">
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

export default ListTodos;
