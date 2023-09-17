import React from 'react';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';

async function layout({ children }: { children: React.ReactNode }) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-col flex-1">
          <div className="flex flex-col flex-1">
            <div className="flex flex-col flex-1">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default layout;
