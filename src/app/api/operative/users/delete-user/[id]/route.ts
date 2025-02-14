import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import connect from "@/utils/db";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await connect();

    const deleteUser= await User.findByIdAndDelete(id);

    if (!deleteUser) {
      return NextResponse.json(
        { error: "Group Class not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully.", deleteUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting User:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the User." },
      { status: 500 }
    );
  }
}
