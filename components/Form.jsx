"use client";
import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader } from "lucide-react";
import { addTodo, getTodos } from "./utils/local-storage";

const formSchema = z.object({
  todo: z.string().min(1, "This field is required"),
});

const Form = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: { todo: "" },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!localStorage.getItem("todos")) {
      localStorage.setItem("todos", JSON.stringify([]));
    }
  }, []);

  const onSubmit = async ({ todo }) => {
    try {
      const { data } = await axios.post("/api/call-gemini", {
        query: todo,
      });
      addTodo(todo, data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-zinc-400 opacity-40 text-xs mb-1 ml-2">
        Click enter ↵ to submit
      </p>
      <div className="flex gap-4 items-center">
        <Controller
          control={control}
          name="todo"
          render={({ field }) => (
            <Input
              {...field}
              className="bg-stone-900 text-white w-[300px]  outline-none border-none ring-0 "
              disabled={isSubmitting}
              placeholder="Add todo list"
            />
          )}
        />
        <Button
          className="bg-stone-700 text-white hover:bg-stone-300 hover:text-stone-700 outline-none border-none"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader className="animate-spin w-4 h-4 text-white" />
          ) : (
            "Submit"
          )}
        </Button>
      </div>
      {errors.todo && (
        <p className="text-red-500 text-xs mt-1">{errors.todo.message}</p>
      )}
    </form>
  );
};

export default Form;
