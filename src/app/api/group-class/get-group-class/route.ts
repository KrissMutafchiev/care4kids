import { NextResponse } from "next/server";
import connect from "@/utils/db";
import GroupClass from "@/models/GroupClass";

export async function GET() {
  try {
    await connect();
    const groupCLass = await GroupClass.find().populate("institution");
    return NextResponse.json(groupCLass, { status: 200 });
  } catch (error) {
    console.error("Error fetching Group Class:", error);
    return NextResponse.json(
      { error: "Failed to fetch Group Class" },
      { status: 500 }
    );
  }
}
