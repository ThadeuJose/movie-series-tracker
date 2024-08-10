interface PageNumberProps {
  page: number;
}

export function PageNumber({ page }: PageNumberProps) {
  return (
    <span data-cy="PageNumber" className="px-3">
      {page}
    </span>
  );
}
