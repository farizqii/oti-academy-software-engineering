import type { CreateNoteInput, UpdateNoteInput } from "@/types/note";

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

export function validateCreateNote(
  body: JsonObject,
): ValidationResult<CreateNoteInput> {
  if (typeof body.title !== "string" || !body.title.trim()) {
    return {
      ok: false,
      message: "Title tidak boleh kosong.",
    };
  }

  if (body.content !== undefined && typeof body.content !== "string") {
    return {
      ok: false,
      message: "Content harus berupa string.",
    };
  }

  return {
    ok: true,
    data: {
      title: body.title.trim(),
      content: typeof body.content === "string" ? body.content.trim() : "",
    },
  };
}

export function validateUpdateNote(
  body: JsonObject,
): ValidationResult<UpdateNoteInput> {
  const hasTitle = Object.prototype.hasOwnProperty.call(body, "title");

  const hasContent = Object.prototype.hasOwnProperty.call(body, "content");

  if (!hasTitle && !hasContent) {
    return {
      ok: false,
      message: "Minimal kirim field title atau content.",
    };
  }

  if (hasTitle && (typeof body.title !== "string" || !body.title.trim())) {
    return {
      ok: false,
      message: "Title harus berupa string yang tidak kosong.",
    };
  }

  if (hasContent && typeof body.content !== "string") {
    return {
      ok: false,
      message: "Content harus berupa string.",
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

      ...(hasContent && typeof body.content === "string"
        ? {
            content: body.content.trim(),
          }
        : {}),
    },
  };
}
