"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { truncateAddress } from "@/lib/utils";

interface AddressDisplayProps {
  address: string;
  truncate?: boolean;
  className?: string;
  startChars?: number;
  endChars?: number;
}

export function AddressDisplay({
  address,
  truncate = true,
  className,
  startChars = 6,
  endChars = 4,
}: AddressDisplayProps) {
  const [copied, setCopied] = useState(false);

  const displayAddress = truncate
    ? truncateAddress(address, startChars, endChars)
    : address;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyToClipboard}
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-sm",
        "px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200",
        "transition-colors duration-150",
        className
      )}
      title={address}
    >
      <span className="text-slate-700">{displayAddress}</span>
      {copied ? (
        <Check className="h-3.5 w-3.5 text-emerald-600" />
      ) : (
        <Copy className="h-3.5 w-3.5 text-slate-400" />
      )}
    </button>
  );
}
