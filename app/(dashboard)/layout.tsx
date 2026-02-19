"use client";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { useAuthStore } from "@/store/authStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { me, fetchMe } = useUser();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && !me) {
      fetchMe();
    }
  }, [isAuthenticated, me]);

  return (
    <div className="flex h-screen bg-background-secondary">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
}
