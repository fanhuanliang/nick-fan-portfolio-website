"use client";

import Image from "next/image";

type PopImageProps = {
  open: boolean;
  onClose: () => void;
  urlImg: string;
};

const PopImage = ({ open, onClose, urlImg }: PopImageProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1100] cursor-pointer"
      data-testid="image-modal-backdrop"
      onClick={onClose}
    >
      <div
        className="fixed left-1/2 top-1/2 z-[1101] flex h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center overflow-auto"
        data-testid="image-modal-content"
      >
        <Image
          src={urlImg}
          alt="Project preview"
          fill
          sizes="70vw"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default PopImage;
