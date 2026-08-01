import type { CreateTodoInput, Todo, UpdateTodoInput } from "@/types/todo";

type ApiResponse<T> = { message: string; data: T };

async function handleResponse<T>(response: Response): Promise<T> {
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(body?.message ?? "Terjadi kesalahan pada server.");
  }

  return (body as ApiResponse<T>).data;
}

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch("/api/todos");
  return handleResponse<Todo[]>(response);
}

export async function createTodo(input: CreateTodoInput): Promise<Todo> {
  const response = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return handleResponse<Todo>(response);
}

export async function updateTodo(
  id: string,
  input: UpdateTodoInput,
): Promise<Todo> {
  const response = await fetch(`/api/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return handleResponse<Todo>(response);
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`/api/todos/${id}`, { method: "DELETE" });
  await handleResponse<Todo>(response);
}
