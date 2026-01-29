import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AddressDisplay } from "@/components/blockchain/address-display";

export interface BlockchainBlock {
  height: number;
  hash: string;
  timestamp: string;
  transactionsCount: number;
  producer: string;
  size?: number;
}

interface BlocksGridProps {
  blocks: BlockchainBlock[];
}

export default function BlocksGrid({ blocks }: BlocksGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blocks.map((block) => (
        <Card
          key={block.hash}
          className="group relative overflow-hidden rounded-2xl border bg-background/60 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <CardContent className="space-y-4 p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Block hash</p>
                <p
                  className="truncate font-mono text-sm font-medium"
                  title={block.hash}
                >
                  <AddressDisplay
                    address={block.hash}
                    truncate
                    startChars={4}
                    endChars={4}
                  />
                </p>
              </div>

              <Badge variant="outline">#{block.height}</Badge>
            </div>

            {/* Producer */}
            <div>
              <p className="text-xs text-muted-foreground">Producer</p>
              <p className="font-mono text-sm truncate" title={block.producer}>
                <AddressDisplay
                  address={block.producer}
                  truncate
                  startChars={4}
                  endChars={4}
                />
              </p>
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Transactions</span>
              <span className="font-medium">{block.transactionsCount}</span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2">
              {block.size && (
                <Badge variant="secondary">{block.size} bytes</Badge>
              )}

              <span className="text-xs text-muted-foreground">
                {block.timestamp}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
