import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./SellItem.module.css";

type Props = {
  label: string;
  options: string[];
  selected: string[];
  setSelected: (v: string[]) => void;
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
}: Props) => {

  const [open,setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(()=>{

    const close = (e:MouseEvent)=>{
      if(ref.current && !ref.current.contains(e.target as Node)){
        setOpen(false)
      }
    }

    document.addEventListener("mousedown",close)

    return ()=> document.removeEventListener("mousedown",close)

  },[])

  const toggle = (opt:string)=>{

    if(singleSelect){
      setSelected([opt])
      setOpen(false)
      return
    }

    if(selected.includes(opt)){
      setSelected(selected.filter(v=>v!==opt))
    }
    else if(!maxSelect || selected.length < maxSelect){
      setSelected([...selected,opt])
    }

  }

  return (

    <div className={styles.formGroup} ref={ref}>

      <label>{label}</label>

      <div
        className={styles.dropdownDisplay}
        onClick={()=>setOpen(!open)}
      >
        <span>
          {selected.length ? selected.join(",") : `Select ${label}`}
        </span>

        <ChevronDown size={16}/>
      </div>

      {error && <span className={styles.error}>{error}</span>}

      {open && (

        <div className={styles.dropdownMenu}>

          {options.map(opt=>(
            <div
              key={opt}
              className={styles.dropdownOption}
              onClick={()=>toggle(opt)}
            >
              {opt}
            </div>
          ))}

        </div>

      )}

    </div>

  )

}

export default MultiSelectDropdown