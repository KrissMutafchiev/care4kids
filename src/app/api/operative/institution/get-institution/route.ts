import { NextResponse } from 'next/server';
import connect from "@/utils/db";
import Institution from '@/models/Institution';

export async function GET() {
  try {
    await connect();
    const institutions = await Institution.find();
    return NextResponse.json(institutions, { status: 200 });
  } catch (error) {
    console.error('Error fetching institutions:', error);
    return NextResponse.json({ error: 'Failed to fetch institutions' }, { status: 500 });
  }
}