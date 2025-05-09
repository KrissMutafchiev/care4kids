import { NextRequest, NextResponse } from "next/server";
import Kid from "@/models/Kid";
import connect from "@/utils/db";

// 🔍 GET kid by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connect();
    const { id } = params;

    const kid = await Kid.findById(id)
      .populate("institution", "name")
      .populate("group", "name")
      .populate("teachers", "firstName lastName")
      .populate("parents", "firstName lastName");

    if (!kid) {
      return NextResponse.json({ error: "Kid not found." }, { status: 404 });
    }

    return NextResponse.json(kid, { status: 200 });
  } catch (error) {
    console.error("Error fetching kid:", error);
    return NextResponse.json({ error: "Failed to fetch kid." }, { status: 500 });
  }
}

// ✏️ PUT (Update kid by ID)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connect();
    const { id } = params;
    const body = await request.json();

    const updatedKid = await Kid.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedKid) {
      return NextResponse.json({ error: "Kid not found." }, { status: 404 });
    }

    return NextResponse.json(updatedKid, { status: 200 });
  } catch (error) {
    console.error("Error updating kid:", error);
    return NextResponse.json({ error: "Failed to update kid." }, { status: 500 });
  }
}

// ❌ DELETE kid by ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connect();
    const { id } = params;

    const deletedKid = await Kid.findByIdAndDelete(id);

    if (!deletedKid) {
      return NextResponse.json({ error: "Kid not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Kid deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting kid:", error);
    return NextResponse.json({ error: "Failed to delete kid." }, { status: 500 });
  }
}
