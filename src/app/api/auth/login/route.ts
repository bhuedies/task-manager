import { AuthSession } from '@/domain/entities/Auth';
import { mockDbInstance } from '@/infrastructure/data/mockData';
import { NextResponse } from 'next/server';

const TOKEN = '12345';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const mockUser = mockDbInstance.getUserValidUser(email, password);

  if (mockUser) {
    const session: AuthSession = {
      accessToken: TOKEN,
      userId: mockUser.id,
      expiresAt: Date.now() + 3600000,
    };
    return NextResponse.json(session, { status: 200 });
  }

  return NextResponse.json(
    { message: 'Invalid email or password' },
    { status: 401 }
  );
}
