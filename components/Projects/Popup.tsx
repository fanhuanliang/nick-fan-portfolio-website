"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";

type PopupProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  youTubeURL: string;
};

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const id =
      parsed.hostname === "youtu.be"
        ? parsed.pathname.slice(1)
        : parsed.searchParams.get("v");

    return id ? `https://www.youtube.com/embed/${id}` : url;
  } catch {
    return url;
  }
}

const Popup = ({ open, onClose, title, youTubeURL }: PopupProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1100] bg-black/70" data-testid="video-modal-backdrop">
      <div
        className="fixed left-1/2 top-1/2 z-[1101] flex h-[80vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center overflow-auto rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] p-8 leading-[30px] shadow-[10px_10px_var(--shadow-hard)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-video-title"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="absolute right-[10px] top-[10px] inline-flex cursor-pointer text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7facfa]"
          onClick={onClose}
          aria-label={`Close ${title} video`}
        >
          <X size={32} aria-hidden="true" />
        </button>
        <h2 id="project-video-title" className="mb-[10px] mt-5 text-center text-[1.5rem] leading-[1.1]">
          {title}
        </h2>
        <div className="h-full w-full">
          <iframe
            className="h-full w-full"
            src={getYouTubeEmbedUrl(youTubeURL)}
            title={`${title} video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
