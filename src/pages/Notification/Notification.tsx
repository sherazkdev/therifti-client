import React, { useEffect, useState } from "react";
import styles from "./Notification.module.css";
import {
  Heart,
  type LucideIcon,
} from "lucide-react";

import type { NotificationDocument} from "../../types/api/notification.types";

import useNotifications from "../../hooks/server/notification/useNotifications";
import useMarkAsRead from "../../hooks/server/notification/useMarkAsRead";

import type { NotifcationStatus } from "../../types/components";
import type { ApiError } from "../../types/api";
import { useNavigate } from "react-router-dom";
import NotificationSkeleton from "./components/NotificationSkeleton/NotificationSkeleton";

  /** Build Notification Interface */
  interface BuildNotificationInterface {
    _id:string,
    icon:LucideIcon,
    title:string,
    message:string,
    createdAt:string,
    linkUrl:string,
    status:NotifcationStatus
  }

  const buildNotificationContent = (notificationDocument:NotificationDocument[]):BuildNotificationInterface[] => {
    const notifications = notificationDocument.map( (item) => {
      switch (item.type) {
        
        /** New Message */
        case "ITEM_LIKED":{
          let metaData = item.metaData as any;
          return {
            _id:item._id,
            icon:Heart,
            title:"",
            message: `${metaData.actorName || "Someone"} liked your item "${metaData.itemTitle}"`,
            createdAt:getTime(item.createdAt),
            linkUrl:item.linkUrl,
            status:item.status
          }
        }

        /** New Follower */
        case "NEW_FOLLOWER":{
          let metaData = item.metaData as any;
          return {
            _id:item._id,
            icon:Heart,
            title:"New follower",
            message: `${metaData.followerName || "Someone"} started following you`,
            createdAt:getTime(item.createdAt),
            linkUrl:item.linkUrl,
            status:item.status
          }
        }

        /** New Message */
        case "NEW_MESSAGE":{
          let metaData = item.metaData as any;
          return {
            _id:item._id,
            icon:Heart,
            title:"New Message",
            message: `${metaData.senderName || "Someone"}: ${metaData.lastMessage.length > 55 ? metaData.lastMessage.slice(0,200): metaData.lastMessage}`,
            createdAt:getTime(item.createdAt),
            linkUrl:item.linkUrl,
            status:item.status
          }
        }

        

      }
    });
    console.log(notifications)
    return notifications;
  }

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

  const [notifications,setNotifications] = useState<BuildNotificationInterface[] | null>(null);

  const notificationMutation = useNotifications();
  const markAsReadMutation = useMarkAsRead();

  const Redirect = useNavigate();

  useEffect( () => {
    if(notificationMutation.data){
      const response = notificationMutation.data;
      if(response.statusCode === 200 && response.success === true){
        const bulidnotifications = buildNotificationContent(response.data);
        setNotifications(bulidnotifications);
      }
    }
  },[notificationMutation.data])

  const handleMarkAsRead = (notification?:BuildNotificationInterface) => {
    if(notification?._id){
      markAsReadMutation.mutate(notification._id,{
        onError:(e) => {
          const err = e.response?.data as ApiError || undefined;
          if(err){
            return console.log(err);
          }
        },
        onSuccess:(res) => {
          if(res.statusCode === 202 && res.success === true){
            return Redirect(`/${notification.linkUrl}`);
          }
        }
      });
    }else {
      markAsReadMutation.mutate({},{
        onError:(e) => {
          const err = e.response?.data as ApiError || undefined;
          if(err){
            return console.log(err);
          }
        },
        onSuccess:(res) => {
          if(res.statusCode === 202 && res.success === true){
            return Redirect(`/${notification.linkUrl}`);
          }
        }
      });
    }
  }

  return (
      <>
      {notificationMutation.isLoading && <NotificationSkeleton />}
      {!notificationMutation.isLoading && notifications && (
        <div className={`${styles.page}`}>
          <div className={`${styles.notificationContainer}`}>
            <div className={`${styles.header}`}>
              <h2>Notifications</h2>
              <button className={`${styles.markRead}`}>Mark all as read</button>
            </div>

            <div className="list">
              {notifications.map((n, i) => (
                  <button 
                      key={i}
                      className={`${styles.itemButton} ${n.status === "UNREAD" ? styles.unread : ""}`}
                      onClick={() => handleMarkAsRead(n)}
                    >
                    {/* Icon */}
                    <div className={`${styles.icon}`}>{<n.icon />}</div>

                    {/* Text */}
                    <div className={`${styles.content}`}>
                      <h4>{n.title}</h4>
                      <p>{n.message}</p>
                    </div>

                    {/* Time */}
                    <div className={`${styles.time}`}>
                      {n.createdAt}
                    </div>
                      
                  </button>
              ))}
            </div>
          </div>
        </div>
      )}
      </>
  );
};

export default Notification;