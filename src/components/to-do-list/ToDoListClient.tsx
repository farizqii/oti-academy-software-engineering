"use client";

import { useEffect, useState } from "react";
import { createTodo, deleteTodo, getTodos, updateTodo } from "@/lib/todo-api";
import type { CreateTodoInput, Todo } from "@/types/todo";
import { TodoForm } from "@/components/to-do-list/ToDoListForm";
import { TodoItem } from "@/components/to-do-list/ToDoItem";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Terjadi kesalahan yang tidak diketahui.";
}

export function TodosClient() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchTodos() {
      setIsLoading(true);
      setLoadError(null);
      try {
        const data = await getTodos();
        if (isMounted) setTodos(data);
      } catch (error) {
        if (isMounted) setLoadError(getErrorMessage(error));
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void fetchTodos();
    return () => {
      isMounted = false;
    };
  }, []);

  async function handleSubmit(input: CreateTodoInput): Promise<boolean> {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const created = await createTodo(input);
      setTodos((current) => [created, ...current]);
      return true;
    } catch (error) {
      setSubmitError(getErrorMessage(error));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleToggle(todo: Todo) {
    setUpdatingId(todo.id);
    try {
      const updated = await updateTodo(todo.id, { isDone: !todo.isDone });
      setTodos((current) =>
        current.map((t) => (t.id === updated.id ? updated : t)),
      );
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteTodo(id);
      setTodos((current) => current.filter((t) => t.id !== id));
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mt-8 grid gap-6">
      <TodoForm
        isSubmitting={isSubmitting}
        submitError={submitError}
        onSubmit={handleSubmit}
      />

      {isLoading ? (
        <p className="text-sm text-slate-500">Memuat to-do...</p>
      ) : loadError ? (
        <p className="text-sm text-red-700">{loadError}</p>
      ) : todos.length === 0 ? (
        <p className="text-sm text-slate-500">Belum ada to-do.</p>
      ) : (
        <ul className="grid gap-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isUpdating={updatingId === todo.id}
              isDeleting={deletingId === todo.id}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
