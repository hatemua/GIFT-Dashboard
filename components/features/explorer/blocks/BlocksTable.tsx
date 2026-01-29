import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddressDisplay } from "@/components/blockchain/address-display";

interface BlockchainBlock {
  height: number;
  hash: string;
  timestamp: string;
  transactionsCount: number;
  producer: string;
  size?: number;
}

interface BlocksTableProps {
  blocks: BlockchainBlock[];
}

export default function BlocksTable({ blocks }: BlocksTableProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>Height</TableHead>
                <TableHead>Block Hash</TableHead>
                <TableHead className="hidden md:table-cell">Producer</TableHead>
                <TableHead>Txs</TableHead>
                <TableHead className="hidden lg:table-cell">Size</TableHead>
                <TableHead className="hidden md:table-cell">
                  Timestamp
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {blocks.map((block) => (
                <TableRow
                  key={block.hash}
                  className="transition hover:bg-muted/30"
                >
                  {/* Height */}
                  <TableCell className="font-medium">#{block.height}</TableCell>

                  {/* Hash */}
                  <TableCell
                    className="max-w-[180px] truncate font-mono text-sm"
                    title={block.hash}
                  >
                    <AddressDisplay
                      address={block.hash}
                      truncate
                      startChars={6}
                      endChars={6}
                    />
                  </TableCell>

                  {/* Producer */}
                  <TableCell
                    className="hidden md:table-cell max-w-[180px] truncate font-mono"
                    title={block.producer}
                  >
                    <AddressDisplay
                      address={block.producer}
                      truncate
                      startChars={6}
                      endChars={6}
                    />
                  </TableCell>

                  {/* Transactions */}
                  <TableCell>
                    <Badge variant="outline">{block.transactionsCount}</Badge>
                  </TableCell>

                  {/* Size */}
                  <TableCell className="hidden lg:table-cell">
                    {block.size ? `${block.size} bytes` : "-"}
                  </TableCell>

                  {/* Timestamp */}
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                    {block.timestamp}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
