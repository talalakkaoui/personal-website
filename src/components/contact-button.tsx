"use client";

import { useState, useRef, useEffect } from "react";
import { Mail } from "lucide-react";

const EMAIL = "talalakkaoui@gmail.com";

export default function ContactButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
          setCopied(false);
        }}
        className="shrink-0 flex items-center gap-1.5 rounded border border-fg-muted px-2 py-1.5 min-[463px]:px-4 font-mono text-[0.72rem] tracking-[0.04em] text-fg-dim transition-all duration-300 hover:border-accent/40 hover:bg-accent/[0.06] hover:text-accent"
      >
        <Mail size={14} />
        <span className="hidden min-[463px]:inline">Get in Touch</span>
      </button>

      {open && (
        <div
          ref={overlayRef}
          onClick={(e) => e.target === overlayRef.current && setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 px-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-[380px] rounded-xl border border-fg-muted/30 bg-bg p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-sans text-[1.05rem] font-semibold">
                Get in Touch
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-xl leading-none text-fg-dim transition-colors hover:text-fg"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <p className="mb-4 font-sans text-[0.84rem] leading-[1.6] text-fg-dim">
              Feel free to reach out via email:
            </p>

            <div className="flex items-center gap-2 rounded-lg border border-fg-muted/30 px-3 py-2.5">
              <a
                href={`mailto:${EMAIL}`}
                className="min-w-0 flex-1 truncate font-mono text-[0.82rem] text-fg transition-colors hover:text-palette-1"
              >
                {EMAIL}
              </a>
              <button
                onClick={copyEmail}
                className="shrink-0 rounded border border-fg-muted px-2 py-1 font-mono text-[0.65rem] tracking-[0.04em] text-fg-dim transition-all duration-200 hover:border-palette-1/40 hover:text-palette-1"
                aria-label="Copy email"
              >
                {copied ? "copied!" : "copy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
