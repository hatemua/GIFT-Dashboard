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
import { BlockItem } from "@/types/block";
import { formatDate } from "@/lib/utils";

interface BlocksTableProps {
  blocks: BlockItem[];
}

export default function BlocksTable({ blocks }: BlocksTableProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>Block Hash</TableHead>
                <TableHead>Block Number</TableHead>
                <TableHead>Transactions</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {blocks.map((block) => (
                <TableRow
                  key={block.block_hash}
                  className="transition hover:bg-muted/30"
                >
                  {/* Hash */}
                  <TableCell
                    className="max-w-[180px] truncate font-mono text-sm"
                    title={block.block_hash}
                  >
                    <AddressDisplay
                      address={block.block_hash}
                      truncate
                      startChars={6}
                      endChars={6}
                    />
                  </TableCell>

                  {/* Block Number */}
                  <TableCell>
                    {block.block_number ? `#${block.block_number}` : "-"}
                  </TableCell>

                  {/* Transactions */}
                  <TableCell>
                    <Badge variant="outline">
                      {block.number_of_transactions}
                    </Badge>
                  </TableCell>

                  {/* Timestamp */}
                  <TableCell>
                    <time dateTime={block.timestamp.toString()}>
                      {formatDate(new Date(block.timestamp * 1000), "relative")}
                    </time>
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
