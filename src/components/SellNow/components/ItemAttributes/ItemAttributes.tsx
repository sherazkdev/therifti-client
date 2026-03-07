

const ItemAttributes = () => {

  return (
      <>
        <div className={styles.row}>
          <MultiSelectDropdown
            label="Material"
            options={materialsList}
            selected={materials}
            setSelected={(v) => {
              setMaterials(v);
              setMaterialError(""); // error hatane ke liye
            }}
            error={materialError} // error show karne ke liye
            maxSelect={3}
          />

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
        </div>

        <div className={styles.row}>
              <MultiSelectDropdown
                label="Condition"
                options={conditions}
                selected={condition}
                setSelected={(v) => {
                  setCondition(v);
                  setConditionError(""); // error hatane ke liye
                }}
                error={conditionError} // error show karne ke liye
                singleSelect
              />

              <MultiSelectDropdown
                label="Color"
                options={colorsList}
                selected={colors}
                setSelected={(v) => {
                  setColors(v);
                  setColorError(""); // error hatane ke liye
                }}
                error={colorError} // error show karne ke liye
                maxSelect={2}
              />
        </div>

        <div className={styles.row}>
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
  )
};