import GroupClass from "@/models/GroupClass";
import connect from "@/utils/db";

import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { name, institution, kids, teacher } = await request.json();

  await connect();

  const existinGroupClass = await GroupClass.findOne({ name });

  if (existinGroupClass) {
    return new NextResponse("Group Class is already in use", { status: 400 });
  }

  const newGroupClass = new GroupClass({
    name,
    institution,
    kids: kids || [], // Optional
    teacher: teacher || [], // Optional
  });

  try {
    await newGroupClass.save();
    const groupClass = await GroupClass.findById(newGroupClass._id).populate('institution');
    return NextResponse.json(groupClass, { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
