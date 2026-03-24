import Link from "next/link";
import GeoCanvas from "@/components/geo-canvas";

export default function Home() {
  return (
    <>
      <GeoCanvas />

      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center gap-[1.4rem]">
        <div className="fade-up-1 flex items-baseline">
          <h1 className="font-sans text-[clamp(2.2rem,5.5vw,3.8rem)] font-semibold tracking-[0.02em]">
            Talal Akkaoui
            <span className="cursor-blink relative top-[0.05em] ml-[0.06em] inline-block h-[0.85em] w-[3px] bg-palette-2" />
          </h1>
        </div>

        <nav className="fade-up-2 pointer-events-auto flex items-center">
          <Link
            href="/bio"
            className="py-[0.3rem] font-mono text-[0.78rem] tracking-[0.04em] text-fg-dim transition-colors duration-250 hover:text-palette-3 max-[480px]:text-[0.7rem]"
          >
            Bio
          </Link>
          <span className="mx-[0.8rem] select-none font-mono text-[0.78rem] text-fg-muted max-[480px]:mx-[0.5rem]">
            /
          </span>
          <Link
            href="/resume"
            className="py-[0.3rem] font-mono text-[0.78rem] tracking-[0.04em] text-fg-dim transition-colors duration-250 hover:text-palette-3 max-[480px]:text-[0.7rem]"
          >
            Résumé
          </Link>
          <span className="mx-[0.8rem] select-none font-mono text-[0.78rem] text-fg-muted max-[480px]:mx-[0.5rem]">
            /
          </span>
          <Link
            href="/projects"
            className="py-[0.3rem] font-mono text-[0.78rem] tracking-[0.04em] text-fg-dim transition-colors duration-250 hover:text-palette-3 max-[480px]:text-[0.7rem]"
          >
            Projects
          </Link>
        </nav>

        <div className="fade-up-3 pointer-events-auto mt-[0.4rem] flex gap-4">
          <a
            href="https://github.com/talalakkaoui"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-fg-muted text-fg-dim transition-all duration-300 hover:border-palette-1/40 hover:bg-palette-1/[0.06] hover:text-palette-1"
          >
            <svg className="h-[15px] w-[15px] fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/talalakkaoui"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-fg-muted text-fg-dim transition-all duration-300 hover:border-palette-1/40 hover:bg-palette-1/[0.06] hover:text-palette-1"
          >
            <svg className="h-[15px] w-[15px] fill-current" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
