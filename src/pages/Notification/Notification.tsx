import React from "react";
import styles from "./Notification.module.css";
import {
  Bell,
  MessageCircle,
  UserPlus,
  Heart,
} from "lucide-react";

import type { NotificationDocument, NotificationTypes } from "../../types/api/notification.types";

/*  Dummy Data  */
const dummyNotifications: NotificationDocument[] = [
  {
    recipient_id: "1",
    type: "ITEM_LIKED",
    metaData: {
      actorId: "u1",
      actorName: "Ali",
      entityId: "p1",
      itemTitle: "iPhone 14",
    },
    linkUrl: "#",
    status: "UNREAD",
    createdAt: "2026-03-19T10:30:00Z",
  },
  {
    recipient_id: "2",
    type: "NEW_MESSAGE",
    metaData: {
      senderId: "u2",
      senderName: "Ahmed",
      chatId: "c1",
      lastMessage: "Bhai kahan ho?",
    },
    linkUrl: "#",
    status: "READ",
    createdAt: "2026-03-19T08:00:00Z",
  },
  {
    recipient_id: "3",
    type: "NEW_FOLLOWER",
    metaData: {
      followerId: "u3",
      followerName: "Sara",
      followedId: "u99",
    },
    linkUrl: "#",
    status: "READ",
    createdAt: "2026-03-18T20:00:00Z",
  },
];

/* Icon maps */
const getIcon = (type: NotificationTypes) => {
  switch (type) {
    case "ITEM_LIKED":
      return <Heart size={20} />;
    case "NEW_MESSAGE":
      return <MessageCircle size={20} />;
    case "NEW_FOLLOWER":
      return <UserPlus size={20} />;
    default:
      return <Bell size={20} />;
  }
};

/* ===== Content Builder title or message ===== */
const getContent = (n: NotificationDocument) => {
  switch (n.type) {
    case "ITEM_LIKED": {
      const data = n.metaData as any;
      return {
        title: "Item Liked",
        message: `${data.actorName || "Someone"} liked your item "${data.itemTitle}"`,
      };
    }

    case "NEW_MESSAGE": {
      const data = n.metaData as any;
      return {
        title: "New Message",
        message: `${data.senderName || "Someone"}: ${data.lastMessage}`,
      };
    }

    case "NEW_FOLLOWER": {
      const data = n.metaData as any;
      return {
        title: "New Follower",
        message: `${data.followerName || "Someone"} started following you`,
      };
    }

    default:
      return {
        title: "Notification",
        message: "",
      };
  }
};

/* Real time converter function is ko call kar keh created at is main pass jo jae ga time created at */
const getTime = (date?: string) => {
  if (!date) return "now";

  const now = new Date();
  const created = new Date(date);

  const diffMs = now.getTime() - created.getTime();
  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);

  if (diffMin < 1) return "now";
  if (diffMin < 60) return `${diffMin}m`;
  if (diffHr < 24) return `${diffHr}h`;

  return `${diffDays}d`;
};

/* ===== Component ===== */
const Notification:React.FC = () => {
  return (
    <div className={`${styles.page}`}>
      <div className={`${styles.notificationContainer}`}>
        <div className={`${styles.header}`}>
          <h2>Notifications</h2>
          <button className={`${styles.markRead}`}>Mark all as read</button>
        </div>

        <div className="list">
          {dummyNotifications.map((n, i) => {
            const { title, message } = getContent(n);
            const isUnread = n.status === "UNREAD";

            return (
              <div
                key={i}
                className={`${styles.item} ${isUnread ? "unread" : ""}`}
              >
                {/* Icon */}
                <div className={`${styles.icon}`}>{getIcon(n.type)}</div>

                {/* Text */}
                <div className={`${styles.content}`}>
                  <h4>{title}</h4>
                  <p>{message}</p>
                </div>

                {/* Time */}
                <div className={`${styles.time}`}>
                  {getTime(n.createdAt)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notification;