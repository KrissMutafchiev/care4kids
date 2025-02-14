import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import connect from "@/utils/db";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();

  const { name, institution, kids, teacher } = body;
  if (!name || !institution || !kids || !teacher) {
    return NextResponse.json(
      { error: "All required fields must be provided." },
      { status: 400 }
    );
  }

  try {
    await connect();

    const updateGroupClass = await User.findByIdAndUpdate(
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

    const allGroupClass = await User.find();

    return NextResponse.json(allGroupClass, { status: 200 });
  } catch (error) {
    console.error("Error updating Group Class:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the Group Class." },
      { status: 500 }
    );
  }
}
