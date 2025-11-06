import { mockDbInstance } from '@/infrastructure/data/mockData';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const project = mockDbInstance.getProjectById(id);
  if (!project) {
    return NextResponse.json(
      { message: 'project not found in mock database' },
      { status: 404 }
    );
  }

  return NextResponse.json(project, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  mockDbInstance.deleteProject(id);
  mockDbInstance.deleteTaskByProjectId(id);
  return NextResponse.json(null, { status: 200 });
}
