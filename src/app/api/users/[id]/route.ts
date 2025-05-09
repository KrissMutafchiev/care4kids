import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import connect from "@/utils/db";

// ✅ UPDATE USER (PUT request)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Extract user ID from URL
  const body = await request.json(); // Get updated user data

  try {
    await connect();

    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true, // Return updated document
      runValidators: true, // Ensure validation rules apply
    });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user." }, { status: 500 });
  }
}

// ✅ DELETE USER (DELETE request)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Extract user ID from URL

  try {
    await connect();

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user." }, { status: 500 });
  }
}
