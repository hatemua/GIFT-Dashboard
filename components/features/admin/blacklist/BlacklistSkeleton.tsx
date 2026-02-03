"use client";

interface BlacklistSkeletonProps {
  view: "grid" | "table";
  count?: number;
}

export default function BlacklistSkeleton({ view, count = 4 }: BlacklistSkeletonProps) {
  const skeletonItems = Array.from({ length: count });

  if (view === "grid") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {skeletonItems.map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse group relative bg-white rounded-lg border border-gray-200 shadow-sm p-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-lg bg-gray-200" />
                  <div className="space-y-1">
                    <div className="h-3 w-16 bg-gray-200 rounded" />
                    <div className="h-2 w-12 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div className="h-8 w-full bg-gray-200 rounded" />
                <div className="h-8 w-full bg-gray-200 rounded" />
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="h-7 w-full bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Table view skeleton
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-50/50">
          <tr>
            <th className="h-12 w-1/4 px-3 font-semibold text-gray-700">Member</th>
            <th className="h-12 w-1/4 px-3 font-semibold text-gray-700">Blacklisted At</th>
            <th className="h-12 w-1/4 px-3 font-semibold text-gray-700">Admin</th>
            <th className="h-12 w-1/4 px-3 font-semibold text-gray-700 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {skeletonItems.map((_, idx) => (
            <tr key={idx} className="animate-pulse border-t border-gray-100">
              <td className="px-3 py-2">
                <div className="h-6 w-20 bg-gray-200 rounded" />
              </td>
              <td className="px-3 py-2">
                <div className="h-6 w-16 bg-gray-200 rounded" />
              </td>
              <td className="px-3 py-2">
                <div className="h-6 w-16 bg-gray-200 rounded" />
              </td>
              <td className="px-3 py-2 text-right">
                <div className="h-6 w-12 bg-gray-200 rounded ml-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
