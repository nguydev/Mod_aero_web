"use client";

import { Tabs, ConfigProvider } from "antd";

export interface TabItem {
  key: string;
  label: string;
  count?: number;
  dotColor?: string;
}

interface FilterTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (key: string) => void;
  className?: string;
}

export default function FilterTabs({
  tabs,
  activeTab,
  onChange,
  className = "",
}: FilterTabsProps) {
  const items = tabs.map((tab) => ({
    key: tab.key,
    label: (
      <div className="flex items-center gap-2">
        {tab.dotColor && (
          <span className={`w-2 h-2 rounded-full shrink-0 ${tab.dotColor}`} />
        )}
        <span>{tab.label}</span>
        {tab.count !== undefined && (
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-semibold transition-colors ${
              activeTab === tab.key
                ? "bg-indigo-100 text-indigo-900"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {tab.count}
          </span>
        )}
      </div>
    ),
  }));

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1E1B4B",
          colorText: "#64748B",
          fontFamily: "inherit",
          fontSize: 14,
        },
        components: {
          Tabs: {
            itemColor: "#64748B",
            itemSelectedColor: "#1E1B4B",
            itemHoverColor: "#1E293B",
            titleFontSize: 14,
            horizontalItemMargin: "0 24px 0 0",
            horizontalItemPadding: "8px 0",
            inkBarColor: "#1E1B4B",
          },
        },
      }}
    >
      <div className={`custom-antd-filter-tabs ${className}`}>
        <Tabs
          activeKey={activeTab}
          onChange={onChange}
          items={items}
          className="!m-0 [&_.ant-tabs-nav]:!mb-0 [&_.ant-tabs-tab-btn]:font-medium [&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:!font-bold [&_.ant-tabs-nav-wrap]:overflow-x-auto"
        />
      </div>
    </ConfigProvider>
  );
}
