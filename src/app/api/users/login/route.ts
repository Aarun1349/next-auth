import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    //Validations
    console.log(reqBody);
    //check for user existence
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not exist" }, { status: 404 });
    }
   
    console.log(user.password,password);
    const comparePassword = await bcryptjs.compare(password, user.password);
    console.log(user.password,password,comparePassword);
    if (!comparePassword) {
      return NextResponse.json(
        { error: "Incorrect Password" },
        { status: 401 }
      );
    }

    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    //create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "User Logged In Successfully",
        data: user,
      },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
