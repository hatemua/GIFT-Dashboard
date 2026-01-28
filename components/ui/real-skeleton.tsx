// components/ui/real-skeleton.tsx
import { cn } from "@/lib/utils";

export default function RealSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "animate-pulse rounded bg-slate-200 dark:bg-slate-800",
        className
      )}
    />
  );
}
