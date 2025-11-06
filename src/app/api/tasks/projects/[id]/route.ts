import { mockDbInstance } from '@/infrastructure/data/mockData';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const task = await mockDbInstance.getTasksByProjectId(id);
  if (!task) {
    return NextResponse.json(
      { message: 'Task not found in mock database' },
      { status: 404 }
    );
  }

  return NextResponse.json(task, { status: 200 });
}
