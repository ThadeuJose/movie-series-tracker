import React, { ReactNode } from 'react';
import { IconStar } from '../../icon-star';

interface RootProps {
  vote: number;
}

export function Rating({ vote }: RootProps) {
  return (
    <div>
      <div className="flex relative">
        <IconStar />
        <div className="bg-black text-white text-xl my-auto px-2 pb-1 left-8 absolute top-1/2 -translate-y-1/2 rounded-r-xl">
          {vote}
        </div>
      </div>
    </div>
  );
}
