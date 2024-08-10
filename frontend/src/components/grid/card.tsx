import { ReactNode } from 'react';

interface RootProps {
  children: ReactNode;
}

export function Card({ children }: RootProps) {
  return <div className="h-full w-fit flex">{children}</div>;
}
