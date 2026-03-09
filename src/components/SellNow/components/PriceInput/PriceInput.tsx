import { useState, type FC } from "react";

/** Styles */
import styles from "../../SellItem.module.css";
import type { PriceInputPropInterface } from "./PriceInput.types";

const PriceInput: FC<PriceInputPropInterface> = ({errors,register,setValue}) => {
    const [priceDisplay, setPriceDisplay] = useState("");

    const sanitizeDecimal = (input: string) => {
      let s = input.replace(/[^0-9.]/g, "");
      const dot = s.indexOf(".");

      if (dot !== -1) {
        const intPart = s.slice(0, dot);
        let decPart = s.slice(dot + 1).replace(/\./g, "");
        decPart = decPart.slice(0, 2); 
        s = intPart + "." + decPart;
      }
      return s;
    };

    const handlePriceChange = (raw: string) => {
      raw = raw.replace(/^\$/, "");
      const cleaned = sanitizeDecimal(raw);

      if (cleaned === "") {
        setPriceDisplay("");
        setValue("price", undefined as unknown as number, { shouldValidate: true });
        return;
      }

      setPriceDisplay(`$${cleaned}`);

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

      setPriceDisplay(`$${n.toFixed(2)}`);
      setValue("price", n, { shouldValidate: true });
    };
    return (
        <>
            <div className={styles.formGroup}>
              <label>Price</label>
              <input
                type="text"
                inputMode="decimal"
                placeholder="$0.00"
                value={priceDisplay}
                onChange={(e) => handlePriceChange(e.target.value)}
                onBlur={handlePriceBlur}
              />
              <input type="hidden" {...register("price",{
                    required: "Price is required",
                    validate: (v) => (typeof v === "number" && !Number.isNaN(v)) || "Price is required",})
                } />
              {errors.price && <span className={styles.error}>{errors.price.message as string}</span>}
        </div>
        </>
    )
};

export default PriceInput;