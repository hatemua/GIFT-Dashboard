import { useGoldAccount } from "@/hooks/useGoldAccount";
import { AccountDetails } from "./AccountDetails";
import { AccountDetailsSkeleton, StatsSkeleton, ValuationAnalysisSkeleton } from "./Skeletons";
import { Stats } from "./Stats";
import { ValuationAnalysis } from "./ValuationAnalysis";

export const GoldAccountBasicInfo: React.FC = () => {
  const { selectedAccount: account, loading } = useGoldAccount();

  return (
    <div className="space-y-5">
      {/* ─────────────── STATS CARDS ROW ─────────────── */}
      {loading ? <StatsSkeleton /> : <Stats account={account} />}

      {/* ─────────────── DETAILS SECTION ─────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {loading ? (
          <>
            <AccountDetailsSkeleton />
            <ValuationAnalysisSkeleton />
          </>
        ) : (
          <>
            <AccountDetails account={account} />
            <ValuationAnalysis account={account} />
          </>
        )}
      </div>
    </div>
  );
};
