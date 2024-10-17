import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });
  if (!user) {
    return NextResponse.json({ message: "User Not Found" }, { status: 404 });
  }
  return NextResponse.json({ user }, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Validate the request body
  // if invalid, return 400
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  // If doesn't exist, return 404
  if (!user) {
    return NextResponse.json({ message: "User Not Found" }, { status: 404 });
  }

  const email_check = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (email_check)
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );

  const upadtedUser = await prisma.user.update({
    where: { id: params.id },
    data: { name: body.name, email: body.email },
  });

  return NextResponse.json({ upadtedUser }, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
 
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });
  if (!user) {
    return NextResponse.json({ message: "User Not Found" }, { status: 404 });
  }

  await prisma.user.delete({
    where: { id: params.id },
  });
  
  return NextResponse.json({ message: "User Deleted" }, { status: 200 });
}
