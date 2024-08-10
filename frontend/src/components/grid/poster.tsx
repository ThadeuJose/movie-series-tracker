import { ReactNode } from 'react';

interface RootProps {
  id: number;
  image: string;
  children: ReactNode;
}

export function Poster({ id, image, children }: RootProps) {
  return (
    <div
      data-cy={`Poster-${id}`}
      className="relative w-[300px] h-[450px]"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {children}
    </div>
  );
}
