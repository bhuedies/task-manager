import { NextResponse } from 'next/server';
import { mockDbInstance } from '@/infrastructure/data/mockData';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  const user = mockDbInstance.getUserById(userId);

  if (!user) {
    return NextResponse.json(
      { message: 'User not found in mock database' },
      { status: 404 }
    );
  }

  return NextResponse.json(user, { status: 200 });
}
