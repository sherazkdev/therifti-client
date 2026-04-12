import type {
  NotificationItemData,
  PrivacyToggleItem,
  ShippingOption,
} from "./types";

export const mockFromAddressShipping: ShippingOption[] = [
  { id: "anyvan", name: "AnyVan", enabled: false },
  { id: "yodel", name: "Yodel Door to Door", enabled: true },
];

export const mockDropOffShipping: ShippingOption[] = [
  {
    id: "inpost",
    name: "24/7 InPost Locker",
    description: "Prepaid label. Find your nearest drop-off point here.",
    enabled: true,
  },
  {
    id: "dpd",
    name: "DPD Pickup",
    description: "Prepaid label. Shop drop-off.",
    enabled: false,
  },
  {
    id: "evri",
    name: "Evri Home Delivery",
    description: "Prepaid label.",
    enabled: false,
  },
  {
    id: "royal",
    name: "Royal Mail",
    description: "Prepaid label.",
    enabled: false,
  },
];

export const mockNotifications: NotificationItemData[] = [
  {
    id: "1",
    kind: "success",
    title: "Booking Confirmation",
    description: "Your order has been confirmed and is being processed.",
    timeLabel: "2h",
    unread: true,
  },
  {
    id: "2",
    kind: "message",
    title: "New Message",
    description: "You have a new message from a buyer about your listing.",
    timeLabel: "1h",
    unread: true,
  },
  {
    id: "3",
    kind: "alert",
    title: "System Alert",
    description: "Please review your account security settings.",
    timeLabel: "3h",
    unread: false,
  },
  {
    id: "4",
    kind: "promo",
    title: "Promotion",
    description: "Limited-time shipping discount for sellers this week.",
    timeLabel: "1d",
    unread: false,
  },
];

export const privacyToggleDefinitions: PrivacyToggleItem[] = [
  {
    id: "marketing",
    title: "Feature my items in marketing campaigns and partner promotions.",
    description:
      "Allow us to showcase your listings in emails, social ads, and partner sites.",
  },
  {
    id: "favouriteNotify",
    title: "Notify owners when I favourite their items.",
    description: "Sellers may see when you save their listings.",
  },
  {
    id: "thirdParty",
    title: "Allow third-party tracking.",
    description: "Helps measure ads and site performance.",
  },
  {
    id: "personaliseFeed",
    title: "Allow Therifit to personalise my feed based on my activity.",
    description: "Recommendations tailored to what you browse and buy.",
  },
  {
    id: "recentlyViewed",
    title: "Allow Therifit to display my recently viewed items on my profile.",
    description: "Visible only as shown in your privacy preview.",
  },
];
