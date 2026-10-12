"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
    Wallet as WalletIcon,
    TrendingUp,
    Download,
} from "lucide-react";
import type { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

interface Transaction {
    id: string;
    date: string;
    refId: string;
    description: string;
    amount: string;
    type: "income" | "expense";
    status?: "COMPLETED";
}

const transactions: Transaction[] = [
    {
        id: "1",
        date: "Aug 2, 2025",
        refId: "TXN-2025-001",
        description: "Laguna Seca Track Day — Ticket Sales",
        amount: "+$8,640",
        type: "income",
    },
    {
        id: "2",
        date: "Jul 29, 2025",
        refId: "TXN-2025-002",
        description: "Withdrawal to Bank of America ****4821",
        amount: "-$2,400",
        type: "expense",
    },
    {
        id: "3",
        date: "Jul 28, 2025",
        refId: "TXN-2025-003",
        description: "PCH Rally — Ticket Sales",
        amount: "+$7,050",
        type: "income",
    },
    {
        id: "4",
        date: "Jul 15, 2025",
        refId: "TXN-2025-004",
        description: "Beverly Hills Auto Show — Ticket Sales",
        amount: "+$17,415",
        type: "income",
    },
    {
        id: "5",
        date: "Jul 10, 2025",
        refId: "TXN-2025-005",
        description: "Platform Fee Deduction (2.9%)",
        amount: "-$505",
        type: "expense",
        status: "COMPLETED",
    },
];

export default function Wallet() {
    const [formData, setFormData] = useState({
        amount: "",
        accountHolder: "",
        accountNumber: "",
        bankName: "",
        notes: "",
    });

    const chartOptions: ApexOptions = {
        chart: {
            type: "area",
            height: 190,
            toolbar: { show: false },
            sparkline: { enabled: false },
            background: "transparent",
        },
        colors: ["#FF2E86"],
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.0,
                stops: [0, 90, 100],
                colorStops: [
                    { offset: 0, color: "#FF1770", opacity: 0.45 },
                    { offset: 100, color: "#FF1770", opacity: 0.0 },
                ],
            },
        },
        stroke: {
            curve: "smooth",
            width: 2.5,
            colors: ["#FF2E86"],
        },
        grid: {
            borderColor: "#1E1E1E",
            strokeDashArray: 3,
            xaxis: { lines: { show: false } },
            yaxis: { lines: { show: true } },
            padding: { top: 0, right: 10, bottom: 0, left: 10 },
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
            labels: {
                style: { colors: "#6B7280", fontSize: "11px", fontFamily: "inherit" },
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            min: 0,
            max: 10000,
            tickAmount: 4,
            labels: {
                style: { colors: "#6B7280", fontSize: "11px", fontFamily: "inherit" },
                formatter: (val) => `$${val / 1000}k`,
            },
        },
        tooltip: {
            theme: "dark",
            y: {
                formatter: (val) => `$${val.toLocaleString()}`,
            },
        },
        dataLabels: { enabled: false },
    };

    const chartSeries = [
        {
            name: "Revenue",
            data: [3200, 3900, 5200, 4700, 6800, 7100, 9200, 8700],
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    Wallet
                </h1>
                <p className="text-sm text-gray-400 mt-0.5">
                    Manage your earnings and withdrawals
                </p>
            </div>

            {/* Top 2 Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Available Balance Card */}
                <div className="rounded-2xl p-6 bg-[#160d11] border border-primary/30 shadow-lg shadow-primary/5 flex flex-col justify-between h-36">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-400">
                            Available Balance
                        </span>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] flex items-center justify-center text-white shrink-0 shadow-md shadow-pink-500/25">
                            <WalletIcon size={17} />
                        </div>
                    </div>
                    <div className="text-3xl font-extrabold text-white tracking-tight">
                        $3,420.00
                    </div>
                </div>

                {/* Lifetime Earnings Card */}
                <div className="rounded-2xl p-6 bg-[#121212] border border-[#1E1E1E] flex flex-col justify-between h-36">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-400">
                            Lifetime Earnings
                        </span>
                        <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 shrink-0">
                            <TrendingUp size={17} />
                        </div>
                    </div>
                    <div className="text-3xl font-extrabold text-white tracking-tight">
                        $24,680.00
                    </div>
                </div>
            </div>

            {/* Main Grid: Withdrawal Form (Left) & Chart + Transactions (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Withdrawal Request Form */}
                <div className="lg:col-span-4 rounded-2xl bg-[#121212] border border-[#1E1E1E] p-5 md:p-6 space-y-4 flex flex-col justify-between">
                    <h3 className="text-base font-bold text-white">Withdrawal Request</h3>

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                        <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                AMOUNT (USD)
                            </label>
                            <input
                                type="number"
                                placeholder="0.00"
                                value={formData.amount}
                                onChange={(e) =>
                                    setFormData({ ...formData, amount: e.target.value })
                                }
                                className="w-full bg-[#181818] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                ACCOUNT HOLDER
                            </label>
                            <input
                                type="text"
                                placeholder="Full legal name"
                                value={formData.accountHolder}
                                onChange={(e) =>
                                    setFormData({ ...formData, accountHolder: e.target.value })
                                }
                                className="w-full bg-[#181818] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                ACCOUNT NUMBER
                            </label>
                            <input
                                type="text"
                                placeholder="Enter account number"
                                value={formData.accountNumber}
                                onChange={(e) =>
                                    setFormData({ ...formData, accountNumber: e.target.value })
                                }
                                className="w-full bg-[#181818] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                BANK NAME
                            </label>
                            <input
                                type="text"
                                value={formData.bankName}
                                onChange={(e) =>
                                    setFormData({ ...formData, bankName: e.target.value })
                                }
                                className="w-full bg-[#181818] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                NOTES
                            </label>
                            <input
                                type="text"
                                placeholder="Optional reference..."
                                value={formData.notes}
                                onChange={(e) =>
                                    setFormData({ ...formData, notes: e.target.value })
                                }
                                className="w-full bg-[#181818] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-full text-xs font-bold text-white uppercase tracking-wider button-shadow transition-transform duration-200 cursor-pointer mt-2"
                        >
                            Submit Request
                        </button>
                    </form>

                    <p className="text-[10px] text-gray-500 text-center pt-2">
                        Processing: 2-3 business days · Minimum $100 · Withdraw fee: 5%
                    </p>
                </div>

                {/* Right: ApexChart Earnings Trend + Transaction History */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Earnings Trend ApexChart Card */}
                    <div className="rounded-2xl bg-[#121212] border border-[#1E1E1E] p-5 md:p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-bold text-white">Earnings Trend</h3>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Monthly revenue — 2025
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-base font-bold text-white">$54,700</span>
                                <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                                    ↗ 18%
                                </span>
                            </div>
                        </div>

                        {/* ApexChart Component */}
                        <div className="w-full min-h-[190px]">
                            <ReactApexChart
                                options={chartOptions}
                                series={chartSeries}
                                type="area"
                                height={190}
                                width="100%"
                            />
                        </div>
                    </div>

                    {/* Transaction History Card */}
                    <div className="rounded-2xl bg-[#121212] border border-[#1E1E1E] p-5 md:p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-white">
                                Transaction History
                            </h3>
                            <button
                                type="button"
                                className="text-xs font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                                <Download size={13} />
                                <span>Download Statement</span>
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="border-b border-[#1E1E1E] text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                        <th className="pb-3 pr-4 font-semibold">DATE</th>
                                        <th className="pb-3 px-4 font-semibold">REFERENCE ID</th>
                                        <th className="pb-3 px-4 font-semibold">DESCRIPTION</th>
                                        <th className="pb-3 pl-4 font-semibold text-right">AMOUNT</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1E1E1E]">
                                    {transactions.map((tx) => (
                                        <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="py-3.5 pr-4 text-gray-300 whitespace-nowrap">
                                                {tx.date}
                                            </td>
                                            <td className="py-3.5 px-4 text-gray-500 font-mono text-[11px] whitespace-nowrap">
                                                {tx.refId}
                                            </td>
                                            <td className="py-3.5 px-4 text-gray-300 truncate max-w-[220px]">
                                                {tx.description}
                                            </td>
                                            <td className="py-3.5 pl-4 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-2">
                                                    {tx.status && (
                                                        <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold px-2 py-0.5 rounded-full">
                                                            {tx.status}
                                                        </span>
                                                    )}
                                                    <span
                                                        className={`font-bold ${tx.type === "income"
                                                            ? "text-emerald-400"
                                                            : "text-red-400"
                                                            }`}
                                                    >
                                                        {tx.amount}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}