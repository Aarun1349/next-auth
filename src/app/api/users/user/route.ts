import { getUserData } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { connect } from "@/app/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    console.log("Inside get");
    const userId = await getUserData(request);
    console.log("Inside ", userId);
    const user = await User.findById({ _id: userId }).select("-password");
    console.log("USER", user);
    return NextResponse.json(
      {
        success: true,
        message: "User Found",
        data: user,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
