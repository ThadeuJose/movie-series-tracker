import { BookmarkIcon } from '@heroicons/react/20/solid';

interface IconPlanToWatchProps {
  dataCy: string;
  isInList: boolean;
  onClick: () => void;
}

export function IconPlanToWatch({
  dataCy,
  isInList,
  onClick,
}: IconPlanToWatchProps) {
  const activeClass = isInList ? 'opacity-85' : 'opacity-0 hover:opacity-85';
  return (
    <BookmarkIcon
      data-cy={dataCy}
      className={`ml-auto size-10 text-emerald-500 ${activeClass}`}
      onClick={onClick}
    />
  );
}
