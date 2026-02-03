// components/ui/tabs.tsx
"use client";

import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  children,
  className,
  value: controlledValue,
  onValueChange,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const activeTab = isControlled ? controlledValue : internalValue;

  const setActiveTab = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
};

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1",
        className
      )}
    >
      {children}
    </div>
  );
};

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  className,
}) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsTrigger must be used within a Tabs component");
  }

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      onClick={() => setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2",
        isActive
          ? "bg-white text-gray-900 shadow-sm"
          : "text-gray-600 hover:text-gray-900 hover:bg-white/50",
        className
      )}
      role="tab"
      aria-selected={isActive}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  className,
}) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsContent must be used within a Tabs component");
  }

  const { activeTab } = context;
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <div
      className={cn(
        "mt-2 animate-in fade-in duration-200",
        className
      )}
      role="tabpanel"
    >
      {children}
    </div>
  );
};

// Additional variants for different styles

interface TabsWithUnderlineProps extends Omit<TabsProps, "children"> {
  children: React.ReactNode;
  className?: string;
}

export const TabsWithUnderline: React.FC<TabsWithUnderlineProps> = ({
  defaultValue,
  children,
  className,
  value,
  onValueChange,
}) => {
  return (
    <Tabs
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className={cn("w-full", className)}
    >
      {children}
    </Tabs>
  );
};

export const TabsListUnderline: React.FC<TabsListProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "inline-flex h-12 items-center justify-center border-b border-gray-200 gap-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export const TabsTriggerUnderline: React.FC<TabsTriggerProps> = ({
  value,
  children,
  className,
}) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsTriggerUnderline must be used within a Tabs component");
  }

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      onClick={() => setActiveTab(value)}
      className={cn(
        "relative h-full px-1 pb-3 pt-2 text-sm font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2",
        isActive
          ? "text-gray-900"
          : "text-gray-600 hover:text-gray-900",
        className
      )}
      role="tab"
      aria-selected={isActive}
    >
      {children}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-t-full" />
      )}
    </button>
  );
};

// Pills variant
interface TabsWithPillsProps extends Omit<TabsProps, "children"> {
  children: React.ReactNode;
  className?: string;
}

export const TabsWithPills: React.FC<TabsWithPillsProps> = ({
  defaultValue,
  children,
  className,
  value,
  onValueChange,
}) => {
  return (
    <Tabs
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className={cn("w-full", className)}
    >
      {children}
    </Tabs>
  );
};

export const TabsListPills: React.FC<TabsListProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center gap-1",
        className
      )}
    >
      {children}
    </div>
  );
};

export const TabsTriggerPills: React.FC<TabsTriggerProps> = ({
  value,
  children,
  className,
}) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsTriggerPills must be used within a Tabs component");
  }

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      onClick={() => setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2",
        isActive
          ? "bg-gray-900 text-white"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
        className
      )}
      role="tab"
      aria-selected={isActive}
    >
      {children}
    </button>
  );
};

// Usage examples:

// Example 1 - Default Tabs:
/*
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="analytics">Analytics content</TabsContent>
  <TabsContent value="reports">Reports content</TabsContent>
</Tabs>
*/

// Example 2 - Underline Tabs:
/*
<TabsWithUnderline defaultValue="overview">
  <TabsListUnderline>
    <TabsTriggerUnderline value="overview">Overview</TabsTriggerUnderline>
    <TabsTriggerUnderline value="analytics">Analytics</TabsTriggerUnderline>
  </TabsListUnderline>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="analytics">Analytics content</TabsContent>
</TabsWithUnderline>
*/

// Example 3 - Pills Tabs:
/*
<TabsWithPills defaultValue="overview">
  <TabsListPills>
    <TabsTriggerPills value="overview">Overview</TabsTriggerPills>
    <TabsTriggerPills value="analytics">Analytics</TabsTriggerPills>
  </TabsListPills>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="analytics">Analytics content</TabsContent>
</TabsWithPills>
*/