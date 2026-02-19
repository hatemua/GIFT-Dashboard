import React, { useState } from "react";
import { TransactionDetails } from "@/types/transaction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Scale,
  Gem,
  Layers,
  MoreVertical,
  RefreshCw,
  UserCheck,
  Repeat,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { formatWeight } from "@/lib/utils";
import Link from "next/link";
import { UpdateCustodyModal } from "../../assets/gold-assets/details/modals/UpdateCustodyModal";
import { UpdateAssetStatusModal } from "../../assets/gold-assets/details/modals/UpdateStatusModal";
import { AssetStatus } from "@/types/asset";
import { TransferAssetModal } from "../../assets/gold-assets/details/modals/TransferAssetModal";
import { useAuthStore } from "@/store/authStore";
import { StatusBadge } from "@/components/data-display/status-badge";
import { getAssetStatusLabel } from "@/lib/assets";
import { useTransaction } from "@/hooks/useTransaction";

interface AssetItem {
  token_id: string;
  quantity: number;
  weight_grams: number;
  fine_weight_grams: number;
  status: AssetStatus;
}

interface TransactionAssetsProps {
  transaction: TransactionDetails;
}

export const TransactionAssets: React.FC<TransactionAssetsProps> = ({
  transaction,
}) => {
  const { fetchTransactionByReference } = useTransaction();
  const { isAdmin } = useAuthStore();

  const transactionStatus = transaction.status;
  const [isCustodyOpen, setCustodyOpen] = useState(false);
  const [isStatusOpen, setStatusOpen] = useState(false);
  const [isTransferOpen, setTransferOpen] = useState(false);
  const [currentAsset, setCurrentAsset] = useState<AssetItem | null>(null);

  const handleUpdateStatus = (asset: AssetItem) => {
    setCurrentAsset(asset);
    setStatusOpen(true);
    setCustodyOpen(false);
    setTransferOpen(false);
  };

  const handleUpdateCustody = (asset: AssetItem) => {
    setCurrentAsset(asset);
    setCustodyOpen(true);
    setStatusOpen(false);
    setTransferOpen(false);
  };

  const handleTransferAsset = (asset: AssetItem) => {
    setCurrentAsset(asset);
    setTransferOpen(true);
    setCustodyOpen(false);
    setStatusOpen(false);
  };

  const onUpdate = async () => {
    await fetchTransactionByReference(transaction.transaction_reference);
  };

  if (transaction.assets.length === 0)
    return (
      <div className="text-center py-10 px-6 bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-50 to-yellow-100">
          <Gem className="w-8 h-8 text-yellow-500" />
        </div>

        <h4 className="text-lg font-semibold text-slate-800 mb-1">
          No Gold Assets Found
        </h4>

        <p className="text-sm text-slate-500 max-w-xs mx-auto">
          This transaction currently has no gold assets attached.
        </p>
      </div>
    );

  return (
    <>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-slate-500" />
            Assets
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {transaction.assets.map((asset: AssetItem, idx: number) => (
            <Link href={`/assets/${asset.token_id}`} key={idx}>
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:shadow-md"
              >
                {/* Left side: Token ID */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">
                    Token ID:
                  </span>
                  <p className="font-medium text-slate-900 truncate">
                    {asset.token_id}
                  </p>
                  <StatusBadge status={getAssetStatusLabel(asset.status)} />
                </div>

                {/* Right side: Asset details + Dropdown */}
                <div className="flex items-center gap-3">
                  {/* Asset details */}
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="flex items-center gap-1 rounded-full bg-slate-50 px-2 py-1">
                      <Scale className="w-4 h-4 text-slate-500" />
                      <span>{formatWeight(asset.weight_grams)}</span>
                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1">
                      <Gem className="w-4 h-4 text-amber-600" />
                      <span>{asset.fine_weight_grams}</span>
                    </div>
                  </div>

                  {/* Dropdown actions */}
                  {isAdmin && (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <div className="cursor-pointer h-8 w-8 p-0 rounded-full flex items-center justify-center hover:bg-slate-100">
                          <MoreVertical className="h-4 w-4" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        direction="top"
                        align="end"
                        className="z-50 min-w-[180px] rounded-lg border border-slate-200 bg-white/95 backdrop-blur-md shadow-lg py-1 animate-slide-down-fade"
                      >
                        <DropdownMenuItem
                          onClick={() => handleUpdateStatus(asset)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                        >
                          <RefreshCw className="h-4 w-4 text-slate-500" />
                          Update Status
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleUpdateCustody(asset)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                        >
                          <UserCheck className="h-4 w-4 text-slate-500" />
                          Update Custody
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
      {currentAsset && (
        <TransferAssetModal
          tokenId={currentAsset.token_id}
          from_igan={transaction.parties.initiator.igan}
          to_igan={transaction.parties.counterparty.igan}
          transaction_reference={transaction.transaction_reference}
          isOpen={isTransferOpen}
          onClose={() => setTransferOpen(false)}
        />
      )}
      {currentAsset && (
        <UpdateCustodyModal
          tokenId={currentAsset.token_id}
          isOpen={isCustodyOpen}
          onClose={() => setCustodyOpen(false)}
        />
      )}

      {currentAsset && currentAsset?.status && (
        <UpdateAssetStatusModal
          tokenId={currentAsset.token_id}
          currentStatus={currentAsset?.status}
          isOpen={isStatusOpen}
          onClose={() => setStatusOpen(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};
