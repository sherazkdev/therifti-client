import { X } from "lucide-react";
import styles from "./SellItem.module.css";

type Props = {
  onClose: () => void;
};

const PhotoTipsModal = ({ onClose }: Props) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h3>Photo Tips</h3>
          <X
            size={20}
            className={styles.closeIcon}
            onClick={onClose}
          />
        </div>

        <ul className={styles.tipList}>
          <li>The First image is used as a Banner</li>
          <li>Use natural lighting whenever possible.</li>
          <li>Avoid blurry or low-resolution images.</li>
          <li>Show the item from multiple angles.</li>
          <li>Use a clean and simple background.</li>
          <li>Highlight important details and flaws honestly.</li>
        </ul>
      </div>
    </div>
  );
};

export default PhotoTipsModal;