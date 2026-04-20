"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Project, ProjectStatus } from "@/lib/types";
import { StepIndicator, workflowSteps } from "@/components/ui/StepIndicator";
import { WorkflowContainer } from "@/components/workflow/WorkflowContainer";
import { ArrowLeft } from "lucide-react";
import api from "@/lib/api";

export default function ProjectDetail() {
  const { id } = useParams();
  const { userType } = useAuth();
  const router = useRouter();
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProject = () => {
    api.get(`/api/consultancy/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (loading) return <div className="p-12 text-center text-slate-500">Loading project...</div>;
  if (!project) return <div className="p-12 text-center text-slate-500">Project not found.</div>;

  const currentIndex = workflowSteps.findIndex(s => s.id === project.Current_Status);
  const currentStepInfo = workflowSteps[currentIndex];
  const nextStepInfo = workflowSteps[currentIndex + 1];
  const isClosed = project.Current_Status === 'CLOSED';

  const handleUpdateStatus = (newStatus: ProjectStatus) => {
    // Update local state optimistically, the API call is handled by WorkflowContainer
    setProject({ ...project, Current_Status: newStatus });
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{project.Project_Number}</h1>
            {isClosed ? (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-full text-xs font-semibold uppercase tracking-wider">
                Completed
              </span>
            ) : (
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                  Obtained: Step {currentStepInfo?.number || '?'}: {currentStepInfo?.label}
                </span>
                {nextStepInfo && (
                  <span className="px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-full text-xs font-semibold inline-flex items-center gap-1 animate-pulse">
                    Pending: Step {nextStepInfo?.number || '?'}: {nextStepInfo?.label}
                  </span>
                )}
              </div>
            )}
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">{project.Project_Title}</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 overflow-x-hidden mb-8">
        <StepIndicator currentStatus={project.Current_Status} />
      </div>

      {/* Dynamic Form Area */}
      <WorkflowContainer project={project} onUpdateStatus={handleUpdateStatus} />
    </>
  );
}
