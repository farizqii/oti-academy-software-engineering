import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { readJsonObject, validateCreateNote } from "@/lib/note-validation";

export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        message: "Notes berhasil diambil.",
        data: notes,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Gagal mengambil notes:", error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan saat mengambil notes.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    const parsedBody = await readJsonObject(request);

    if (!parsedBody.ok) {
      return NextResponse.json(
        {
          message: parsedBody.message,
        },
        {
          status: 400,
        },
      );
    }

    const validatedInput = validateCreateNote(parsedBody.data);

    if (!validatedInput.ok) {
      return NextResponse.json(
        {
          message: validatedInput.message,
        },
        {
          status: 400,
        },
      );
    }

    const newNote = await prisma.note.create({
      data: {
        title: validatedInput.data.title,

        content: validatedInput.data.content,
      },
    });

    return NextResponse.json(
      {
        message: "Note berhasil dibuat.",
        data: newNote,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Gagal membuat note:", error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan saat membuat note.",
      },
      {
        status: 500,
      },
    );
  }
}
