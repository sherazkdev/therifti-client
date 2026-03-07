import React, { useState } from "react";
import styles from "./Profile.module.css";
import type  { UserProfile } from "./types";

// 👇 Yeh raha aapka import
import { mockProfileData } from "./mockData"; 

import ProfileHeader from "./ProfileHeader";
import ListingTab from "./ListingTab";
import ReviewsTab from "./ReviewsTab";

const ProfilePage: React.FC = () => {
  //  State mein ab humne mock data pass kar diya hai
  const [profile, setProfile] = useState<UserProfile>(mockProfileData);
  const [activeTab, setActiveTab] = useState<"listing" | "reviews">("listing");

  // Since data is hardcoded, loading spinner ki zaroorat nahi
  if (!profile) return <div>Loading...</div>;

  return (
    <div className={styles.profilePage}>
      <ProfileHeader profile={profile} />

      <div className={styles.profileTabs}>
        <button
          className={`${styles.tab} ${activeTab === "listing" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("listing")}
        >
          Listing ({profile.products?.length || 0})
        </button>
        <button
          className={`${styles.tab} ${activeTab === "reviews" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews ({profile.reviewsCount || 0})
        </button>
      </div>

      {activeTab === "listing" ? (
        <ListingTab products={profile.products || []} />
      ) : (
        <ReviewsTab 
          reviews={profile.reviews || []} 
          averageRating={profile.averageRating || 0}
          totalReviews={profile.reviewsCount || 0}
        />
      )}
    </div>
  );
};

export default ProfilePage;