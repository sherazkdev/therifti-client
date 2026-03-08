import { type FC } from "react";

import styles from "../../../../SellItem.module.css";
import type { DropDownMenuPropsInterface } from "./DropDownMenu.types";
import type { BrandDocument } from "../../../../../../types/brand/brand.types";
import type { MaterialDocument } from "../../../../../../types/material/material.types";
import type { SizeDocument } from "../../../../../../types/size/size.types";

const DropDownMenu: FC<DropDownMenuPropsInterface> = ({handletoggleOption,label,visible,selected}) => {

    return (
        <>
        <div className={styles.dropdownMenu}>

            {/* Brand */}
            {label === "Brand" && (
                <>  
                    {visible.map((opt:BrandDocument) => (
                        <div
                            key={opt._id}
                            className={styles.dropdownOption}
                            onClick={() => handletoggleOption(opt)}
                        >
                        {opt.brand}
                        <span
                            className={`${styles.checkbox} ${
                                selected?._id === opt._id ? styles.checked : ""
                            }`}
                        />
                        </div>
                    ))}
                </>
            )}
        
            {/* Material */}
            {label === "Material" && (
                <>  
                    {visible.map((opt:MaterialDocument) => (
                        <div
                            key={opt._id}
                            className={styles.dropdownOption}
                            onClick={() => handletoggleOption(opt)}
                        >
                        {opt.material}
                        <span
                            className={`${styles.checkbox} ${
                                selected?.some((s: MaterialDocument) => s?._id === opt._id) ? styles.checked : ""
                            }`}
                        />
                        </div>
                    ))}
                </>
            )}
            
            {/* Size */}
            {label === "Size" && (
                <>  
                    {visible.map((opt:SizeDocument) => (
                        <div
                            key={opt._id}
                            className={styles.dropdownOption}
                            onClick={() => handletoggleOption(opt)}
                        >
                        {opt.international} / {opt.US}
                        <span
                            className={`${styles.checkbox} ${
                                selected?._id === opt._id ? styles.checked : ""
                            }`}
                        />
                        </div>
                    ))}
                </>
            )}

            {/* Condition */}
            {label === "Condition" && (
                <>  
                    {visible.map((opt:string,index:number) => (
                        <div
                            key={index}
                            className={styles.dropdownOption}
                            onClick={() => handletoggleOption(opt)}
                        >
                        {opt}
                        <span
                            className={`${styles.checkbox} ${
                                selected === opt ? styles.checked : ""
                            }`}
                        />
                        </div>
                    ))}
                </>
            )}
            
            {/* Color */}
            {label === "Color" && (
                <>  
                    {visible.map((opt:string,index:number) => (
                        <div
                            key={index}
                            className={styles.dropdownOption}
                            onClick={() => handletoggleOption(opt)}
                        >
                        {opt}
                        <span
                            className={`${styles.checkbox} ${
                                selected?.includes(opt) ? styles.checked : ""
                            }`}
                        />
                        </div>
                    ))}
                </>
            )}
        </div>
        </>
    )
};

export default DropDownMenu;