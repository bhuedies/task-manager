import { NextResponse } from 'next/server';
import { mockDbInstance } from '@/infrastructure/data/mockData';

export async function GET() {
  const users = mockDbInstance.getUsers();
  return NextResponse.json(users, { status: 200 });
}
