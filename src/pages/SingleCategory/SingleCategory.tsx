import { useParams } from "react-router-dom";
import { categories } from "../../data/categories";
import Hero from "../../components/Hero/Hero";
import Search from "../../components/Catalog/Catalog.tsx";

const SingleCategory = () => {
  const { categoryId } = useParams();

  let parentName: string | null = null;

  categories.forEach((parent) => {
    // If parent clicked
    if (parent._id === categoryId) {
      parentName = parent.title;
    }

    // If second-level clicked
    parent.children?.forEach((child) => {
      if (child._id === categoryId) {
        parentName = parent.title;
      }

      // If third-level clicked
      child.children?.forEach((sub) => {
        if (sub._id === categoryId) {
          parentName = parent.title;
        }
      });
    });
  });

  return (
    <>
      <Hero category={parentName} />
      <Search />
    </>
  );
};

export default SingleCategory;