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

interface Transaction {
  hash: string;
  block: number;
  type: string;
  asset: string;
  from: string;
  to: string;
  status: string;
  timestamp: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

export default function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tx Hash</TableHead>
              <TableHead>Block</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.hash}>
                <TableCell className="font-mono text-sm">
                  {tx.hash}
                </TableCell>
                <TableCell>{tx.block}</TableCell>
                <TableCell>{tx.type}</TableCell>
                <TableCell>{tx.asset}</TableCell>
                <TableCell>{tx.from}</TableCell>
                <TableCell>{tx.to}</TableCell>
                <TableCell>
                  <Badge variant="success">{tx.status}</Badge>
                </TableCell>
                <TableCell>{tx.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
