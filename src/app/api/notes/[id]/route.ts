import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { readJsonObject, validateUpdateNote } from "@/lib/note-validation";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    const note = await prisma.note.findUnique({
      where: {
        id,
      },
    });

    if (!note) {
      return NextResponse.json(
        {
          message: "Note tidak ditemukan.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Detail note berhasil diambil.",
        data: note,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Gagal mengambil detail note:", error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan saat mengambil note.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

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

    const validatedInput = validateUpdateNote(parsedBody.data);

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

    const existingNote = await prisma.note.findUnique({
      where: {
        id,
      },
    });

    if (!existingNote) {
      return NextResponse.json(
        {
          message: "Note tidak ditemukan.",
        },
        {
          status: 404,
        },
      );
    }

    const updatedNote = await prisma.note.update({
      where: {
        id,
      },

      data: validatedInput.data,
    });

    return NextResponse.json(
      {
        message: "Note berhasil diupdate.",
        data: updatedNote,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Gagal mengupdate note:", error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan saat mengupdate note.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    const existingNote = await prisma.note.findUnique({
      where: {
        id,
      },
    });

    if (!existingNote) {
      return NextResponse.json(
        {
          message: "Note tidak ditemukan.",
        },
        {
          status: 404,
        },
      );
    }

    const deletedNote = await prisma.note.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        message: "Note berhasil dihapus.",
        data: deletedNote,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Gagal menghapus note:", error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan saat menghapus note.",
      },
      {
        status: 500,
      },
    );
  }
}
