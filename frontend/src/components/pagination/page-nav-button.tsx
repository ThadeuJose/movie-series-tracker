interface PageNavButtonProps {
  iconType: 'Previous' | 'Next';
  onClick: () => void;
}

export function PageNavButton({ iconType, onClick }: PageNavButtonProps) {
  const iconStyles = new Map<string, string>([
    ['Previous', 'border-r'],
    ['Next', 'border-l'],
  ]);

  return (
    <span
      data-cy={`Icon${iconType}Page`}
      className={`cursor-pointer px-4 py-2 border-black ${iconStyles.get(
        iconType,
      )}`}
      onClick={onClick}
    >
      {iconType}
    </span>
  );
}
