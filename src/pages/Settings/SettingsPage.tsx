import { useState, useEffect } from "react";
import styles from "./Setings.module.css";

import SettingsSidebar from "./components/Sidebar/SettingsSidebar";
import ProfileDetails from "./components/ProfileDetails/ProfileDetails";

export type SettingsTabType =
  | "PROFILE"
  | "ACCOUNT"
  | "POSTAGE"
  | "PAYMENTS"
  | "BUNDLE"
  | "NOTIFICATIONS"
  | "PRIVACY"
  | "SECURITY";

export default function SettingsPage() {
  // 1. URL se initial tab check karne ka function
  const getInitialTab = (): SettingsTabType => {
    const pathName = window.location.pathname.split("/").pop()?.toUpperCase();
    
    const validTabs = [
      "PROFILE",
      "ACCOUNT",
      "POSTAGE",
      "PAYMENTS",
      "BUNDLE",
      "NOTIFICATIONS",
      "PRIVACY",
      "SECURITY",
    ];
    
    if (pathName && validTabs.includes(pathName)) {
      return pathName as SettingsTabType;
    }
    return "PROFILE"; // Default tab
  };

  const [activeTab, setActiveTab] = useState<SettingsTabType>(getInitialTab);

  // 2. Agar user browser ka Back/Forward button use kare toh state update ho
  useEffect(() => {
    const handlePopState = () => {
      setActiveTab(getInitialTab());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // 3. Custom function jo state aur URL dono change kare
  const handleTabChange = (tab: SettingsTabType) => {
    setActiveTab(tab);
    window.history.pushState(null, "", `/settings/${tab.toLowerCase()}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "PROFILE":
        return <ProfileDetails />;
      case "ACCOUNT":
        return <div>Account Settings Component</div>;
      case "POSTAGE":
        return <div>Postage Component</div>;
      case "PAYMENTS":
        return <div>Payments Component</div>;
      case "BUNDLE":
        return <div>Bundle Discounts Component</div>;
      case "NOTIFICATIONS":
        return <div>Notifications Component</div>;
      case "PRIVACY":
        return <div>Privacy Settings Component</div>;
      case "SECURITY":
        return <div>Security Component</div>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.page}>
      <SettingsSidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />

      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
}