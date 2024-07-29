import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import React from 'react';

interface IconPlanToWatchProps {
  index: number;
  watched: boolean;
  onClick: () => void;
}

export function IconWatched({ index, watched, onClick }: IconPlanToWatchProps) {
  return watched ? (
    <EyeIcon
      data-cy={`IconWatched-${index}`}
      className={`size-10 text-white opacity-85`}
      onClick={onClick}
    />
  ) : (
    <EyeSlashIcon
      data-cy={`IconNotWatched-${index}`}
      className={`size-10 text-white opacity-0 hover:opacity-85`}
      onClick={onClick}
    />
  );
}
