import type { CreateTodoInput, UpdateTodoInput } from "@/types/todo";

type JsonObject = Record<string, unknown>;

type ValidationSuccess<T> = {
  ok: true;
  data: T;
};

type ValidationFailure = {
  ok: false;
  message: string;
};

export type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function readJsonObject(
  request: Request,
): Promise<ValidationResult<JsonObject>> {
  try {
    const body: unknown = await request.json();

    if (!isJsonObject(body)) {
      return {
        ok: false,
        message: "Body request harus berupa object JSON.",
      };
    }

    return {
      ok: true,
      data: body,
    };
  } catch {
    return {
      ok: false,
      message: "Body request harus berupa JSON valid.",
    };
  }
}

export function validateCreateTodo(
  body: JsonObject,
): ValidationResult<CreateTodoInput> {
  if (typeof body.title !== "string" || !body.title.trim()) {
    return {
      ok: false,
      message: "Title tidak boleh kosong.",
    };
  }

  return {
    ok: true,
    data: {
      title: body.title.trim(),
    },
  };
}

export function validateUpdateTodo(
  body: JsonObject,
): ValidationResult<UpdateTodoInput> {
  const hasTitle = Object.prototype.hasOwnProperty.call(body, "title");

  const hasIsDone = Object.prototype.hasOwnProperty.call(body, "isDone");

  if (!hasTitle && !hasIsDone) {
    return {
      ok: false,
      message: "Minimal kirim field title atau isDone.",
    };
  }

  if (hasTitle && (typeof body.title !== "string" || !body.title.trim())) {
    return {
      ok: false,
      message: "Title harus berupa string yang tidak kosong.",
    };
  }

  if (hasIsDone && typeof body.isDone !== "boolean") {
    return {
      ok: false,
      message: "isDone harus bertipe boolean.",
    };
  }

  return {
    ok: true,
    data: {
      ...(hasTitle && typeof body.title === "string"
        ? {
            title: body.title.trim(),
          }
        : {}),

      ...(hasIsDone && typeof body.isDone === "boolean"
        ? {
            isDone: body.isDone,
          }
        : {}),
    },
  };
}
