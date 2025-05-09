import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/utils/db";
import User from "@/models/User";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    const { userId, newPassword } = await req.json();

    if (!userId || !newPassword) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    await connect();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Hash password safely
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(newPassword, 10);
    } catch (hashError) {
      return NextResponse.json({ error: "Password hashing failed" }, { status: 500 });
    }

    user.password = hashedPassword;
    user.isFirstLogin = false; // Mark first login as completed

    // Save the user and handle possible errors
    await user.save().catch((err:any) => {
      console.error("Error saving user:", err);
      return NextResponse.json({ error: "Error saving user" }, { status: 500 });
    });

    return NextResponse.json({ message: "Password updated successfully!" }, { status: 200 });

  } catch (error) {
    console.error("Password reset failed:", error);
    return NextResponse.json({ error: "Password reset failed" }, { status: 500 });
  }
}
