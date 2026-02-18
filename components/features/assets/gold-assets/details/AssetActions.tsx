"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowLeftRight, Flame } from "lucide-react";
import { BurnAssetModal } from "./modals/BurnAssetModal";
import { UpdateCustodyModal } from "./modals/UpdateCustodyModal";
import { UpdateAssetStatusModal } from "./modals/UpdateStatusModal";
import { AssetStatus } from "@/types/asset";

interface Props {
  tokenId: string;
  currentStatus: AssetStatus;
}

export function AssetActions({ tokenId, currentStatus }: Props) {
  const [isBurnOpen, setBurnOpen] = useState(false);
  const [isCustodyOpen, setCustodyOpen] = useState(false);
  const [isStatusOpen, setStatusOpen] = useState(false);

  return (
    <>
      <Card className="flex justify-between p-4 mt-2">
        {/* Left: Burn */}
        <Button
          variant="destructive"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setBurnOpen(true)}
        >
          <Flame className="h-3.5 w-3.5" />
          Burn Asset
        </Button>

        {/* Right: Custody / Status */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="gold"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setCustodyOpen(true)}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Place in Custody
          </Button>

          <Button
            variant="default"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setStatusOpen(true)}
          >
            <ArrowLeftRight className="h-3.5 w-3.5" />
            Update Status
          </Button>
        </div>
      </Card>

      {/* Modals */}
      <BurnAssetModal
        tokenId={tokenId}
        isOpen={isBurnOpen}
        onClose={() => setBurnOpen(false)}
      />
      <UpdateCustodyModal
        tokenId={tokenId}
        isOpen={isCustodyOpen}
        onClose={() => setCustodyOpen(false)}
      />

      <UpdateAssetStatusModal
        tokenId={tokenId}
        currentStatus={currentStatus}
        isOpen={isStatusOpen}
        onClose={() => setStatusOpen(false)}
      />
    </>
  );
}
