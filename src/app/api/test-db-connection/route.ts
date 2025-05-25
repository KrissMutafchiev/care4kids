import { NextResponse } from "next/server";
import connect from "@/utils/db";

export async function GET() {
  try {
    // Attempt to connect to MongoDB
    await connect();

    // If we reach here, connection was successful
    return NextResponse.json({
      success: true,
      message: "Successfully connected to MongoDB",
      database: "care4kids",
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to MongoDB",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
