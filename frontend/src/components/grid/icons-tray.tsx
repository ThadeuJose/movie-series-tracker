import React, { ReactNode } from 'react';

interface RootProps {
  children: ReactNode;
}

export function IconsTray({ children }: RootProps) {
  return <div className="flex flex-col ml-auto">{children}</div>;
}
