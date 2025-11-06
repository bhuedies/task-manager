import { NextResponse } from 'next/server';
import { mockDbInstance } from '@/infrastructure/data/mockData';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await mockDbInstance.getUserById(id);

  if (!user) {
    return NextResponse.json(
      { message: 'User not found in mock database' },
      { status: 404 }
    );
  }

  return NextResponse.json(user, { status: 200 });
}
