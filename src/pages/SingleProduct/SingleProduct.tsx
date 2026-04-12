import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ProductDetails from "./components/ProductDetail/ProductDetails";
import ProductGridSection from "./components/ProductGrid/ProductGridSection";
import styles from "./SingleProduct.module.css";

/** Note: Hooks */
import useSingleProduct from "../../hooks/server/product/useSingleProduct";

import type { ProductDocument } from "../../types/api";
import SingleProductSkeleton from "./components/SingleProductSkeleton/SingleProductSkeleton";
import { ContentFallback } from "../../components/ContentFallback/ContentFallback";

const ProductPage: React.FC = () => {
  const [singleProduct, setSingleProduct] = useState<ProductDocument | null>(null);
  const { data, mutate, isPending, isError } = useSingleProduct();
  const params = useParams();
  const navigate = useNavigate();
  const productId = params?.productId;

  useEffect(() => {
    if (productId) {
      mutate(productId);
    }
  }, [productId, mutate]);

  useEffect(() => {
    if (!productId) {
      setSingleProduct(null);
      return;
    }
    if (isError) {
      setSingleProduct(null);
      return;
    }
    if (!data) return;
    if (data.success === true && data.data && data.data._id === productId) {
      setSingleProduct(data.data);
    } else if (data.success === false) {
      setSingleProduct(null);
    }
  }, [data, isError, productId]);

  const isLoading =
    isPending || (!!productId && data === undefined && !isError);
  const showNotFound =
    !isLoading && (!productId || !singleProduct);

  return (
    <>
      {isLoading && <SingleProductSkeleton />}
      {!isLoading && singleProduct && (
        <div className={styles.pageWrapper}>
          <nav className={styles.breadcrumb}>
            <Link to="/">Home</Link>
            {" / "}
            {singleProduct.categoryTree?.map((tree) => (
              <span key={tree._id}>
                <Link to={`/category/${tree._id}`}>{tree.title}</Link>
                {" / "}
              </span>
            ))}
            <span>{singleProduct.title}</span>
          </nav>

          <div className={styles.topContainer}>
            <div className={styles.leftCol}>
              <ImageGallery
                coverImage={singleProduct.coverImage}
                images={singleProduct.images}
                likesCount={singleProduct.totalLikes}
              />

              <section className={styles.memberSection}>
                <div className={styles.memberLeft}>
                  {singleProduct.ownerProducts && (
                    <ProductGridSection
                      title={`Member's items (${singleProduct.ownerProducts.length})`}
                      products={singleProduct.ownerProducts}
                      showBundlesUI={true}
                    />
                  )}
                </div>
              </section>
            </div>

            <div className={styles.rightCol}>
              <ProductDetails product={singleProduct} />
            </div>
          </div>

          <div className={styles.recommendedSection}>
            {singleProduct.similarProducts && (
              <ProductGridSection
                title="Recommended Products"
                products={singleProduct.similarProducts}
                isLoading={isPending}
                initialCount={8}
                viewAllHref="/catalog"
              />
            )}
          </div>
        </div>
      )}
      {!isLoading && showNotFound && (
        <div className={styles.pageWrapper}>
          <ContentFallback
            title="Product Not Found"
            description="The product you are looking for does not exist or has been removed."
            secondaryAction={{ label: "Go Back", onClick: () => navigate(-1) }}
            primaryAction={{ label: "Browse Products", to: "/catalog" }}
          />
        </div>
      )}
    </>
  );
};

export default ProductPage;
