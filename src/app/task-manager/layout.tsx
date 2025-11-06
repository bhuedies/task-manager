import React from 'react';
import RouteGuard from '@/infrastructure/auth/RouteGuard';
import UserInfoBar from '@/components/login/UserForm';

interface TaskManagerLayoutProps {
  children: React.ReactNode;
}

export default function TaskManagerLayout({
  children,
}: TaskManagerLayoutProps) {
  return (
    <RouteGuard>
      <div className="flex min-h-screen bg-gray-50">
        <main className="flex-1 p-8">
          <UserInfoBar />
          {children}
        </main>
      </div>
    </RouteGuard>
  );
}
