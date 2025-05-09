import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import User from "@/models/User";
import Institution from "@/models/Institution"; 
import GroupClass from "@/models/GroupClass"; 
import connect from "@/utils/db";
import bcrypt from "bcryptjs";


// ✅ GET USERS (Fetch all users with optional filtering)
export async function GET(request: NextRequest) {
  try {
    await connect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const role = searchParams.get("role");
    const institution = searchParams.get("institutions");
    const groupClass = searchParams.get("groupClasses");

      const filter: any = {};
      
      if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) {
          filter._id = new mongoose.Types.ObjectId(id);
        } else {
          return NextResponse.json({ error: "Invalid user ID format" }, { status: 400 });
        }
      }

      
    if (role) filter.role = role;
    if (institution) filter.institution = institution;
    if (groupClass) filter.groupClass = groupClass;

    const users = await User.find(filter)
      .populate({ path: "institution", model: Institution, select: "name" }) // Ensure correct model usage
      .populate({ path: "groupClass", model: GroupClass, select: "name" }) // Ensure correct model usage
      .lean();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users." },
      { status: 500 }
    );
  }
}

// ✅ CREATE USER (POST request)
export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, institution, groupClass, role } =
      await request.json();

    if (!firstName || !lastName || !email || !institution || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already in use" },
        { status: 400 }
      );
    }

    // Generate random password and hash it
    const randomPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      institution,
      groupClass: groupClass || null,
      role,
      isFirstLogin: true,
    });

    await newUser.save();

    // Fetch updated list of users with the same role & institution
    const teachers = await User.find({ role, institution })
      .populate("institution", "name")
      .populate("groupClass", "name")
      .lean();

    return NextResponse.json(
      {
        teachers,
        message: `User with role ${role} registered successfully`,
        tempPassword: randomPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
