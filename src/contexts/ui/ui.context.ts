import { createContext, useContext } from "react";
import type { UIContentInterface } from "../../types/contexts/ui.types";

export const UIContext = createContext<UIContentInterface>({categories:[]});

export const useUI = () => useContext(UIContext);
