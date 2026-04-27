"use client";

import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export function DashboardReturnLink() {
  const { userType } = useAuth();

  if (!userType) return null;

  const dashboardHref =
    userType === "COLLEGE_OFFICIAL"
      ? "/dashboard/college"
      : userType === "ADMIN"
        ? "/dashboard/admin"
        : "/dashboard/organization";

  return (
    <Link
      href={dashboardHref}
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-lg border border-white/20 transition-all"
    >
      <LayoutDashboard className="w-4 h-4" />
      Back to Dashboard
    </Link>
  );
}
