import Link from "next/link";
import GeoCanvas from "@/components/geo-canvas";

export default function Projects() {
  return (
    <>
      <GeoCanvas />

      <div className="fixed inset-0 z-10 overflow-y-auto px-6 py-16 md:py-20">
        <div className="mx-auto w-full max-w-[960px]">
          <Link
            href="/"
            className="inline-block font-mono text-[0.72rem] tracking-[0.04em] text-fg-dim transition-colors duration-250 hover:text-palette-3"
          >
            &larr; back
          </Link>

          <h1 className="mt-5 font-sans text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold leading-tight tracking-[0.01em]">
            Projects
          </h1>

          <div className="mt-10 space-y-0">
            {/* Computational Geometry Explorer */}
            <div className="pb-9">
              <h2 className="font-sans text-[1.05rem] font-semibold">
                Computational Geometry Explorer
              </h2>
              <div className="mt-4 space-y-3">
                <p className="font-sans text-[0.88rem] leading-[1.7] text-fg-dim">
                  Building a C++ backend exposing computational geometry
                  algorithms via a REST API, deployed on Railway, with an
                  interactive TypeScript/React frontend on Vercel.
                </p>
                <p className="font-sans text-[0.88rem] leading-[1.7] text-fg-dim">
                  Implements core algorithms from scratch including convex hull
                  (Graham scan and Jarvis march) and line segment intersection.
                </p>
                <p className="font-mono text-[0.78rem] text-fg-dim">
                  Stack: C++, cpp-httplib, TypeScript, React
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="https://computational-geometry-weld.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-fg-muted px-3.5 py-1.5 font-mono text-[0.7rem] tracking-[0.04em] text-fg-dim transition-all duration-300 hover:border-palette-1/40 hover:bg-palette-1/[0.06] hover:text-palette-1"
                >
                  Try it
                </a>
                <a
                  href="https://github.com/talalakkaoui/computational-geometry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-fg-muted px-3.5 py-1.5 font-mono text-[0.7rem] tracking-[0.04em] text-fg-dim transition-all duration-300 hover:border-palette-1/40 hover:bg-palette-1/[0.06] hover:text-palette-1"
                >
                  GitHub
                </a>
              </div>
            </div>

            <hr className="border-fg-muted/20" />

            {/* MDO for AM Repair */}
            <div className="pt-9 pb-9">
              <h2 className="font-sans text-[1.05rem] font-semibold">
                Multidisciplinary Design Optimization for AM Repair
              </h2>
              <div className="mt-4 space-y-3">
                <p className="font-sans text-[0.88rem] leading-[1.7] text-fg-dim">
                  MSc thesis developing a computational geometry and FEA
                  convergence workflow for structural optimization, applied to a
                  car interior loudspeaker mesh cover and an indoor wall panel.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="https://www.nafems.org/publications/resource_center/dach24-pres-50/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-fg-muted px-3.5 py-1.5 font-mono text-[0.7rem] tracking-[0.04em] text-fg-dim transition-all duration-300 hover:border-palette-1/40 hover:bg-palette-1/[0.06] hover:text-palette-1"
                >
                  NAFEMS Publication
                </a>
                <a
                  href="https://www.noesissolutions.com/cases/multidisciplinary-design-optimization-for-additive-manufacturing-repair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-fg-muted px-3.5 py-1.5 font-mono text-[0.7rem] tracking-[0.04em] text-fg-dim transition-all duration-300 hover:border-palette-1/40 hover:bg-palette-1/[0.06] hover:text-palette-1"
                >
                  Case Study
                </a>
                <a
                  href="https://www.noesissolutions.com/webinars/multidisciplinary-design-optimization-for-additive-manufacturing-remake"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-fg-muted px-3.5 py-1.5 font-mono text-[0.7rem] tracking-[0.04em] text-fg-dim transition-all duration-300 hover:border-palette-1/40 hover:bg-palette-1/[0.06] hover:text-palette-1"
                >
                  Webinar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
