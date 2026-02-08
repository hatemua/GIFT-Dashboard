import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddressDisplay } from "@/components/blockchain/address-display";
import { BlockItem } from "@/types/block";
import { Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BlocksGridProps {
  blocks: BlockItem[];
}

export default function BlocksGrid({ blocks }: BlocksGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blocks.map((block) => (
        <Card
          key={block.block_hash}
          className="group relative overflow-hidden rounded-2xl border bg-background/60 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <CardContent className="space-y-4 p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Block hash</p>
                <p
                  className="truncate font-mono text-sm font-medium"
                  title={block.block_hash}
                >
                  <AddressDisplay
                    address={block.block_hash}
                    truncate
                    startChars={4}
                    endChars={4}
                  />
                </p>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Transactions</span>
              <span className="font-medium">
                {block.number_of_transactions}
              </span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2">
              {block.block_number && (
                <Badge variant="secondary">#{block.block_number}</Badge>
              )}

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={block.timestamp.toString()}>
                  {formatDate(new Date(block.timestamp * 1000), "short")}
                </time>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
