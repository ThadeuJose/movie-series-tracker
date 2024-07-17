import { BookmarkIcon } from '@heroicons/react/20/solid';
import React from 'react';

interface IconPlanToWatchProps {
  isInList: boolean;
  onClick: () => void;
}

export function IconPlanToWatch({ isInList, onClick }: IconPlanToWatchProps) {
  const activeClass = isInList
    ? 'text-emerald-500'
    : 'text-emerald-500 opacity-0 hover:opacity-85';
  return (
    <BookmarkIcon
      className={`ml-auto size-10 ${activeClass}`}
      onClick={onClick}
    />
  );
}
