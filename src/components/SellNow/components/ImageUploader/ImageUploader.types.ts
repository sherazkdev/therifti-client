import type { Dispatch, SetStateAction } from "react";

export interface ImageUploaderPropsInterface {
    images:File[],
    showPhotoTips:boolean,
    setShowPhotoTips:Dispatch<SetStateAction<boolean>>,
    setImages:Dispatch<SetStateAction<File[]>>
}