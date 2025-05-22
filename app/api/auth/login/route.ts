import { verifyLogin } from "@/app/actions/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await verifyLogin(email, password);

  if (!user) {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
  }

  // Set the cookie on successful login
  const response = NextResponse.json({ message: "Login successful" });
  response.cookies.set("isAdmin", "true", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
