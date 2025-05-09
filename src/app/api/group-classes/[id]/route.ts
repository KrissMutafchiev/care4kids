import { NextRequest, NextResponse } from "next/server";
import GroupClass from "@/models/GroupClass";
import connect from "@/utils/db";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();

  const { name, institution, kids, teacher } = body;
  if (!name || !institution  || !teacher) {
    return NextResponse.json(
      { error: "All required fields must be provided." },
      { status: 400 }
    );
  }
  try {
    await connect();

    const updateGroupClass = await GroupClass.findByIdAndUpdate(
      id,
      { name, institution, kids, teacher },
      { new: true, runValidators: true } 
    );

    if (!updateGroupClass) {
      return NextResponse.json(
        { error: "Group Class not found." },
        { status: 404 }
      );
    }

    const allGroupClass = await GroupClass.findById(updateGroupClass._id).populate('institution')

    return NextResponse.json(allGroupClass, { status: 200 });
  } catch (error) {
    console.error("Error updating Group Class:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the Group Class." },
      { status: 500 }
    );
  }
}


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
