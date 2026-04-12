/** Settings area — UI-only types for future API wiring */

export type SettingsTabType =
  | "PROFILE"
  | "ACCOUNT"
  | "POSTAGE"
  | "PAYMENTS"
  | "BUNDLE"
  | "NOTIFICATIONS"
  | "PRIVACY"
  | "SECURITY";

export type ShippingOption = {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
};

export type NotificationIconKind = "success" | "message" | "alert" | "promo";

export type NotificationItemData = {
  id: string;
  kind: NotificationIconKind;
  title: string;
  description: string;
  timeLabel: string;
  unread: boolean;
};

export type PrivacyToggleItem = {
  id: string;
  title: string;
  description: string;
};

export type SecurityRowItem = {
  id: string;
  title: string;
  description: string;
};

export type ModalBaseProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

export type AccountSettingsFormState = {
  email: string;
  phone: string;
  fullName: string;
  gender: string;
  birthday: string;
  holidayMode: boolean;
};

export type DeleteAccountFormState = {
  reason: string;
  transactionsComplete: boolean;
};
