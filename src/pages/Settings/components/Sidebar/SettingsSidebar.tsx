import styles from "./SettingsSidebar.module.css";
import type { SettingsTabType } from "../../SettingsPage";

interface Props {
  activeTab: SettingsTabType;
  setActiveTab: (tab: SettingsTabType) => void;
}

const sidebarItems = [
  { label: "Profile details", value: "PROFILE" },
  { label: "Account settings", value: "ACCOUNT" },
  { label: "Postage", value: "POSTAGE" },
  { label: "Payments", value: "PAYMENTS" },
  { label: "Bundle discounts", value: "BUNDLE" },
  { label: "Notifications", value: "NOTIFICATIONS" },
  { label: "Privacy settings", value: "PRIVACY" },
  { label: "Security", value: "SECURITY" },
];

export default function SettingsSidebar({
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <div className={styles.sidebar}>
      {sidebarItems.map((item) => (
        <button
          key={item.value}
          className={`${styles.sidebarItem} ${
            activeTab === item.value ? styles.active : ""
          }`}
          onClick={() => setActiveTab(item.value as SettingsTabType)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}