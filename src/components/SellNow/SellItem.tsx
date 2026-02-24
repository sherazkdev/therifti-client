import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { UploadCloud, Plus, X, ChevronDown, RotateCw , Camera } from "lucide-react";
import styles from "./SellItem.module.css";
import CategoryDropdown from "./CategoryDropdown";
import PhotoTipsModal from "./PhotoTipsModal";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

/* ---------------- TYPES ---------------- */

type SelectedCategory = {
  path: string[];
};

type FormValues = {
  title: string;
  price: number;
  description: string;
  parcelSize: string;
};

type ListingStatus = "PUBLISHED" | "DRAFT"; // backend ne DRAPT bola hai (same use kar raha hun)
/* ---------------- MULTI SELECT ---------------- */

type MultiProps = {
  label: string;
  options: string[];
  selected: string[];
  setSelected: (val: string[]) => void;
  error?: string;
  singleSelect?: boolean;
  maxSelect?: number;
};

const MultiSelectDropdown = ({
  label,
  options,
  selected,
  setSelected,
  error,
  singleSelect,
  maxSelect,
}: MultiProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const toggle = (opt: string) => {
    if (singleSelect) {
      setSelected([opt]);
      setOpen(false);
      return;
    }

    if (selected.includes(opt)) {
      setSelected(selected.filter((v) => v !== opt));
    } else if (!maxSelect || selected.length < maxSelect) {
      setSelected([...selected, opt]);
    }
  };

  const visible =
    label === "Brand"
      ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
      : options;

  return (
    <div className={styles.formGroup} ref={ref}>
      <label>{label}</label>

      <div className={styles.dropdownDisplay} onClick={() => setOpen(!open)}>
        <span>
          {selected.length
            ? selected.join(", ")
            : label === "Material"
              ? "Select upto 3 Material"
              : label === "Color"
                ? "Select up to 2 colors"
                : `Select ${label.toLowerCase()}`}
        </span>
        <ChevronDown size={16} />
      </div>

      {error && <span className={styles.error}>{error}</span>}

      {open && (
        <div className={styles.dropdownMenu}>
          {label === "Brand" && (
            <div className={styles.dropdownSearch}>
              <input
                className={styles.brandSearchInput}
                placeholder="Search brand..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}

          {visible.map((opt) => (
            <div
              key={opt}
              className={styles.dropdownOption}
              onClick={() => toggle(opt)}
            >
              {opt}
              <span
                className={`${styles.checkbox} ${
                  selected.includes(opt) ? styles.checked : ""
                }`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ---------------- MAIN ---------------- */

const SellItem = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  // PRICE DISPLAY (for $0.00 -> $5.00)
  const [priceDisplay, setPriceDisplay] = useState("");



  // register hidden "price" field (we will update it via setValue)
  useEffect(() => {
    register("price", {
      required: "Price is required",
      validate: (v) => (typeof v === "number" && !Number.isNaN(v)) || "Price is required",
    });
  }, [register]);

  // Manually register CKEditor description field for react-hook-form validation
  useEffect(() => {
    register("description", {
      required: "Description is required",
      validate: (v) =>
        (typeof v === "string" && v.replace(/<[^>]*>/g, "").trim().length > 0) ||
        "Description is required",
    });
  }, [register]);
    
// keep digits + 1 dot + max 2 decimals
const sanitizeDecimal = (input: string) => {
  let s = input.replace(/[^0-9.]/g, "");
  const dot = s.indexOf(".");

  if (dot !== -1) {
    const intPart = s.slice(0, dot);
    let decPart = s.slice(dot + 1).replace(/\./g, "");
    decPart = decPart.slice(0, 2); // max 2 decimals
    s = intPart + "." + decPart;
  }
  return s;
};

  const handlePriceChange = (raw: string) => {
    // remove $ if user edits it
    raw = raw.replace(/^\$/, "");

    const cleaned = sanitizeDecimal(raw);

    // allow empty (so user can delete)
    if (cleaned === "") {
      setPriceDisplay("");
      setValue("price", undefined as unknown as number, { shouldValidate: true });
      return;
    }

    // allow "." and "5." while typing (don’t force toFixed yet)
    setPriceDisplay(`$${cleaned}`);

    // only set numeric value if it’s a valid number (not just "." or ends with ".")
    if (cleaned === "." || cleaned.endsWith(".")) {
      setValue("price", undefined as unknown as number, { shouldValidate: true });
      return;
    }

    const n = Number(cleaned);
    if (Number.isNaN(n)) {
      setValue("price", undefined as unknown as number, { shouldValidate: true });
      return;
    }

    setValue("price", n, { shouldValidate: true });
  };

  const handlePriceBlur = () => {
    const raw = priceDisplay.replace(/^\$/, "");
    if (!raw || raw === "." || raw.endsWith(".")) return;

    const n = Number(raw);
    if (Number.isNaN(n)) return;

    // format only on blur
    setPriceDisplay(`$${n.toFixed(2)}`);
    setValue("price", n, { shouldValidate: true });
  };

  const fileRef = useRef<HTMLInputElement | null>(null);

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);

  // NEW
  const [imageError, setImageError] = useState("");

  // ROTATION (NEW)
  const [rotations, setRotations] = useState<number[]>([]);

  const [category, setCategory] = useState<SelectedCategory | null>(null);

  const [brand, setBrand] = useState<string[]>([]);
  const [condition, setCondition] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);

  /* ---------- ERRORS ---------- */

  const [categoryError, setCategoryError] = useState("");
  const [brandError, setBrandError] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [materialError, setMaterialError] = useState("");
  const [showPhotoTips, setShowPhotoTips] = useState(false);

  /* ---------- IMAGE ---------- */

  const MAX_IMAGES = 4;
  const MAX_FILE_SIZE = 9 * 1024 * 1024; // 9MB

  const isFileDrag = (e: React.DragEvent) => {
    return Array.from(e.dataTransfer.types || []).includes("Files");
  };

  const fileKey = (f: File) => `${f.name}-${f.size}-${f.lastModified}`;

  const handleFiles = (files: FileList) => {
    setImageError("");

    const all = Array.from(files);
    const onlyImages = all.filter((file) => file.type.startsWith("image/"));
    const nonImagesCount = all.length - onlyImages.length;

    const tooLarge = onlyImages.filter((f) => f.size > MAX_FILE_SIZE);
    const valid = onlyImages.filter((f) => f.size <= MAX_FILE_SIZE);

    const existingKeys = new Set(images.map(fileKey));
    const uniqueValid = valid.filter((f) => !existingKeys.has(fileKey(f)));

    const remaining = MAX_IMAGES - images.length;

    if (remaining <= 0) {
      setImageError(`You can upload up to ${MAX_IMAGES} images only.`);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    const selected = uniqueValid.slice(0, remaining);

    if (nonImagesCount > 0) {
      setImageError("Some files were ignored because they are not images.");
    } else if (tooLarge.length > 0) {
      setImageError("One or more images are larger than 9MB and were rejected.");
    } else if (uniqueValid.length > remaining) {
      setImageError(
        `Only ${remaining} more image(s) can be added (max ${MAX_IMAGES}).`
      );
    } else if (selected.length === 0 && valid.length > 0) {
      setImageError("These images were already added (duplicates).");
    }

    if (selected.length) {
      setImages((prev) => [...prev, ...selected]);
      setPreviews((prev) => [
        ...prev,
        ...selected.map((f) => URL.createObjectURL(f)),
      ]);
      setRotations((prev) => [...prev, ...selected.map(() => 0)]);
    }

    if (fileRef.current) fileRef.current.value = "";
  };

  const removeImage = (i: number) => {
    URL.revokeObjectURL(previews[i]);
    setImages(images.filter((_, idx) => idx !== i));
    setPreviews(previews.filter((_, idx) => idx !== i));
    setRotations(rotations.filter((_, idx) => idx !== i));
  };

  // funtion setas main image bana dy ga
  const setAsMain = (index: number) => {
    if (index === 0) return;

    const imgCopy = [...images];
    const prevCopy = [...previews];
    const rotCopy = [...rotations];

    const [img] = imgCopy.splice(index, 1);
    const [prev] = prevCopy.splice(index, 1);
    const [rot] = rotCopy.splice(index, 1);

    imgCopy.unshift(img);
    prevCopy.unshift(prev);
    rotCopy.unshift(rot);

    setImages(imgCopy);
    setPreviews(prevCopy);
    setRotations(rotCopy);
  };

  // ROTATE (NEW)
  const rotateImage = (index: number) => {
    setRotations((prev) =>
      prev.map((deg, i) => (i === index ? (deg + 90) % 360 : deg))
    );
  };

  useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p));
  }, [previews]);

  /* ---------- SUBMIT ---------- */

  const onSubmit = (data: FormValues, status: ListingStatus) => {

  //category main last item select 
   const lastCategory = category?.path?.[category.path.length - 1] || "";

    let hasError = false;

    if (!images.length) {
      setImageError("At least 1 image is required (max 4).");
      hasError = true;
    }

    if (!category) {
      setCategoryError("Category is required");
      hasError = true;
    }
    if (!brand.length) {
      setBrandError("Brand is required");
      hasError = true;
    }
    if (!sizes.length) {
      setSizeError("Size is required");
      hasError = true;
    }
    if (!materials.length) {
      setMaterialError("Material is required");
      hasError = true;
    }

    if (hasError) return;

    console.log({
      status, 
      title: data.title,
      price: data.price,
      description: data.description,
      parcelSize: data.parcelSize,
      images,
      rotations,
      category: lastCategory,
      brand,
      condition,
      colors,
      materials,
      sizes,
    });
  };


  const submitWithStatus = (status: ListingStatus) =>
  handleSubmit((data) => onSubmit(data, status))();

  /* ---------- OPTIONS ---------- */

  const brands = ["Nike", "Zara", "H&M", "Adidas"];
  const conditions = ["New with tags", "Very good", "Good"];
  const colorsList = ["Black", "White", "Red", "Blue"];
  const materialsList = [
    "Cotton",
    "Denim",
    "faizan",
    "hassan",
    "abikesh",
    "kaleshi",
  ];
  const sizesList = ["S", "M", "L", "XL"];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sell an Item</h2>

      {/* UPLOAD */}
      <div
        className={styles.uploadWrapper}
        onDragOver={(e) => {
          if (!isFileDrag(e)) return;
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          if (!isFileDrag(e)) return;
          setDragging(false);
        }}
        onDrop={(e) => {
          if (!isFileDrag(e)) return;
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        {!images.length ? (
          <div
            className={`${styles.uploadBox} ${dragging ? styles.dragging : ""}`}
            onClick={() => fileRef.current?.click()}
          >
            <UploadCloud />
            <p>Drag & drop or browse</p>
            <p style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>
              Max {MAX_IMAGES} images • Max 9MB each
            </p>

            {imageError && <span className={styles.error}>{imageError}</span>}

            <input
              ref={fileRef}
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
          </div>
        ) : (
          <>
          
            <div className={styles.imageList}>
              {previews.map((src, i) => (
                <div key={src} className={styles.imageItem}>
                  <img
                    src={src}
                    draggable={false}
                    style={{
                      transform: `rotate(${rotations[i] || 0}deg)`,
                      transition: "transform 180ms ease",
                    }}
                  />

                  {i !== 0 && (
                    <button
                      type="button"
                      className={styles.setMainBtn}
                      onClick={() => setAsMain(i)}
                    >
                      Set Main
                    </button>
                  )}

                  <button
                    type="button"
                    title="Rotate"
                    className={styles.rotateBtn}
                    onClick={() => rotateImage(i)}
                  >
                    <RotateCw size={18} />
                  </button>

                  {i === 0 && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 6,
                        left: 6,
                        background: "#000",
                        color: "#fff",
                        fontSize: 12,
                        padding: "2px 6px",
                        borderRadius: 4,
                      }}
                    >
                      Main
                    </span>
                  )}

                  <X
                    className={styles.removeIcon}
                    onClick={() => removeImage(i)}
                  />
                </div>
              ))}

              {images.length < MAX_IMAGES && (
                <div
                  className={styles.addImage}
                  onClick={() => fileRef.current?.click()}
                >
                  <Plus />
                  <input
                    ref={fileRef}
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  />
                </div>
              )}
            </div>
            
          </>
        )}
      </div>
       
      {imageError && <div className={styles.imageErrorOutside}>{imageError}</div>}

      {/* PHOTO QUALITY TIP */}
      <div className={styles.photoTip}>
        <Camera size={18} />
        <p>
          Catch Your Buyers’ Eye — Use Quality Photos.{" "}
          <span
            className={styles.learnMore}
            onClick={() => setShowPhotoTips(true)}
          >
            Learn More
          </span>
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        {/* TITLE + MATERIAL */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Title</label>
            <input
              placeholder="Enter item title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <span className={styles.error}>{errors.title.message}</span>
            )}
          </div>

          <MultiSelectDropdown
            label="Material"
            options={materialsList}
            selected={materials}
            setSelected={(v) => {
              setMaterials(v);
              setMaterialError("");
            }}
            error={materialError}
            maxSelect={3}
          />
        </div>

        {/* CATEGORY + PRICE */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <CategoryDropdown
              onSelectCategory={(c) => {
                setCategory(c);
                setCategoryError("");
              }}
            />
            {categoryError && (
              <span className={styles.error}>{categoryError}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Price</label>

            {/* visible input (formatted) */}
            <input
              type="text"
              inputMode="decimal"
              placeholder="$0.00"
              value={priceDisplay}
              onChange={(e) => handlePriceChange(e.target.value)}
              onBlur={handlePriceBlur}
            />

            {/* hidden registered field to keep RHF validation/messages */}
            <input type="hidden" {...register("price")} />

            {errors.price && (
              <span className={styles.error}>
                {errors.price.message as string}
              </span>
            )}
          </div>
        </div>

        {/* AFTER CATEGORY */}
        {category && (
          <>
            <div className={styles.row}>
              <MultiSelectDropdown
                label="Brand"
                options={brands}
                selected={brand}
                setSelected={(v) => {
                  setBrand(v);
                  setBrandError("");
                }}
                error={brandError}
                singleSelect
              />

              <MultiSelectDropdown
                label="Condition"
                options={conditions}
                selected={condition}
                setSelected={setCondition}
                singleSelect
              />
            </div>

            <div className={styles.row}>
              <MultiSelectDropdown
                label="Color"
                options={colorsList}
                selected={colors}
                setSelected={setColors}
                maxSelect={2}
              />

              <MultiSelectDropdown
                label="Size"
                options={sizesList}
                selected={sizes}
                setSelected={(v) => {
                  setSizes(v);
                  setSizeError("");
                }}
                error={sizeError}
                singleSelect
              />
            </div>
          </>
        )}

        {/* DESCRIPTION */}

        <div className={styles.formGroup}>
          <label>Description</label>

          <CKEditor 
          editor={ClassicEditor as any}
            data=""
            config={{
              toolbar: [ "undo", "redo","|","bold", "italic","|","bulletedList", "numberedList","|","removeFormat"]
             }}
            onChange={(_, editor) => {
              const data = editor.getData();
              setValue("description", data, { shouldValidate: true });
            }}
          />

          {errors.description && (
            <span className={styles.error}>{errors.description.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Select your Parcel Size</label>

          <div className={styles.parcelList}>
            <label className={styles.parcelRow}>
              <span>5kg</span>
              <input
                type="radio"
                value="5kg"
                {...register("parcelSize", { required: "Parcel size is required" })}
              />
            </label>

            <label className={styles.parcelRow}>
              <span>10kg</span>
              <input
                type="radio"
                value="10kg"
                {...register("parcelSize", { required: "Parcel size is required" })}
              />
            </label>

            <label className={styles.parcelRow}>
              <span>15kg</span>
              <input
                type="radio"
                value="15kg"
                {...register("parcelSize", { required: "Parcel size is required" })}
              />
            </label>
          </div>

          {errors.parcelSize && (
            <span className={styles.error}>{errors.parcelSize.message}</span>
          )}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.draftBtn}
            onClick={() => submitWithStatus("DRAFT")}
          >
            Save Draft
          </button>

          <button
            type="button"
            className={styles.submitBtn}
            onClick={() => submitWithStatus("PUBLISHED")}
          >
            Upload
          </button>
        </div>

      </form>

      {showPhotoTips && (
        <PhotoTipsModal onClose={() => setShowPhotoTips(false)} />
      )}

    </div>
  );
};

export default SellItem;