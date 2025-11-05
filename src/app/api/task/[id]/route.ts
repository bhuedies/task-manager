import { mockDbInstance } from '@/infrastructure/data/mockData';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const task = mockDbInstance.getTaskById(id);
  console.log('🚀 ~ GET ~ task:', task);

  if (!task) {
    return NextResponse.json(
      { message: 'Task not found in mock database' },
      { status: 404 }
    );
  }

  return NextResponse.json(task, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  mockDbInstance.deleteTask(id);
  return NextResponse.json(null, { status: 204 });
}
