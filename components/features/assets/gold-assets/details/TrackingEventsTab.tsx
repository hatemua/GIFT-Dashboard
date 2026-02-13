"use client";

import { TrackingEvent, LifecycleTimeline } from "@/types/asset";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  ArrowUpDown,
  Package,
  Activity,
  Clock,
  Link as LinkIcon,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { AddressDisplay } from "@/components/blockchain/address-display";

interface Props {
  events: TrackingEvent[];
  lifecycle: LifecycleTimeline;
}

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return {
    date: date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

const MetricCard = ({
  label,
  value,
  icon: Icon,
  compact = true,
}: {
  label: string;
  value: string | number;
  icon: any;
  compact?: boolean;
}) => (
  <Card className="rounded-xl border border-slate-200/50 bg-white/70 shadow-sm hover:shadow-md transition-all duration-200">
    <CardContent className="p-3 flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="text-xs">{label}</span>
        </div>
        <p className="text-sm font-medium text-slate-900">{value}</p>
      </div>

      <div
        className={`flex items-center justify-center rounded-xl bg-slate-100 ${
          compact ? "h-8 w-8" : "h-11 w-11"
        }`}
      >
        <Icon className={`${compact ? "h-4 w-4" : "h-5 w-5"} text-slate-600`} />
      </div>
    </CardContent>
  </Card>
);

export const TrackingEventsTab = ({ events, lifecycle }: Props) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Card className="space-y-10 mt-4 p-4">
      {/* ================= Metrics Section ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {/* Numeric Metrics */}
        <MetricCard
          label="Total Events"
          value={lifecycle.total_events}
          icon={Activity}
        />

        <MetricCard
          label="Transfers"
          value={lifecycle.total_transfers}
          icon={ArrowUpDown}
        />

        <MetricCard
          label="Custody Changes"
          value={lifecycle.total_custody_changes}
          icon={Shield}
        />

        <MetricCard
          label="Vault Movements"
          value={lifecycle.total_vault_movements}
          icon={Package}
        />

        {/* First Event Card */}
        <Card className="rounded-xl border border-slate-200/50 bg-white/70 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Calendar className="h-4 w-4 text-emerald-600" />
              <span className="text-xs">First Event</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">
                {formatTimestamp(lifecycle.first_event).date}
              </p>
              <p className="text-xs text-slate-400">
                {formatTimestamp(lifecycle.first_event).time}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Last Event Card */}
        <Card className="rounded-xl border border-slate-200/50 bg-white/70 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Clock className="h-4 w-4 text-amber-600" />
              <span className="text-xs">Last Event</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">
                {formatTimestamp(lifecycle.last_event).date}
              </p>
              <p className="text-xs text-slate-400">
                {formatTimestamp(lifecycle.last_event).time}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= Timeline Section ================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">
            Event Timeline
          </h3>
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
            {events.length} Events
          </Badge>
        </div>

{events.map((event, index) => {
  const time = formatTimestamp(event.timestamp);

  const eventKey =
    event.event_id || event.transaction_reference || `${event.timestamp}-${index}`;

  const isOpen = expanded === eventKey;

  const eventTitle =
    event.event_type ||
    event.transaction_type ||
    "Blockchain Event";

  return (
    <Card
      key={eventKey}
      className="group rounded-xl border border-slate-200/60 bg-white hover:shadow-sm transition-all duration-200"
    >
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition">
              <Activity className="h-3.5 w-3.5 text-slate-600" />
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-900 capitalize">
                {eventTitle.replace(/_/g, " ")}
              </h4>

              {event.description && (
                <p className="text-xs text-slate-500 mt-0.5">
                  {event.description}
                </p>
              )}

              <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400">
                {event.event_id && (
                  <>
                    <span className="font-mono">
                      #{event.event_id.slice(0, 8)}
                    </span>
                    <span>•</span>
                  </>
                )}

                <span>Block {event.block_number}</span>
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="text-right shrink-0">
            <p className="text-xs font-medium text-slate-800">
              {time.date}
            </p>
            <p className="text-[11px] text-slate-400">
              {time.time}
            </p>
          </div>
        </div>

        {/* Tx + Value */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <LinkIcon className="h-3 w-3" />
            <AddressDisplay
              address={event.transaction_hash}
              truncate
              startChars={6}
              endChars={4}
              className="font-mono text-slate-700"
            />
          </div>

          {event.transaction_reference && (
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Ref</span>
              <span className="font-mono text-slate-700">
                {event.transaction_reference}
              </span>
            </div>
          )}

          {event.valuation_snapshot && (
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Value</span>
              <span className="font-medium text-slate-900">
                {event.valuation_snapshot.asset_value}{" "}
                {event.valuation_snapshot.currency}
              </span>
            </div>
          )}
        </div>

        {/* Expand */}
        {event.details && Object.keys(event.details).length > 0 && (
          <div className="mt-4">
            <button
              onClick={() =>
                setExpanded(isOpen ? null : eventKey)
              }
              className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-900 transition"
            >
              {isOpen ? "Hide details" : "View details"}
              {isOpen ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </button>

            <div
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? "max-h-80 mt-3" : "max-h-0"
              }`}
            >
              <div className="space-y-1.5 border-t border-slate-100 pt-3">
                {Object.entries(event.details).map(([key, value]) => (
                  <div key={key} className="flex gap-3 text-[11px]">
                    <span className="min-w-[120px] text-slate-400 capitalize">
                      {key.replace(/_/g, " ")}
                    </span>
                    <span className="font-mono text-slate-700 break-all">
                      {typeof value === "object"
                        ? JSON.stringify(value)
                        : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
})}

      </div>
    </Card>
  );
};
