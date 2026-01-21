import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Plus } from "lucide-react";
import Link from "next/link";

const EmptyVaultSites = () => {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center text-center py-14 space-y-5">
        {/* Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-50 text-gold-600">
          <Package className="h-7 w-7" />
        </div>

        {/* Text */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-900">
            No vault sites yet
          </h3>
          <p className="text-sm text-slate-500 max-w-sm">
            Vault sites represent physical locations where gold assets are
            securely stored.
          </p>
        </div>

        {/* Action */}
        <Link href="/vault-sites/new">
          <Button variant="gold">
            <Plus className="h-4 w-4" />
            Add Vault Site
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
export default EmptyVaultSites;
