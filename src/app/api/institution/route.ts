import { NextRequest, NextResponse } from "next/server";
import Institution from "@/models/Institution";
import connect from "@/utils/db";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const filter: any = {};

    if (id) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        filter._id = new mongoose.Types.ObjectId(id);
      } else {
        return NextResponse.json(
          { error: "Invalid Institution ID format" },
          { status: 400 }
        );
      }
    }

    const institutions = await Institution.find(filter).lean();
    return NextResponse.json(institutions, { status: 200 });
  } catch (error) {
    console.error("Error fetching institutions:", error);
    return NextResponse.json(
      { error: "Failed to fetch institutions" },
      { status: 500 }
    );
  }
}

export const POST = async (request: NextRequest) => {
  const { name, address, email, contactPerson, uic } = await request.json();

  await connect();

  const existingInstitution = await Institution.findOne({ name });

  if (existingInstitution) {
    return new NextResponse("Institution is already in use", { status: 400 });
  }

  const newInstitution = new Institution({
    name,
    address,
    email,
    uic,
    contactPerson
  });

  try {
    await newInstitution.save();
    const institutions = await Institution.find();
    return  NextResponse.json(institutions, { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
}
