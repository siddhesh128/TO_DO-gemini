import { uuid } from "uuidv4";

export function addTodo(todoText, suggestions = []) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  const newTodo = {
    id: uuid(),
    todo: todoText,
    suggestions: suggestions,
    isFinished: false,
  };
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function getTodos() {
  // Get current todos array from local storage
  const todos = JSON.parse(localStorage.getItem("todos"));
  return todos || []; // Return empty array if todos is null or undefined
}

export const markisFinished = (todo) => {
  const todos = getTodos();
  const index = todos.findIndex((todo) => todo.id === todo.id);
  const updatedTodo = { ...todo, isFinished: !todo.isFinished };
  if (index !== -1) {
    todos[index] = updatedTodo;
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    console.error("Todo not found");
  }
};

export const deleteTodo = (id) => {
  const todos = getTodos();
  const newTodos = todos.filter((item) => item.id !== id);
  localStorage.setItem("todos", JSON.stringify(newTodos));
};

export const updateTodo = (todo, suggestions = []) => {
  const todos = getTodos();
  const index = todos.findIndex((todo) => todo.id === todo.id);
  const updateTodo = {
    ...todo,
    suggestions: suggestions,
    isFinished: false,
  };
  if (index !== -1) {
    todos[index] = updateTodo;
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    console.error("Todo not found");
  }
};
