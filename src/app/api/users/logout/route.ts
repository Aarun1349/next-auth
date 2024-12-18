import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    // const response = await axios.get("/api/users/logout");

    const response = NextResponse.json({
      message: "Logout Successfully",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}