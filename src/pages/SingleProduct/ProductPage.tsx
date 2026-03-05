import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, MapPin, Clock } from 'lucide-react'; // <-- Premium Icons imported here
import ImageGallery from './ImageGallery/ImageGallery';
import ProductDetails from "./ProductDetail/ProductDetails"
import ProductGridSection from './ProductGrid/ProductGridSection';
import styles from './ProductPage.module.css';
import type { Product } from './types'; 

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // 1. Dummy Main Product
      setSingleProduct({
        _id: productId || "1",
        title: "The ReWool Black Nike Hoodie",
        name: "Black Nike Hoodie",
        price: 20.00,
        condition: "New with tags",
        brand: "Nike",
        size: "One Size",
        colors: ["Black"],
        images: [
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800", 
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&q=80&w=800"
        ],
        createdAt: "15 hours ago",
        likes: Array(1200).fill("u"), 
        category: { parent: "Men", main: "Clothing", sub: "Hoodies" },
        user: { _id: "u1", username: "fashion_store", location: { city: "Manchester", country: "UK" }, lastSeen: "2 hours ago" }
      });

      // 2. Dummy Grid Products
      const dummyGridItems: Product[] = [
        {
          _id: "grid-1", title: "River Island Denim Jacket", name: "Denim Jacket", price: 59.99, condition: "Good", brand: "River Island", size: "M30", colors: ["Blue"], images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800"], createdAt: "2 days ago", likes: Array(1200).fill("u"),
        },
        {
          _id: "grid-2", title: "Mango Floral Maxi Dress", name: "Floral Dress", price: 59.99, condition: "Good", brand: "Mango", size: "M30", colors: ["Black", "Floral"], images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=500"], createdAt: "1 day ago", likes: Array(1200).fill("u"),
        },
        {
          _id: "grid-3", title: "Topman Casual Shirt", name: "Casual Shirt", price: 59.99, condition: "Good", brand: "Topman", size: "M30", colors: ["White"], images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800"], createdAt: "5 hours ago", likes: Array(1200).fill("u"),
        },
        {
          _id: "grid-4", title: "Mango Graphic Tee", name: "Graphic Tee", price: 59.99, condition: "Good", brand: "Mango", size: "M30", colors: ["White"], images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=500"], createdAt: "1 week ago", likes: Array(1200).fill("u"),
        },
        
         {
          _id: "grid-5", title: "Mango Graphic Tee", name: "Graphic Tee", price: 59.99, condition: "Good", brand: "Mango", size: "M30", colors: ["White"], images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=500"], createdAt: "1 week ago", likes: Array(1200).fill("u"),
        },
        
         {
          _id: "grid-6", title: "Mango Graphic Tee", name: "Graphic Tee", price: 59.99, condition: "Good", brand: "Mango", size: "M30", colors: ["White"], images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=500"], createdAt: "1 week ago", likes: Array(1200).fill("u"),
        },
         
         {
          _id: "grid-6", title: "Mango Graphic Tee", name: "Graphic Tee", price: 59.99, condition: "Good", brand: "Mango", size: "M30", colors: ["White"], images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=500"], createdAt: "1 week ago", likes: Array(1200).fill("u"),
        },
         
         {
          _id: "grid-6", title: "Mango Graphic Tee", name: "Graphic Tee", price: 59.99, condition: "Good", brand: "Mango", size: "M30", colors: ["White"], images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=500"], createdAt: "1 week ago", likes: Array(1200).fill("u"),
        },
         
         {
          _id: "grid-6", title: "Mango Graphic Tee", name: "Graphic Tee", price: 59.99, condition: "Good", brand: "Mango", size: "M30", colors: ["White"], images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=500"], createdAt: "1 week ago", likes: Array(1200).fill("u"),
        },
         
         {
          _id: "grid-6", title: "Mango Graphic Tee", name: "Graphic Tee", price: 59.99, condition: "Good", brand: "Mango", size: "M30", colors: ["White"], images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=500"], createdAt: "1 week ago", likes: Array(1200).fill("u"),
        },
         
         {
          _id: "grid-6", title: "Mango Graphic Tee", name: "Graphic Tee", price: 59.99, condition: "Good", brand: "Mango", size: "M30", colors: ["White"], images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=500"], createdAt: "1 week ago", likes: Array(1200).fill("u"),
        },
         
         {
          _id: "grid-6", title: "Mango Graphic Tee", name: "Graphic Tee", price: 59.99, condition: "Good", brand: "Mango", size: "M30", colors: ["White"], images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=500"], createdAt: "1 week ago", likes: Array(1200).fill("u"),
        },
         
         {
          _id: "grid-6", title: "Mango Graphic Tee", name: "Graphic Tee", price: 59.99, condition: "Good", brand: "Mango", size: "M30", colors: ["White"], images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=500"], createdAt: "1 week ago", likes: Array(1200).fill("u"),
        }
        
      ];

      setSellerProducts(dummyGridItems); 
      setRecommended(dummyGridItems);
      setLoading(false);
    }, 1500); 
  }, [productId]);

  return (
    <div className={styles.pageWrapper}>
      <nav className={styles.breadcrumb}>
        <Link to='/'>Home</Link> / 
        <Link to={`/category/${singleProduct?.category?.parent}`}> {singleProduct?.category?.parent} </Link> / 
        <Link to={`/category/${singleProduct?.category?.main}`}> {singleProduct?.category?.main} </Link> / 
        <span>{singleProduct?.name}</span>
      </nav>

      <div className={styles.topContainer}>
        <div className={styles.leftCol}>
          <ImageGallery images={singleProduct?.images || []} likesCount={singleProduct?.likes?.length || 0} isLoading={loading} />
        </div>
        <div className={styles.rightCol}>
          <ProductDetails product={singleProduct} isLoading={loading} />
        </div>
      </div>

      <section className={styles.memberSection}>
        <div className={styles.memberLeft}>
          <ProductGridSection title={`Member's items (${sellerProducts.length})`} products={sellerProducts} showBundlesUI={true} isLoading={loading} initialCount={4} />
        </div>

        <div className={styles.memberRight}>
          <div className={styles.buyerProtectionBox}>
            <h4>Buyer Protection Fee</h4>
            <p>Our Buyer Protection is added to every purchase made with the "Buy now" button. Includes our <a href="#">Refund Policy</a>.</p>
          </div>

          {loading ? (
            <div className={`${styles.sellerCard} ${styles.skeletonSellerCard}`}>
               <div className={styles.sellerHeader}>
                 <div className={`${styles.skeletonPulse} ${styles.skelAvatar}`} />
                 <div style={{ flex: 1 }}>
                   <div className={`${styles.skeletonPulse}`} style={{ width: '60%', height: '20px', marginBottom: '8px' }} />
                   <div className={`${styles.skeletonPulse}`} style={{ width: '40%', height: '16px' }} />
                 </div>
               </div>
               <hr className={styles.divider} />
               <div className={`${styles.skeletonPulse}`} style={{ width: '100%', height: '16px', marginBottom: '12px' }} />
               <div className={`${styles.skeletonPulse}`} style={{ width: '80%', height: '16px', marginBottom: '24px' }} />
               <hr className={styles.divider} />
               <div className={`${styles.skeletonPulse}`} style={{ width: '100%', height: '44px', borderRadius: '6px' }} />
            </div>
          ) : singleProduct?.user ? (
            <div className={styles.sellerCard}>
              <div className={styles.sellerHeader}>
                <div className={styles.sellerAvatar}>
                  {singleProduct.user.profileImage ? (
                    <img src={singleProduct.user.profileImage} alt="seller" />
                  ) : (
                    <span className={styles.avatarPlaceholder}>{singleProduct.user.username.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div>
                  <Link to={`/member/${singleProduct.user._id}`} className={styles.sellerName}>
                    @{singleProduct.user.username}
                  </Link>
                  {/* Real Lucide Stars */}
                  <div className={styles.sellerRating}>
                    {[1, 2, 3, 4, 5].map((star) => (
                       <Star key={star} size={14} fill="#f5c518" color="#f5c518" />
                    ))}
                  </div>
                </div>
              </div>
              
              <hr className={styles.divider} />
              
              <div className={styles.sellerStats}>
                {/* Real Lucide Icons perfectly aligned */}
                <div className={styles.statRow}>
                  <Truck size={18} className={styles.statIcon} />
                  <div>
                    <strong>Speedy Shipping</strong>
                    <p>Sends items promptly — usually within 24 hours.</p>
                  </div>
                </div>
                
                <hr className={styles.divider} />
                
                <div className={styles.statRow}>
                  <MapPin size={16} className={styles.statIcon} />
                  <span>{singleProduct.user.location?.city}, {singleProduct.user.location?.country}</span>
                </div>
                
                <div className={styles.statRow}>
                  <Clock size={16} className={styles.statIcon} />
                  <span>Last seen {singleProduct.user.lastSeen}</span>
                </div>
              </div>

              <button className={styles.followBtn}>Follow</button>
            </div>
          ) : null}

         <div className={styles.buyerNotice}>
            <p>
              Consumer protection laws do not apply to your purchases from other consumers. 
              More specifically, the right to cancel <u>(section 29(1) of the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013)</u> and the right to reject <u>(section 20 of the Consumer Rights Act)</u> does not apply. Buyer's rights are significantly reduced when a sale is carried out between two individuals. More specifically, the following sections of the Consumer Rights Act 2015 do not apply: goods to be of satisfactory quality (section 9 of the Consumer Rights Act) and fit for a particular purpose (section 10 of the Consumer Rights Act).
            </p>
            <p>
              Goods from private sellers do not have to be fault-free and if defects or marks were clearly mentioned by the seller or are visible in the seller’s photograph, then you do not have a case against the seller. However, if the seller’s goods do not match the description, you have the right to ask for a refund or compensation.
            </p>
            <p>
              Every purchase you make using the ‘Buy now’ button is covered by our Buyer Protection service.
            </p>
          </div>
        </div>
      </section>

      <div className={styles.recommendedSection}>
        <ProductGridSection title="Recommended Products" products={recommended} isLoading={loading} initialCount={10}/>
      </div>
    </div>
  );
};

export default ProductPage;