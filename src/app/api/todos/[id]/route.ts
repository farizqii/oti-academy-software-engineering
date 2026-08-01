import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readJsonObject, validateUpdateTodo } from "@/lib/todo.validation";

type RouteContext = { params: Promise<{ id: string }> };

function unauthorizedResponse() {
  return NextResponse.json(
    { message: "Kamu harus login terlebih dahulu." },
    { status: 401 },
  );
}

async function findOwnedTodo(id: string, userId: string) {
  return prisma.todo.findFirst({ where: { id, userId } });
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { userId } = await auth();
    if (!userId) return unauthorizedResponse();

    const { id } = await params;
    const parsedBody = await readJsonObject(request);
    if (!parsedBody.ok) {
      return NextResponse.json(
        { message: parsedBody.message },
        { status: 400 },
      );
    }

    const validatedInput = validateUpdateTodo(parsedBody.data);
    if (!validatedInput.ok) {
      return NextResponse.json(
        { message: validatedInput.message },
        { status: 400 },
      );
    }

    const existingTodo = await findOwnedTodo(id, userId);
    if (!existingTodo) {
      return NextResponse.json(
        { message: "To-do tidak ditemukan." },
        { status: 404 },
      );
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: existingTodo.id },
      data: validatedInput.data,
    });

    return NextResponse.json(
      { message: "To-do berhasil diupdate.", data: updatedTodo },
      { status: 200 },
    );
  } catch (error) {
    console.error("Gagal mengupdate to-do:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengupdate to-do." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { userId } = await auth();
    if (!userId) return unauthorizedResponse();

    const { id } = await params;
    const existingTodo = await findOwnedTodo(id, userId);
    if (!existingTodo) {
      return NextResponse.json(
        { message: "To-do tidak ditemukan." },
        { status: 404 },
      );
    }

    const deletedTodo = await prisma.todo.delete({
      where: { id: existingTodo.id },
    });

    return NextResponse.json(
      { message: "To-do berhasil dihapus.", data: deletedTodo },
      { status: 200 },
    );
  } catch (error) {
    console.error("Gagal menghapus to-do:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat menghapus to-do." },
      { status: 500 },
    );
  }
}
