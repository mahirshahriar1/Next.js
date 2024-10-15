import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

export function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // fetch data from a db
  // if not found, return 404
  // else return data
  if (params.id > 10) {
    return NextResponse.json({ message: "User Not Found" }, { status: 404 });
  }
  return NextResponse.json({ id: params.id, name: "John Doe" });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // Validate the request body
  // if invalid, return 400
  const body = await request.json();
  const validation= schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

// If doesn't exist, return 404
  if (params.id > 10) {
    return NextResponse.json({ message: "User Not Found" }, { status: 404 });
  }
  // Fetch the user with the given id
  // Update the user with the new data
  // Return the updated user

  return NextResponse.json({ id: 1, name: body.name }, { status: 200 });
}


export function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // If doesn't exist, return 404
  if (params.id > 10) {
    return NextResponse.json({ message: "User Not Found" }, { status: 404 });
  }
  // Delete the user with the given id
  return NextResponse.json({ message: "User Deleted" }, { status: 200 });
}