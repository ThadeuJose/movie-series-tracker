import React, { ReactNode } from 'react';

interface RootProps {
  children: ReactNode;
}

export function Header({ children }: RootProps) {
  return <div className="flex mt-2 mx-2">{children}</div>;
}
