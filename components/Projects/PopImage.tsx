"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

type PopImageProps = {
  open: boolean;
  onClose: () => void;
  urlImg: string;
  title: string;
};

const PopImage = ({ open, onClose, urlImg, title }: PopImageProps) => {
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
    <div
      className="fixed inset-0 z-[1100] bg-black/70"
      data-testid="image-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="fixed left-1/2 top-1/2 z-[1101] flex h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center overflow-auto"
        data-testid="image-modal-content"
        role="dialog"
        aria-modal="true"
        aria-label={`${title} image preview`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="absolute right-2 top-2 z-[1102] inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[var(--bg-surface)] text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7facfa]"
          onClick={onClose}
          aria-label={`Close ${title} image preview`}
        >
          <X size={24} aria-hidden="true" />
        </button>
        <Image
          src={urlImg}
          alt={`${title} project preview`}
          fill
          sizes="70vw"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default PopImage;
