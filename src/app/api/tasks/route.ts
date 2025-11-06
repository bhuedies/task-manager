import { NextResponse } from 'next/server';
import { mockDbInstance } from '@/infrastructure/data/mockData';

export async function GET() {
  const tasks = mockDbInstance.getTasks();
  return NextResponse.json(tasks, { status: 200 });
}

export async function POST(request: Request) {
  const task = await request.json();
  mockDbInstance.createTask(task);
  return NextResponse.json(task, { status: 201 });
}

export async function PUT(request: Request) {
  const task = await request.json();
  mockDbInstance.updateTask(task);
  return NextResponse.json(task, { status: 200 });
}
