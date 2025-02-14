import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const generateRandomPassword = (length = 10) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  return Array.from({ length }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, institution, groupClass, role } =
      await request.json();

    if (!firstName || !lastName || !email || !institution || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connect();

    // Check if the email is already used
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already in use" },
        { status: 400 }
      );
    }

    // Generate and hash password
    const randomPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      institution,
      groupClass: groupClass || null,
      role,
      isFirstLogin: true,
    });

    await newUser.save();

    // ✅ Fetch updated list of teachers after successful creation
    const teachers = await User.find({
      role: role,
      institution: institution, // Match institution ID
    })
      .select("-password") // Remove password from response
      .populate("institution", "name") // Populate institution details
      .populate("groupClass", "name") // Populate groupClass details
      .lean();

    // ✅ Send email only after user is created & teachers list is retrieved
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/operative/send-email`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: email, password: randomPassword }),
      }
    );

    if (!response.ok) {
      console.error("Failed to send email:", await response.text());
      // ⚠️ Still return success, but notify that email failed
      return NextResponse.json(
        {
          teachers,
          message: "User created successfully, but email failed to send.",
          tempPassword: randomPassword,
        },
        { status: 207 } // 207 = Multi-Status (Partial success)
      );
    }

    // ✅ Everything succeeded, return updated teachers list
    return NextResponse.json(
      {
        teachers,
        message: `User with role ${role} registered successfully`,
        tempPassword: randomPassword,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
