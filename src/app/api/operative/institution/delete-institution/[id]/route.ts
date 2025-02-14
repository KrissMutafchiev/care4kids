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
