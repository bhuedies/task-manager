import { NextResponse } from 'next/server';
import { mockDbInstance } from '@/infrastructure/data/mockData';

export async function GET() {
  const projects = mockDbInstance.getProjects();
  return NextResponse.json(projects, { status: 200 });
}

export async function POST(request: Request) {
  const project = await request.json();
  mockDbInstance.createProject(project);
  return NextResponse.json(project, { status: 201 });
}

export async function PUT(request: Request) {
  const project = await request.json();
  mockDbInstance.updateProject(project);
  return NextResponse.json(project, { status: 200 });
}
