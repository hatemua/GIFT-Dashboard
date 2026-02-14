"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowLeftRight, Flame } from "lucide-react";

interface Props {
  tokenId: string;
}

export function AssetActions({ tokenId }: Props) {
  return (
    <Card className="flex justify-between p-4 mt-2">
      {/* Left: Secondary / informational */}
      <Button
        variant="destructive"
        size="sm"
        className="flex items-center gap-2"
      >
        <Flame className="h-3.5 w-3.5" />
        Burn Asset
      </Button>

      {/* Right: Primary actions */}
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="gold" size="sm" className="flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5" />
          Place in Custody
        </Button>

        <Button variant="default" size="sm" className="flex items-center gap-2">
          <ArrowLeftRight className="h-3.5 w-3.5" />
          Update Status
        </Button>
      </div>
    </Card>
  );
}
