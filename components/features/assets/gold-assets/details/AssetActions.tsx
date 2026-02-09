"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ShieldCheck, ArrowLeftRight, Flame } from "lucide-react";

interface Props {
  tokenId: string;
}

export function AssetActions({ tokenId }: Props) {
  return (
    <Card className="flex justify-between p-4">
      {/* Left: Secondary / informational */}
      <Link href={`/assets/${tokenId}/history`}>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5" />
          History
        </Button>
      </Link>

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

        <Button
          variant="destructive"
          size="sm"
          className="flex items-center gap-2"
        >
          <Flame className="h-3.5 w-3.5" />
          Burn Asset
        </Button>
      </div>
    </Card>
  );
}
