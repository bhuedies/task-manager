import { NextResponse } from 'next/server';
import { mockDbInstance } from '@/infrastructure/data/mockData';

export async function PUT(request: Request) {
  const task = await request.json();
  if (task.status) {
    mockDbInstance.statusOnTask(task.id);
  } else {
    mockDbInstance.statusOffTask(task.id);
  }
  return NextResponse.json(task, { status: 200 });
}
