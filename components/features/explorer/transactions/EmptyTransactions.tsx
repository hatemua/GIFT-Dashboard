import React from "react";

export default function EmptyTransactions() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 py-20 text-center">
      <p className="text-sm font-medium text-slate-700">
        No transactions found
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Blockchain transactions will appear here once available
      </p>
    </div>
  );
}
