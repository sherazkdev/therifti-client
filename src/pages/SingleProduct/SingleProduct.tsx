import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ProductDetails from "./components/ProductDetail/ProductDetails"
import ProductGridSection from './components/ProductGrid/ProductGridSection';
import styles from './SingleProduct.module.css';

/** Note: Hooks */
import useSingleProduct from '../../hooks/server/product/useSingleProduct';

import type { GetSingleProductResponseInterface } from '../../types/api';
import SingleProductSkeleton from './components/SingleProductSkeleton/SingleProductSkeleton';

const ProductPage: React.FC = () => {

  const [singleProduct, setSingleProduct] = useState<GetSingleProductResponseInterface | null>(null);
  const { data, mutate, isPending} = useSingleProduct();
  const params = useParams();

  useEffect( () => {
    /** Note: Check Param in productId is in exist. */
    if(params?.productId){
      mutate(params.productId);
    }
  },[params])

  useEffect(() => {
    if (data?.success === true && data) {
      setSingleProduct(data.data);
    }
  }, [data]);

  return (
      <>
      {isPending ? <SingleProductSkeleton /> : singleProduct && (
        <div className={styles.pageWrapper}>
          <nav className={styles.breadcrumb}>
            <Link to="/">Home</Link>
            {" / "}
            {singleProduct?.categoryTree.map((tree) => (
              <span key={tree._id}>
                <Link to={`/category/${tree._id}`}>{tree.title}</Link>
                {" / "}
              </span>
            ))}
            <span>{singleProduct?.title}</span>
          </nav>

          <div className={styles.topContainer}>
            
            <div className={styles.leftCol}>
              <ImageGallery coverImage={singleProduct?.coverImage as string} images={singleProduct?.images as []} likesCount={singleProduct?.totalLikes} />
              
              <section className={styles.memberSection}>
                  <div className={styles.memberLeft}>
                    
                  {singleProduct && singleProduct.ownerProducts && (
                    <ProductGridSection title={`Member's items (${singleProduct?.ownerProducts?.length})`} products={singleProduct && singleProduct?.ownerProducts} showBundlesUI={true}  />
                  )}
              </div>
              </section>
            </div>
            
            <div className={styles.rightCol}>
              <ProductDetails product={singleProduct as GetSingleProductResponseInterface} />
            </div>
          </div>

          <div className={styles.recommendedSection}>
            {singleProduct && singleProduct.similarProducts && (
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
      </>
  );
};

export default ProductPage;