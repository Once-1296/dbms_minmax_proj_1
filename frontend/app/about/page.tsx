import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { DashboardReturnLink } from "@/components/ui/DashboardReturnLink";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/about_bg.jpg')" }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65 z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-16">
          <Link href="/" className="flex items-center gap-3 text-white hover:text-gold-400 transition-colors">
            <Image src="/vjti.png" alt="VJTI Logo" width={36} height={36} className="rounded-full border border-white/20" />
            <span className="font-bold text-lg">VJTI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-slate-300 hover:text-white transition-colors font-medium">Home</Link>
            <DashboardReturnLink />
            <Link href="/login" className="text-sm px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors">Login</Link>
          </div>
        </nav>

        {/* Main Content Card */}
        <div className="glass-panel rounded-2xl p-10 md:p-14 shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            About VJTI
          </h1>

          <div className="space-y-5 text-slate-200 leading-relaxed text-base md:text-lg">
            <p>
              <strong className="text-white">Veermata Jijabai Technological Institute (VJTI)</strong> is an
              autonomous engineering institute affiliated with the University of Mumbai. Founded in 1887 as the
              Victoria Jubilee Technical Institute, it is one of the oldest and most distinguished technical
              institutes in Asia.
            </p>
            <p>
              Located on Matunga&apos;s bustling H.R. Mahajani Road, VJTI offers undergraduate, postgraduate,
              and doctoral programmes across multiple engineering and technology disciplines. The institute is
              recognized by AICTE, accredited by NAAC with an &apos;A&apos; grade, and its departments have received
              NBA accreditation — a testament to its academic rigour.
            </p>
            <p>
              VJTI&apos;s <strong className="text-white">Academic Consultancy &amp; Third-Party Quality Audit (TPQA)</strong> cell
              facilitates professional consultancy services where faculty expertise is made available to external
              organizations for quality audits, testing, structural assessments, and technical evaluations. This
              platform digitizes the full 9-step consultancy workflow — from initial client request through
              director approval, invoicing, and final revenue distribution.
            </p>
            <p>
              Under the leadership of its Director and dedicated departmental HODs and coordinators, VJTI
              continues to build bridges between academia and industry, fostering a culture of innovation,
              research, and socially relevant engineering practice that benefits the nation.
            </p>
          </div>

          {/* Links */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="https://vjti.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Visit VJTI Official Site
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all"
            >
              Go to Portal Login
            </Link>
          </div>
        </div>

        <p className="text-center mt-12 text-sm text-slate-400">
          &copy; {new Date().getFullYear()} VJTI — Academic Consultancy &amp; TPQA Management System
        </p>
      </div>
    </div>
  );
}
