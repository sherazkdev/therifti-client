import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import ImageUploadService from "../../../services/upload.services";

const uploadService = new ImageUploadService();

export type SellListingImageSlot = {
  id: string;
  fileKey: string;
  localPreviewUrl: string;
  rotation: number;
  state: "uploading" | "ready" | "error";
  secureUrl?: string;
  publicId?:string;
  deleteToken?: string;
  errorMessage?: string;
};

type UseSellListingImagesOptions = {
  maxImages: number;
  maxFileSizeBytes: number;
  onReadyUrlsChange?: (urls: string[]) => void;
  onUploadingChange?: (uploading: boolean) => void;
};

type UploadJob = { slot: SellListingImageSlot; file: File };

function fileKeyOf(f: File) {
  return `${f.name}-${f.size}-${f.lastModified}`;
}

function isUploadCanceled(err: unknown) {
  return axios.isCancel(err) || (err as { code?: string })?.code === "ERR_CANCELED";
}

function computeAdditions(
  prev: SellListingImageSlot[],
  fileList: FileList | File[],
  maxImages: number,
  maxFileSizeBytes: number
): { nextSlots: SellListingImageSlot[]; uploadJobs: UploadJob[]; errorMessage: string } {
  const fileArray = Array.from(fileList);
  const imageFiles = fileArray.filter((f) => f.type.startsWith("image/"));
  const nonImageCount = fileArray.length - imageFiles.length;
  const oversizedImages = imageFiles.filter((f) => f.size > maxFileSizeBytes);
  const validImages = imageFiles.filter((f) => f.size <= maxFileSizeBytes);

  const remainingSlots = maxImages - prev.length;
  if (remainingSlots <= 0) {
    return {
      nextSlots: prev,
      uploadJobs: [],
      errorMessage: `You can upload up to ${maxImages} images only.`,
    };
  }

  const existingKeys = new Set(prev.map((s) => s.fileKey));
  const uniqueImages = validImages.filter((f) => !existingKeys.has(fileKeyOf(f)));
  const imagesToAdd = uniqueImages.slice(0, remainingSlots);

  let errorMessage = "";
  if (nonImageCount > 0) {
    errorMessage = "Some files were ignored because they are not images.";
  } else if (oversizedImages.length > 0) {
    errorMessage = "One or more images are larger than 9MB and were rejected.";
  } else if (uniqueImages.length > remainingSlots) {
    errorMessage = `Only ${remainingSlots} more image(s) can be added (max ${maxImages}).`;
  } else if (imagesToAdd.length === 0 && validImages.length > 0) {
    errorMessage = "These images were already added (duplicates).";
  }

  if (!imagesToAdd.length) {
    return { nextSlots: prev, uploadJobs: [], errorMessage };
  }

  const uploadJobs: UploadJob[] = [];
  const newSlots: SellListingImageSlot[] = imagesToAdd.map((file, i) => {
    const slot: SellListingImageSlot = {
      id: `sell-${prev.length + i}-${fileKeyOf(file)}`,
      fileKey: fileKeyOf(file),
      localPreviewUrl: URL.createObjectURL(file),
      rotation: 0,
      state: "uploading",
    };
    uploadJobs.push({ slot, file });
    return slot;
  });

  return {
    nextSlots: [...prev, ...newSlots],
    uploadJobs,
    errorMessage,
  };
}

export function useSellListingImages({
  maxImages,
  maxFileSizeBytes,
  onReadyUrlsChange,
  onUploadingChange,
}: UseSellListingImagesOptions) {
  const [slots, setSlots] = useState<SellListingImageSlot[]>([]);
  const [imageError, setImageError] = useState("");
  const abortBySlotId = useRef(new Map<string, AbortController>());
  const slotsRef = useRef(slots);
  slotsRef.current = slots;

  const emitReadyUrls = useCallback(
    (next: SellListingImageSlot[]) => {
      const urls = next.filter((s) => s.state === "ready" && s.secureUrl).map((s) => s.secureUrl!);
      onReadyUrlsChange?.(urls);
    },
    [onReadyUrlsChange]
  );

  const anyUploading = slots.some((s) => s.state === "uploading");

  useEffect(() => {
    onUploadingChange?.(anyUploading);
  }, [anyUploading, onUploadingChange]);

  const startUpload = useCallback(
    (slotId: string, file: File) => {
      if (abortBySlotId.current.has(slotId)) return;
      const ac = new AbortController();
      abortBySlotId.current.set(slotId, ac);

      void uploadService
        .uploadImageDirect(file, { signal: ac.signal })
        .then((result) => {
          if (!result?.secureUrl) {
            setSlots((current) => {
              const idx = current.findIndex((s) => s.id === slotId);
              if (idx === -1) return current;
              const next = current.map((row, j) =>
                j === idx
                  ? {
                      ...row,
                      state: "error" as const,
                      errorMessage: "Upload failed. Remove and try again.",
                    }
                  : row
              );
              abortBySlotId.current.delete(slotId);
              emitReadyUrls(next);
              return next;
            });
            return;
          }

          setSlots((current) => {
            const idx = current.findIndex((s) => s.id === slotId);
            if (idx === -1) {
              void uploadService.tryDeleteByToken(result.deleteToken);
              return current;
            }

            const s = current[idx];
            if (s.localPreviewUrl.startsWith("blob:")) {
              URL.revokeObjectURL(s.localPreviewUrl);
            }

            const next = current.map((row, j) =>
              j === idx
                ? {
                    ...row,
                    state: "ready" as const,
                    secureUrl: result.secureUrl,
                    deleteToken: result.deleteToken,
                    localPreviewUrl: result.secureUrl,
                    publicId:result.publicId,
                    errorMessage: undefined,
                  }
                : row
            );
            abortBySlotId.current.delete(slotId);
            emitReadyUrls(next);
            return next;
          });
        })
        .catch((err: unknown) => {
          if (isUploadCanceled(err)) return;
          setSlots((current) => {
            const idx = current.findIndex((s) => s.id === slotId);
            if (idx === -1) return current;
            const next = current.map((row, j) =>
              j === idx
                ? {
                    ...row,
                    state: "error" as const,
                    errorMessage: "Upload failed. Remove and try again.",
                  }
                : row
            );
            abortBySlotId.current.delete(slotId);
            emitReadyUrls(next);
            return next;
          });
        });
    },
    [emitReadyUrls]
  );

  const removeAt = useCallback(
    (index: number) => {
      setSlots((prev) => {
        const slot = prev[index];
        if (!slot) return prev;

        const ac = abortBySlotId.current.get(slot.id);
        ac?.abort();
        abortBySlotId.current.delete(slot.id);

        if (slot.state === "ready") {
          void uploadService.tryDeleteByToken(slot.deleteToken);
        }

        if (slot.localPreviewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(slot.localPreviewUrl);
        }

        const next = prev.filter((_, i) => i !== index);
        emitReadyUrls(next);
        return next;
      });
    },
    [emitReadyUrls]
  );

  const setMain = useCallback(
    (index: number) => {
      if (index === 0) return;
      setSlots((prev) => {
        if (index < 0 || index >= prev.length) return prev;
        const copy = [...prev];
        const [picked] = copy.splice(index, 1);
        copy.unshift(picked);
        emitReadyUrls(copy);
        return copy;
      });
    },
    [emitReadyUrls]
  );

  const rotateAt = useCallback((index: number) => {
    setSlots((prev) =>
      prev.map((s, i) => (i === index ? { ...s, rotation: (s.rotation + 90) % 360 } : s))
    );
  }, []);

  const addFiles = useCallback(
    (fileList: FileList | File[]) => {
      setImageError("");
      setSlots((prev) => {
        const { nextSlots, uploadJobs, errorMessage } = computeAdditions(
          prev,
          fileList,
          maxImages,
          maxFileSizeBytes
        );

        if (errorMessage) {
          queueMicrotask(() => setImageError(errorMessage));
        }

        if (!uploadJobs.length) return prev;

        queueMicrotask(() => {
          uploadJobs.forEach(({ slot, file }) => startUpload(slot.id, file));
        });

        emitReadyUrls(nextSlots);
        return nextSlots;
      });
    },
    [emitReadyUrls, maxFileSizeBytes, maxImages, startUpload]
  );

  useEffect(() => {
    return () => {
      for (const s of slotsRef.current) {
        if (s.localPreviewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(s.localPreviewUrl);
        }
        abortBySlotId.current.get(s.id)?.abort();
      }
    };
  }, []);

  return { slots, imageError, setImageError, addFiles, removeAt, setMain, rotateAt, anyUploading };
}
