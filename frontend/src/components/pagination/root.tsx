import { ReactNode } from 'react';

interface RootProps {
  children: ReactNode;
}

export function Root({ children }: RootProps) {
  return (
    <div className="m-auto flex flex-row justify-center items-center my-6 border border-black rounded-lg w-fit">
      {children}
    </div>
  );
}
