import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./Setings.module.css";
import type { SettingsTabType } from "./types";

import SettingsSidebar from "./components/Sidebar/SettingsSidebar";
import ProfileDetails from "./components/ProfileDetails/ProfileDetails";
import AccountSettingsView from "./components/AccountSettings/AccountSettingsView";
import PostageView from "./components/Postage/PostageView";
import PaymentsView from "./components/Payments/PaymentsView";
import BundleDiscountsView from "./components/BundleDiscounts/BundleDiscountsView";
import NotificationsView from "./components/Notifications/NotificationsView";
import PrivacySettingsView from "./components/Privacy/PrivacySettingsView";
import SecurityView from "./components/Security/SecurityView";

const tabToPath: Record<SettingsTabType, string> = {
  PROFILE: "profile",
  ACCOUNT: "account",
  POSTAGE: "postage",
  PAYMENTS: "payments",
  BUNDLE: "bundle",
  NOTIFICATIONS: "notifications",
  PRIVACY: "privacy",
  SECURITY: "security",
};

const pathToTab = (segment: string | undefined): SettingsTabType => {
  const key = segment?.toLowerCase();
  const map: Record<string, SettingsTabType> = {
    profile: "PROFILE",
    account: "ACCOUNT",
    postage: "POSTAGE",
    payments: "PAYMENTS",
    bundle: "BUNDLE",
    notifications: "NOTIFICATIONS",
    privacy: "PRIVACY",
    security: "SECURITY",
  };
  return key && map[key] ? map[key] : "ACCOUNT";
};

export default function SettingsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = useMemo(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    const last = parts[parts.length - 1];
    if (parts[0] !== "settings") return "ACCOUNT";
    if (last === "settings") return "ACCOUNT";
    return pathToTab(last);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/settings" || location.pathname === "/settings/") {
      navigate("/settings/account", { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleTabChange = (tab: SettingsTabType) => {
    navigate(`/settings/${tabToPath[tab]}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "PROFILE":
        return <ProfileDetails />;
      case "ACCOUNT":
        return <AccountSettingsView />;
      case "POSTAGE":
        return <PostageView />;
      case "PAYMENTS":
        return <PaymentsView />;
      case "BUNDLE":
        return <BundleDiscountsView />;
      case "NOTIFICATIONS":
        return <NotificationsView />;
      case "PRIVACY":
        return <PrivacySettingsView />;
      case "SECURITY":
        return <SecurityView />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.page}>
      <SettingsSidebar activeTab={activeTab} setActiveTab={handleTabChange} />
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
}
