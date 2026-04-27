"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import api from "@/lib/api";

interface ReceiptData {
  Receipt_ID: number;
  Voucher_Number: string;
  Receipt_Date: string;
  Total_Received: number;
  TDS_Deducted: number;
  Trans_Mode: string;
  Bank_Trans_Ref: string;
  Invoice_ID: number;
}

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState<ReceiptData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/api/consultancy/receipts")
      .then((res) => setReceipts(res.data))
      .catch(() => setReceipts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = receipts.filter(
    (r) =>
      r.Voucher_Number.toLowerCase().includes(search.toLowerCase()) ||
      r.Bank_Trans_Ref.toLowerCase().includes(search.toLowerCase()) ||
      r.Trans_Mode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Receipts &amp; Distribution</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {filtered.length} receipt{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vouchers, refs..."
            className="pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 w-full sm:w-72 text-slate-900 dark:text-white placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-slate-500">Loading receipts...</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Voucher Number</th>
                  <th className="px-6 py-4 font-medium">Receipt Date</th>
                  <th className="px-6 py-4 font-medium">Total Received</th>
                  <th className="px-6 py-4 font-medium">TDS Deducted</th>
                  <th className="px-6 py-4 font-medium">Mode</th>
                  <th className="px-6 py-4 font-medium">Bank Ref</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((r) => (
                  <tr key={r.Receipt_ID} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{r.Voucher_Number}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{r.Receipt_Date}</td>
                    <td className="px-6 py-4 font-medium text-emerald-600 dark:text-emerald-400">
                      ₹ {Number(r.Total_Received || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      ₹ {Number(r.TDS_Deducted || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full border bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700">
                        {r.Trans_Mode}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono text-xs">{r.Bank_Trans_Ref}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                      No receipts found. Receipts are generated after tax invoices are processed.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
