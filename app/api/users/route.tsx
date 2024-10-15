import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

// without request parameter
// nextjs will cache the response
export function GET(request: NextRequest) {
  // fetch data from database
  return NextResponse.json([
    { id: 1, name: "John Doe", email: " [email protected]" },
    { id: 2, name: "Jane Doe", email: " [email protected]" },
  ]);
}

export async function POST(request: NextRequest) {
  // create a new user
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}
