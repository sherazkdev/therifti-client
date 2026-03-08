import useBrandsByCategoryId from "../brand/useBrandsByCategory"
import useMaterialsByCategory from "../material/useMaterialsByCategory"
import useSizesByCategory from "../size/useSizesByCategory"

const useCategoryAttributes = (categoryId?: string) => {

    const materials = useMaterialsByCategory(categoryId)
    const sizes = useSizesByCategory(categoryId)
    const brands = useBrandsByCategoryId(categoryId)
    return {
        materials: materials.data?.data ?? [],
        sizes: sizes.data?.data ?? [],
        brands: brands.data?.data ?? [],

        isLoading: materials.isLoading || sizes.isLoading || brands.isLoading
    }

}

export default useCategoryAttributes;