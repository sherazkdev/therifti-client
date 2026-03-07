import React from "react";
// 👇 Yahan bhi 'UserCircle' import kar liya
import { Star, UserCircle } from "lucide-react"; 
import styles from "./Profile.module.css";
import type { Review } from "./types";

interface Props {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

const ReviewsTab: React.FC<Props> = ({ reviews, averageRating, totalReviews }) => {
  return (
    <div className={styles.reviewsSection}>
      <div className={styles.reviewsHeader}>
        <h2 className={styles.reviewRating}>{averageRating.toFixed(1)}</h2>
        <div>
          <div className={styles.reviewStars}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill={i < Math.round(averageRating) ? "#f5c518" : "none"} stroke="#f5c518" />
            ))}
          </div>
          <p style={{ margin: "4px 0 0", color: "#666" }}>({totalReviews} reviews)</p>
        </div>
      </div>

      {reviews.map((review) => (
        <div key={review._id} className={styles.reviewCard}>
          <div className={styles.reviewUser}>
            
            {/* 👇 Same logic for Reviewer Avatar */}
            {review.author.avatar ? (
              <img src={review.author.avatar} alt="user" className={styles.reviewAvatar} />
            ) : (
              <UserCircle className={styles.reviewAvatar} strokeWidth={1} color="#aaa" />
            )}

            <div>
              <p style={{ margin: 0, fontWeight: 600 }}>
                {review.author.username} · <span style={{ color: "#666", fontWeight: 400 }}>{review.date}</span>
              </p>
              <div className={styles.reviewStars} style={{ marginTop: "4px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < review.rating ? "#f5c518" : "none"} stroke="#f5c518" />
                ))}
              </div>
            </div>
          </div>
          <p className={styles.reviewText}>{review.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsTab;