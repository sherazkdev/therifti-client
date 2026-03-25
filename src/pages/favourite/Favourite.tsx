import React, { useEffect, useState } from "react";

/** Styles */
import styles from "./Favourite.module.css";

import useWishlist from "../../hooks/server/wishlist/useWishlist";
import type { WishlistDocument } from "../../types/api";
import ProductCard from "../../components/productcard/ProductCard";

const Favourite = () => {
    const [wislists,setWishlists] = useState<WishlistDocument[] | null>(null);

    const wishlistMutation = useWishlist();

    useEffect( () => {
        if(wishlistMutation.data && wishlistMutation.data?.data.length > 0){
            setWishlists(wishlistMutation.data.data);
        }
    },[wishlistMutation.data]);

    return (
        <>
            <main className={styles.wrapper}>
                <div id="main-header" className={styles.topMain}>
                    <h1 className={styles.mainHeader}>Favorited Items</h1>
                </div>

                <section className={styles.grid}>
                    {wislists && wislists.map( (fav) => (
                        <ProductCard
                            key={fav._id}
                            _id={fav.product._id}
                            brand={fav.product.brand}
                            condition={fav.product.condition}
                            coverImage={fav.product.coverImage}
                            isLoading={wishlistMutation.isLoading}
                            isLiked={fav.isLiked}
                            likes={fav.totalLikes}
                            meta={fav.product.title}
                            parcelSize={fav.product.parcelSize}
                            price={fav.product.price}
                        />
                    ))}
                </section>
            </main>
        </>
    );
};

export default Favourite;