"use client";

import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { ProjectStatus } from "@/lib/types";

interface ProjectData {
  Project_ID: number;
  Project_Number: string;
  Project_Title: string;
  Current_Status: ProjectStatus;
  Cost_Of_Work: number;
  Client_ID: number;
  Department_ID: number;
  Coordinator_ID: number;
  Start_Date: string | null;
}

export default function ProjectsPage() {
  const { userType } = useAuth();
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/api/consultancy/projects")
      .then((res) => setProjects(res.data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = projects.filter(
    (p) =>
      p.Project_Title.toLowerCase().includes(search.toLowerCase()) ||
      p.Project_Number.toLowerCase().includes(search.toLowerCase()) ||
      p.Current_Status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {userType === 'COLLEGE_OFFICIAL' ? 'All Projects' : 'My Projects'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 w-full sm:w-72 text-slate-900 dark:text-white placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-slate-500">Loading projects...</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Project Number</th>
                  <th className="px-6 py-4 font-medium">Title</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Estimated Cost</th>
                  <th className="px-6 py-4 font-medium">Start Date</th>
                  <th className="px-6 py-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((p) => (
                  <tr key={p.Project_ID} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{p.Project_Number}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300 max-w-xs truncate" title={p.Project_Title}>
                      {p.Project_Title}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={p.Current_Status} />
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      ₹ {Number(p.Cost_Of_Work || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {p.Start_Date || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <Link 
                        href={`/dashboard/projects/${p.Project_ID}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">No projects found.</td>
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

function StatusBadge({ status }: { status: ProjectStatus }) {
  const getBadgeStyle = (s: ProjectStatus) => {
    if (s.includes('REQUEST')) return 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border-amber-200 dark:border-amber-500/30';
    if (s.includes('CLOSED') || s.includes('COMPLETION')) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30';
    return 'bg-brand-100 text-brand-800 dark:bg-brand-500/20 dark:text-brand-300 border-brand-200 dark:border-brand-500/30';
  };

  const formattedName = status.replace(/_/g, ' ').toLowerCase()
    .replace(/\b\w/g, l => l.toUpperCase());

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getBadgeStyle(status)}`}>
      {formattedName}
    </span>
  );
}
