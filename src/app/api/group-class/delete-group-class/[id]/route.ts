import { NextRequest, NextResponse } from "next/server";
import GroupClass from "@/models/GroupClass";
import connect from "@/utils/db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connect();

    // Find and delete the GroupClass by ID
    const deletedGroupClass = await GroupClass.findByIdAndDelete(id);

    if (!deletedGroupClass) {
      return NextResponse.json(
        { error: "Group Class not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Group Class deleted successfully.", deletedGroupClass },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Group Class:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the Group Class." },
      { status: 500 }
    );
  }
}
