// app/api/users/[email]/route.js
import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";

// The GET method to fetch a user by userId
export async function GET(request: any, { params }: any) {
  const { userId } = params; // Get the userId from the URL

  try {
    // Connect to the database
    await connect();

    // Find the user by their ID
    const user = await User.findById(userId);

    // If the user is not found, return a 404 response
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return the user data as a JSON response
    return NextResponse.json(user);
  } catch (error) {
    // Handle any errors and return a 500 response
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
