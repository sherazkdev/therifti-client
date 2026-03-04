import { useParams } from "react-router-dom";
import { categories } from "../../data/categories";
import Header from "../../layout/Header/Header";
import Hero from "../../components/Hero/Hero";
import SearchResults from "../../components/SingleProductSearch/SearchResults";
import MainFooter from "../../components/mainFooter/MainFooter";
import PromoFooter from "../../components/Promofooter/PromoFooter";

const SingleCategory = () => {
  const { categoryId } = useParams();

  let parentName: string | null = null;

  categories.forEach((parent) => {
    // If parent clicked
    if (parent.id === categoryId) {
      parentName = parent.name;
    }

    // If second-level clicked
    parent.children?.forEach((child) => {
      if (child.id === categoryId) {
        parentName = parent.name;
      }

      // If third-level clicked
      child.children?.forEach((sub) => {
        if (sub.id === categoryId) {
          parentName = parent.name;
        }
      });
    });
  });

  return (
    <>
      <Header variant="overlay" />
      <Hero category={parentName} />
      <SearchResults />
      <MainFooter />
    </>
  );
};

export default SingleCategory;