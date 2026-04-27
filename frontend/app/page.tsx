import Link from "next/link";
import Image from "next/image";
import { DashboardReturnLink } from "@/components/ui/DashboardReturnLink";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/home_vid.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-6 py-20">
        <Image
          src="/vjti.png"
          alt="VJTI Logo"
          width={100}
          height={100}
          className="mx-auto mb-8 rounded-full shadow-2xl border-2 border-white/20"
        />
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
          Veermata Jijabai<br />Technological Institute
        </h1>
        <p className="text-lg md:text-xl text-slate-200 leading-relaxed mb-10 max-w-2xl mx-auto">
          Established in 1887, VJTI is one of India&apos;s premier engineering institutions,
          situated in the heart of Mumbai. The institute is renowned for its academic
          excellence, cutting-edge research, and a legacy of producing distinguished engineers
          and leaders who drive innovation across industries worldwide.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            href="/login"
            className="px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="px-8 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 transition-all text-lg"
          >
            Learn More
          </Link>
          <DashboardReturnLink />
        </div>

        <p className="mt-12 text-sm text-slate-400">
          Academic Consultancy &amp; Third-Party Quality Audit Management System
        </p>
      </div>
    </div>
  );
}
