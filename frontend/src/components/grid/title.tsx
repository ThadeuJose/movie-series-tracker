interface RootProps {
  title: string;
}

export function Title({ title }: RootProps) {
  return (
    <div className="absolute inset-0 bg-black opacity-70 z-0 flex items-center justify-center">
      <div className="text-white text-3xl text-center px-4 py-2">{title}</div>
    </div>
  );
}
