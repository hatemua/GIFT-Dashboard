import { AssetSummary } from "@/types/asset";
import { useAuthStore } from "@/store/authStore";
import { useAsset } from "@/hooks/useAsset";
import { AssetOverviewCard } from "./AssetOverview";
import { OwnershipLocationCard } from "./OwnershipLocationCard";
import { ValuationCard } from "./ValuationCard";
import { ComplianceCard } from "./ComplianceCard";
import { AssetActions } from "./AssetActions";

interface Props {
  data: AssetSummary;
}

export const AssetSummaryTab = ({ data }: Props) => {
  const { isAdmin } = useAuthStore();
  const { assetDetails } = useAsset();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4">
          <AssetOverviewCard asset={assetDetails} />
          {assetDetails && <OwnershipLocationCard asset={assetDetails} />}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {assetDetails && <ValuationCard asset={assetDetails} />}
          <ComplianceCard asset={assetDetails} />
        </div>
      </div>

      {isAdmin && assetDetails && assetDetails.ownership.asset_status !== "burned" && (
        <AssetActions
          tokenId={assetDetails.token_id}
          currentStatus={assetDetails.ownership.asset_status}
        />
      )}
    </>
  );
};
