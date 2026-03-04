import { useState } from "react"
import styles from "./ProductGallery.module.css"

interface Props {
  images: string[]
}

export default function ProductGallery({ images }: Props) {

  const [active, setActive] = useState(images[0])

  return (
    <div className={styles.gallery}>

      <div className={styles.thumbs}>
        {images.map((img) => (
          <img
            key={img}
            src={img}
            className={`${styles.thumb} ${active === img ? styles.active : ""}`}
            onClick={() => setActive(img)}
          />
        ))}
      </div>

      <div className={styles.main}>
        <img src={active} alt="product" />
      </div>

    </div>
  )
}