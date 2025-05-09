import { NextRequest, NextResponse } from "next/server";
import Institution from '@/models/Institution';
import connect from "@/utils/db";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await connect();

    const deleteInstitution = await Institution.findByIdAndDelete(id);

    if (!deleteInstitution) {
      return NextResponse.json(
        { error: "Group Class not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Institution deleted successfully.", deleteInstitution },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Institution:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the Institution." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await request.json();
    const { name, address, email, uic, contactPerson } = body;
  
    // Validate required fields
    if (!name || !address || !email || !uic || !contactPerson) {
      return NextResponse.json(
        { error: "All fields (name, address, email, UIC, contactPerson) are required." },
        { status: 400 }
      );
    }
  
    try {
      await connect();
  
      const updatedInstitution = await Institution.findByIdAndUpdate(
        id,
        { name, address, email, uic, contactPerson },
        { new: true, runValidators: true } // Return updated doc & apply validation
      );
  
      if (!updatedInstitution) {
        return NextResponse.json(
          { error: "Institution not found." },
          { status: 404 }
        );
      }
  
      return NextResponse.json(updatedInstitution, { status: 200 });
    } catch (error) {
      console.error("Error updating institution:", error);
      return NextResponse.json(
        { error: "Failed to update institution." },
        { status: 500 }
      );
    }
  }


