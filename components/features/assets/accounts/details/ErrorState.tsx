"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Info, Search } from "lucide-react";

export default function ErrorState() {
  return (
    <Card className="border border-gray-200 shadow-sm w-full mx-auto mt-4 py-6">
      <CardContent className="p-6 max-w-md mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center">
            <Search className="h-8 w-8 text-amber-500" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No Gold Account Found
            </h3>
            <p className="text-gray-500 text-sm">
              We couldn't locate a gold account with the ID provided.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-left w-full">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Info className="h-4 w-4 text-gray-400" />
              <span className="font-medium">Possible reasons:</span>
            </div>
            <ul className="text-sm text-gray-500 space-y-1 ml-6 list-disc">
              <li>Incorrect account ID entered</li>
              <li>Account has been closed or transferred</li>
              <li>You don't have access to this account</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
