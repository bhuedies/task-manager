'use client';

import { useAuth } from '@/infrastructure/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, accessToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (accessToken === null && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, accessToken, router]);

  if (!isAuthenticated && accessToken === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
