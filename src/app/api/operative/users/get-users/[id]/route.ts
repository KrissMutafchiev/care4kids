// import { NextResponse, NextRequest } from "next/server";

// import connect from "@/utils/db";
// import User from "@/models/User";
// import { Types } from "mongoose";

// export async function GET(req: NextRequest) {
//   try {
//     await connect();

//     // Get the query parameters
//     const { searchParams } = new URL(req.url);
//     const institutionId = searchParams.get("institutionId");

//     if (!institutionId || !Types.ObjectId.isValid(institutionId)) {
//       return NextResponse.json(
//         { error: "Invalid or missing institution ID" },
//         { status: 400 }
//       );
//     }

//     // Fetch teachers for the given institution
//     const teachers = await User.find({
//       role: "teacher", // Only teachers
//       institution: institutionId, // Match institution ID
//     })
//       .populate("institution", "name") // Populate institution details
//       .populate("groupClass", "name") // Populate groupClass details
//       .lean();

//     return NextResponse.json(teachers, { status: 200 });
//   } catch (error: any) {
//     console.error("Error fetching teachers:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch Teachers" },
//       { status: 500 }
//     );
//   }
// }
