"use client";

import { Button } from "@/components/ui/button";
import { useVaultSite } from "@/hooks/useVaultSite";

const countries = [
  { code: "", label: "All Countries" },
  { code: "CH", label: "Switzerland" },
  { code: "AH", label: "Austria" },
  // Add more countries here
];

export function VaultSitesFilters() {
  const { country, setCountry, setOffset, fetchVaultSites } = useVaultSite();

  const handleCountryFilter = (countryCode: string) => {
    setCountry(countryCode);
    setOffset(0);
    fetchVaultSites(50, 0, countryCode);
  };

  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {countries.map(({ code, label }) => (
        <Button
          key={code || "all"}
          size="sm"
          variant={country === code ? "gold" : "outline"}
          onClick={() => handleCountryFilter(code)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
