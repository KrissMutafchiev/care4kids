import Institution from "@/models/Institution";
import connect from "@/utils/db";

import { NextResponse } from "next/server";

export const POST = async (request: any) => {
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
};
