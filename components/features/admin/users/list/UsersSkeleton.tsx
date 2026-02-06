import { Card, CardContent } from "@/components/ui/card";

export default function UsersSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="space-y-4 py-6">
            <div className="h-5 w-1/2 rounded bg-slate-200" />
            <div className="h-4 w-1/3 rounded bg-slate-200" />
            <div className="h-10 w-full rounded bg-slate-200" />
            <div className="h-4 w-2/3 rounded bg-slate-200" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
