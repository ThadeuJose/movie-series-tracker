import React, { ReactNode } from 'react';

interface RootProps {
  children: ReactNode;
}

export function Root({ children }: RootProps) {
  return (
    <div className="max-h-full max-w-full min-w-0 min-h-0 grid grid-cols-4 justify-items-center gap-y-8 m-4">
      {children}
    </div>
  );
}
