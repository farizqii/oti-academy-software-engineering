import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readJsonObject, validateCreateTodo } from "@/lib/todo.validation";

function unauthorizedResponse() {
  return NextResponse.json(
    { message: "Kamu harus login terlebih dahulu." },
    { status: 401 },
  );
}

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return unauthorizedResponse();

    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      { message: "Daftar to-do berhasil diambil.", data: todos },
      { status: 200 },
    );
  } catch (error) {
    console.error("Gagal mengambil to-do:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengambil to-do." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return unauthorizedResponse();

    const parsedBody = await readJsonObject(request);
    if (!parsedBody.ok) {
      return NextResponse.json(
        { message: parsedBody.message },
        { status: 400 },
      );
    }

    const validatedInput = validateCreateTodo(parsedBody.data);
    if (!validatedInput.ok) {
      return NextResponse.json(
        { message: validatedInput.message },
        { status: 400 },
      );
    }

    const todo = await prisma.todo.create({
      data: { ...validatedInput.data, userId },
    });

    return NextResponse.json(
      { message: "To-do berhasil dibuat.", data: todo },
      { status: 201 },
    );
  } catch (error) {
    console.error("Gagal membuat to-do:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat membuat to-do." },
      { status: 500 },
    );
  }
}
