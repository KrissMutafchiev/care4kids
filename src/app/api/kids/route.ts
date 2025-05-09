import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import Kid from "@/models/Kid";
import connect from "@/utils/db";

// 🔍 GET all kids or filter by institution, group, or teacher
export async function GET(request: NextRequest) {
  try {
    await connect();

    const { searchParams } = new URL(request.url);
    const institution = searchParams.get("institution");
    const group = searchParams.get("group");
    const teacher = searchParams.get("teacher");

    const filter: any = {};
    if (institution) filter.institution = institution;
    if (group) filter.group = group;
    if (teacher) filter.teachers = teacher;

    const kids = await Kid.find(filter)
      .populate("institution", "name")
      .populate("group", "name")
      // .populate({ path: "teachers", select: "firstName lastName", model: User })
      // .populate("parents", "firstName lastName")
      .lean();

    return NextResponse.json(kids, { status: 200 });
  } catch (error) {
    console.error("Error fetching kids:", error);
    return NextResponse.json({ error: "Failed to fetch kids." }, { status: 500 });
  }
}

// ➕ POST (Create a new kid)
export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();

    const {
      firstName,
      lastName,
      middleName,
      gender,
      age,
      group,
      teachers,
      institution,
      parents,
    } = body;

    if (!firstName || !lastName || !middleName || !gender || !age || !institution) {
      return NextResponse.json({ error: "All required fields must be filled." }, { status: 400 });
    }

    const newKid = new Kid({
      firstName,
      lastName,
      middleName,
      gender,
      age,
      group,
      teachers,
      institution,
      parents,
    });

    await newKid.save();

    return NextResponse.json(newKid, { status: 201 });
  } catch (error) {
    console.error("Error creating kid:", error);
    return NextResponse.json({ error: "Failed to create kid." }, { status: 500 });
  }
}
