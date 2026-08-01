"use client";

import type { Todo } from "@/types/todo";

type TodoItemProps = {
  todo: Todo;
  isUpdating: boolean;
  isDeleting: boolean;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
};

export function TodoItem({
  todo,
  isUpdating,
  isDeleting,
  onToggle,
  onDelete,
}: TodoItemProps) {
  return (
    <li className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <label className="flex flex-1 items-center gap-3">
        <input
          checked={todo.isDone}
          className="h-5 w-5 rounded border-slate-300"
          disabled={isUpdating}
          onChange={() => onToggle(todo)}
          type="checkbox"
        />
        <span
          className={
            todo.isDone
              ? "text-sm text-slate-400 line-through"
              : "text-sm text-slate-800"
          }
        >
          {todo.title}
        </span>
      </label>

      <button
        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isDeleting}
        onClick={() => onDelete(todo.id)}
        type="button"
      >
        {isDeleting ? "..." : "Delete"}
      </button>
    </li>
  );
}
