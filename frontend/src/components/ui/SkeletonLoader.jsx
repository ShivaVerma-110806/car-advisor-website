export default function SkeletonCard() {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="skeleton h-52 w-full" />
      <div className="p-6 space-y-3">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-6 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/3 rounded" />
        <div className="flex gap-2">
          <div className="skeleton h-6 w-14 rounded-lg" />
          <div className="skeleton h-6 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
