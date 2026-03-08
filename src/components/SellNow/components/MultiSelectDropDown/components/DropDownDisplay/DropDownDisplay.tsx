import {type FC} from 'react';
import { ChevronDown } from 'lucide-react';
import type { DropDownDisplayPropsInterface } from './DropDownDisplay.types';
import type { BrandDocument } from '../../../../../../types/brand/brand.types';
import type { MaterialDocument } from '../../../../../../types/material/material.types';
import type { SizeDocument } from '../../../../../../types/size/size.types';

import styles from "../../../../SellItem.module.css";

const DropDownDisplay: FC<DropDownDisplayPropsInterface>  = ({label,selected,handleDropDownDisplay}) => {

    return (
        <>
        
            <div className={styles.dropdownDisplay} onClick={handleDropDownDisplay}>
                <span>

                {label === "Brand" && (
                    <>  
                        {selected ? (selected as BrandDocument)?.brand : "Select Brand" }
                    </>
                )}

                {label === "Color" && (
                    <>  
                        {selected && selected?.length > 0 ? selected?.join(", ") : "Select up to 2 colors" }
                    </>
                )}

                {label === "Condition" && (
                    <>  
                        {selected ? selected : "Select Condition" }
                    </>
                )}

                {label === "Material" && (
                    <>  
                        {selected && selected?.length > 0 ? selected?.map( (item:MaterialDocument) => item?.material).join(", ") : "Select upto 3 Material"}
                    </>
                )}

                {label === "Size" && (
                    <>  
                        {selected && selected?.length > 0 ? selected?.map( (item:SizeDocument) => item.international).join(", ") : "Select Size"}
                    </>
                )}
                </span>
                <ChevronDown size={16} />
            </div>
        </>
    )
};

export default DropDownDisplay;