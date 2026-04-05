import { type ReactNode, useState,useEffect } from "react";
import { UIContext } from "./ui.context"

/** Types */
import type { CategoryDocument } from "../../types/api";
import useCategories from "../../hooks/server/category/useCategories";

export const UIProvider = ({ children }:{children:ReactNode}) => {
  const [categories, setCategories] = useState<CategoryDocument[] | []>([]);



  /** Note: Check User is Authenticated */
  const { data,isLoading } = useCategories();
  
  useEffect( () => {
    if(data?.data && data.success === true){
      setCategories(data.data);
    }
  }, [data]);

  if(isLoading) return null;

  return (
    <UIContext.Provider value={{categories}}>
      {children}
    </UIContext.Provider>
  );
};