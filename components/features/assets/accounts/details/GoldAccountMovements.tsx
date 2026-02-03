"use client";

import {
  Package,
  ArrowDownLeft,
  ArrowUpRight,
  Scale,
  DollarSign,
  Hash,
  Calendar,
  User,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { GoldAccountMovement } from "@/types/goldAccount";
import { useEffect } from "react";
import { useGoldAccount } from "@/hooks/useGoldAccount";

interface Props {
  movement: GoldAccountMovement;
}

export function GoldAccountMovementCard({ movement }: Props) {
  const isInbound = movement.type === "deposit" || movement.type === "credit";

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
      {/* Header */}
      <div
        className={`relative h-20 rounded-t-2xl bg-gradient-to-r ${
          isInbound
            ? "from-emerald-100 to-emerald-50"
            : "from-amber-100 to-amber-50"
        }`}
      >
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div
            className={`h-9 w-9 rounded-xl flex items-center justify-center ${
              isInbound ? "bg-emerald-200" : "bg-amber-200"
            }`}
          >
            {isInbound ? (
              <ArrowDownLeft className="h-4 w-4 text-emerald-700" />
            ) : (
              <ArrowUpRight className="h-4 w-4 text-amber-700" />
            )}
          </div>

          <div>
            <p className="text-xs text-slate-500">Movement</p>
            <p className="text-sm font-semibold text-slate-900 capitalize">
              {movement.type}
            </p>
          </div>
        </div>

        <div className="absolute top-3 right-3 text-right">
          <p className="text-xs text-slate-500">Balance After</p>
          <p className="text-sm font-semibold text-slate-900">
            {(movement.balance_after_grams / 1000).toFixed(2)} kg
          </p>
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Reference */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Hash className="h-3 w-3" />
            <span>{movement.reference}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Calendar className="h-3 w-3" />
            <span>{new Date(movement.date).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Asset summary */}
        <div className="grid grid-cols-3 gap-3">
          <Metric
            icon={<Package className="h-4 w-4" />}
            label="Assets"
            value={movement.asset_details.asset_count}
          />
          <Metric
            icon={<Scale className="h-4 w-4" />}
            label="Weight"
            value={`${(
              movement.asset_details.total_weight_grams / 1000
            ).toFixed(2)} kg`}
          />
          <Metric
            icon={<DollarSign className="h-4 w-4" />}
            label="Value"
            value={`$${movement.asset_details.valuation_at_movement.value_usd.toLocaleString()}`}
          />
        </div>

        {/* Counterparty */}
        <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-500">
            <User className="h-3 w-3" />
            <span>Counterparty</span>
          </div>
          <span className="font-medium text-slate-800">
            {movement.counterparty_igan}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------- Small Metric Component ---------- */

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
      <div className="flex justify-center mb-1 text-slate-500">{icon}</div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

interface GoldAccountMovementsProps {
  igan: string;
}

const GoldAccountMovements: React.FC<GoldAccountMovementsProps> = ({
  igan,
}) => {
  const { accountMovements, loading, fetchAccountMovements } = useGoldAccount();
  useEffect(() => {
    if (igan) {
      fetchAccountMovements(igan);
    }
  }, [igan]);
  return (
    <Card>
      {accountMovements?.movements.map((movement) => (
        <GoldAccountMovementCard
          key={movement.transaction_id}
          movement={movement}
        />
      ))}
    </Card>
  );
};

export default GoldAccountMovements;
