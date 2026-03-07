import React from "react";
import { MapPin, Clock, Users, Star, Package, Zap, ShieldCheck, UserCircle, MoreHorizontal } from "lucide-react"; 
import styles from "./Profile.module.css";
import type { UserProfile } from "./types";

interface Props {
  profile: UserProfile;
}

const timeAgo = (date: string) => {
  if (!date) return "N/A";
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  let interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} day${interval > 1 ? "s" : ""} ago`;
  return "Just now";
};

const ProfileHeader: React.FC<Props> = ({ profile }) => {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileInfo}>
        
        {profile.profileImage ? (
          <img src={profile.profileImage} alt="Profile" className={styles.profileAvatar} />
        ) : (
          <UserCircle className={styles.profileAvatar} strokeWidth={1} color="#aaa" />
        )}

        <div className={styles.profileDetails}>
          <h2 className={styles.profileName}>{profile.username}</h2>
          
          <div className={styles.profileMeta}>
            <span className={styles.metaItem}>
              {/* Constant 5 Stars yahan hain  */}
              <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
                <Star size={16} fill="#f5c518" stroke="#f5c518" />
                <Star size={16} fill="#f5c518" stroke="#f5c518" />
                <Star size={16} fill="#f5c518" stroke="#f5c518" />
                <Star size={16} fill="#f5c518" stroke="#f5c518" />
                <Star size={16} fill="#f5c518" stroke="#f5c518" />
              </div>
              <span style={{ marginLeft: "4px" }}>{profile.reviewsCount} reviews</span>
            </span>
            <span className={styles.metaItem}>
              <Users size={16} color="#666" /> {profile.followers} followers · {profile.following} following
            </span>
          </div>


          <div className={styles.profileMeta}>
            <span className={styles.metaItem}><Package size={14} color="#666" /> Frequent Uploads</span>
            <span className={styles.metaItem}><Zap size={14} color="#666" /> Speedy Shipping</span>
            <span className={styles.metaItem}>
              <ShieldCheck size={14} color={profile.isVerified ? "#007782" : "gray"} /> 
              {profile.isVerified ? "Verified" : "Unverified"}
            </span>
          </div>

          <div className={styles.profileMeta}>
            <span className={styles.metaItem}>
              <MapPin size={14} color="#666" /> {profile.location?.city}, {profile.location?.country}
            </span>
            <span className={styles.metaItem}>
              <Clock size={14} color="#666" /> Last seen: {timeAgo(profile.lastSeen)}
            </span>
          </div>
        </div>
      </div>
      
      {/*  Naya Button Container for Follow + Three Dots */}
      <div className={styles.headerActions}>
        <button className={styles.activeBtn}>Follow</button>
        <button className={styles.iconBtn} aria-label="More options">
          <MoreHorizontal size={24} />
        </button>
      </div>

    </div>
  );
};

export default ProfileHeader;