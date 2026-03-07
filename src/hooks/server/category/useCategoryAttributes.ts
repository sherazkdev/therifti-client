import useBrandsByCategoryId from "../brand/useBrandsByCategory"
import useMaterialsByCategory from "../material/useMaterialsByCategory"
import useSizesByCategory from "../size/useSizesByCategory"

export const useCategoryAttributes = (categoryId?: string) => {

    const materials = useMaterialsByCategory(categoryId)
    const sizes = useSizesByCategory(categoryId)
    const brands = useBrandsByCategoryId(categoryId)
    return {
        materials: materials.data ?? [],
        sizes: sizes.data ?? [],
        brands: brands.data ?? [],

        isLoading: materials.isLoading || sizes.isLoading || brands.isLoading
    }

}