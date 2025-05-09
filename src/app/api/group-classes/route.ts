import { NextResponse } from "next/server";
import mongoose
  from "mongoose";
import connect from "@/utils/db";
import User from "@/models/User";
import Institution from "@/models/Institution"; 
import GroupClass from "@/models/GroupClass";



  export async function GET(req: Request) {
    try {
      await connect();
      const { searchParams } = new URL(req.url);
      const institutionId = searchParams.get("institution");
  
      const query: any = institutionId ? { institution: institutionId } : {};
  
      const groupClasses = await GroupClass.find(query)
        .populate("institution")
        .populate({path: "teacher", model: User });
      
      return NextResponse.json(groupClasses, { status: 200 });
    } catch (error) {
      console.error("Error fetching Group Class:", error);
      return NextResponse.json(
        { error: "Failed to fetch Group Class" },
        { status: 500 }
      );
    }
  }
  

export const POST = async (request: Request) => {
  try {
    const { name, institution, teacher } = await request.json();

    await connect();

    if (!mongoose.Types.ObjectId.isValid(institution)) {
      return new NextResponse("Invalid Institution ID", { status: 400 });
    }

    if (!Array.isArray(teacher) || teacher.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      return new NextResponse("Invalid Teacher ID(s)", { status: 400 });
    }

    const validTeachers = await User.find({ _id: { $in: teacher }, role: "teacher" });
    if (validTeachers.length !== teacher.length) {
      return new NextResponse("One or more teachers do not exist", { status: 400 });
    }

    const newGroupClass = new GroupClass({ name, institution, teacher });

    await newGroupClass.save();

    const groupClass = await GroupClass.findById(newGroupClass._id)
      .populate("institution")
      // .populate("teacher", "firstName lastName email");

    return NextResponse.json(groupClass, { status: 201 });
  } catch (err) {
    console.error("Error creating Group Class:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
