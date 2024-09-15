import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 400 }
      );
    }

    const response = NextResponse.json({ message: "Cookie set successfully" });
    response.cookies.set("auth_token", token, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true, // Ensure the cookie cannot be accessed via JavaScript
      secure: false, // Ensure cookies are sent over HTTPS
      sameSite: "none", // Helps prevent CSRF attacks
      // domain: "https://backend-2-two.vercel.app",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error setting cookie:", error);
    return NextResponse.json(
      { message: "Error setting cookie", error: (error as Error).message },
      { status: 500 }
    );
  }
}
