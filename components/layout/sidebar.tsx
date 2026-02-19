"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navigation } from "@/constants/navigation";
import { ChevronRight, LogOut } from "lucide-react";
import { useState } from "react";
import { useLogout } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { useUser } from "@/hooks/useUser";
import { AddressDisplay } from "../blockchain/address-display";

export function Sidebar() {
  const { isAdmin } = useAuthStore();
  const { me } = useUser();
  const pathname = usePathname();
  const { mutate: logout } = useLogout();

  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href],
    );
  };

  const isActive = (href: string, isChild?: boolean) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    if (isChild) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // ✅ FILTER NAVIGATION BASED ON ADMIN
  const filteredNavigation = navigation
    .map((item) => {
      // Hide parent if restricted
      if (item.hideIfNotAdmin && !isAdmin) return null;

      // Filter children if exist
      const filteredChildren = item.children?.filter(
        (child) => !(child.hideIfNotAdmin && !isAdmin),
      );

      // If parent had children but now none remain → hide parent
      if (
        item.children &&
        (!filteredChildren || filteredChildren.length === 0)
      ) {
        return null;
      }

      return {
        ...item,
        children: filteredChildren,
      };
    })
    .filter(Boolean);

  return (
    <div className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold-500 to-gold-600">
            <span className="text-sm font-bold text-white">G</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900">GIFT</h1>
            <p className="text-xs text-slate-500">Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar p-4">
        <div className="space-y-1">
          {filteredNavigation.map((item: any) => (
            <div key={item.href}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleExpanded(item.href)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-gold-50 text-gold-700"
                        : "text-slate-700 hover:bg-slate-100",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="flex-1 text-left">{item.title}</span>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        expandedItems.includes(item.href) && "rotate-90",
                      )}
                    />
                  </button>

                  {expandedItems.includes(item.href) && (
                    <div className="ml-4 mt-1 space-y-1 border-l border-slate-200 pl-3">
                      {item.children.map((child: any) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            isActive(child.href, true)
                              ? "bg-gold-50 text-gold-700"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                          )}
                        >
                          <child.icon className="h-4 w-4" />
                          <span>{child.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-gold-50 text-gold-700"
                      : "text-slate-700 hover:bg-slate-100",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* User Profile */}
      <div className="border-t border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-gold-600 text-sm font-semibold text-white shadow-sm">
              GA
            </div>

            <div className="leading-tight">
              {me?.user_id && (
                <AddressDisplay
                  address={me.user_id}
                  truncate
                  startChars={3}
                  endChars={3}
                />
              )}
              <p className="text-xs text-slate-500">
                {isAdmin ? "Admin" : "Auditor"}
              </p>
            </div>
          </div>

          <button
            onClick={() => logout()}
            className="flex h-9 w-9 items-center justify-center rounded-md text-gold-700 transition hover:bg-gold-300/20 hover:text-gold-800"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
