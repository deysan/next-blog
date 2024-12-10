export function Badge({ name }: { name: string }) {
  return (
    <span className="bg-gray-100 text-gray-700 text-xs font-medium px-1.5 py-1 rounded-full">
      {name}
    </span>
  );
}
