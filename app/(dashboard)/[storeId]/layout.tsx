import React from 'react';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-col flex-1">
          <div className="flex flex-col flex-1">
            <h3>This Will be Nav bar</h3>
            <div className="flex flex-col flex-1">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
