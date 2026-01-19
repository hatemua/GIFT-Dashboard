interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex-1 overflow-auto custom-scrollbar">
      <div className="container mx-auto p-6">{children}</div>
    </div>
  );
}
