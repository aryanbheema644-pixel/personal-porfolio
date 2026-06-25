export default function ProgressBars({
  total,
  current,
  progress,
}: {
  total: number;
  current: number;
  progress: number;
}) {
  return (
    <div className="absolute top-2 left-2 right-2 flex gap-1 z-30">
      {Array.from({ length: total }).map((_, i) => {
        const fill = i < current ? 1 : i === current ? progress : 0;
        return (
          <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white"
              style={{ width: `${fill * 100}%`, transition: 'width 50ms linear' }}
            />
          </div>
        );
      })}
    </div>
  );
}
