"use client";

import { Check, Edit, Loader2, Trash } from "lucide-react";
import { deleteTodo, markisFinished, updateTodo } from "./utils/local-storage";
import { memo, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const Todo = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [todoText, setTodoText] = useState();
  const [loading, setLoading] = useState();
  const inputRef = useRef();
  useEffect(() => {
    setTodoText(todo.todo);
  }, [todo.todo]);

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setLoading(true);
      try {
        const { data } = await axios.post("/api/call-gemini", {
          query: todoText,
        });
        updateTodo({ ...todo, todo: todoText }, data);
      } catch (error) {
        console.log(error);
      }
      setIsEditing(false);
      setLoading(false);
    }
  };

  const focusOutHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className="relative cursor-pointer rounded-sm bg-stone-800 text-white p-6 pb-10 max-w-sm shadow-sm shadow-slate-700 hover:shadow-md">
      <Trash
        className="absolute top-2 right-2 w-5 h-5"
        onClick={() => deleteTodo(todo?.id)}
      />
      <Edit
        className="absolute bottom-2 right-2 w-5 h-5"
        onClick={() => {
          setIsEditing(true);
          inputRef.current.focus();
        }}
      />
      <div
        className="flex gap-1 items-center absolute bottom-2 left-6 text-xs px-2 py-0.5 bg-green-700 shadow-xs hover:shadow-green-500"
        onClick={() => markisFinished(todo)}
      >
        {todo.isFinished ? `Done` : "Mark as done"}
        {todo.isFinished && <Check className="w-4 h-4" />}
      </div>
      <h3
        className={cn(
          isEditing ? "hidden" : "block",
          "text-2xl font-bold text-white capitalize"
        )}
      >
        {todo.todo}
      </h3>

      <input
        type="text"
        cols={2}
        defaultValue={todoText}
        ref={inputRef}
        className={cn(
          isEditing ? "block" : "hidden",
          "w-full text-2xl h-auto font-bold text-white capitalize bg-transparent border-none outline-none"
        )}
        onBlur={focusOutHandler}
        onKeyDown={handleKeyDown}
        onChange={(e) => setTodoText(e.target.value)}
      />

      {!loading && (
        <p className="text-sm opacity-60 text-white  mt-1">
          <ReactMarkdown>{todo.suggestions}</ReactMarkdown>
        </p>
      )}
      {loading && <Loader2 className="animate-spin w-5 h-5" />}
    </div>
  );
};

export default memo(Todo);
