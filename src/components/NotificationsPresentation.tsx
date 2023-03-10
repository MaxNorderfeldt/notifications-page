import React, { MouseEventHandler } from "react";
import "../styling/notifications.css";

function Notifications(props: {
  notificationsCounter: number;
  readAllNotifications: MouseEventHandler<HTMLButtonElement>;
  notifications: JSX.Element[];
}) {
  const { notificationsCounter, readAllNotifications, notifications } = props;
  return (
    <section id="notifications" className="flex-container">
      <div className="flex-header">
        <h2>Notifications</h2>
        <h2 id="notificationCounter">{notificationsCounter}</h2>{" "}
        <button className="right-aligned" onClick={readAllNotifications}>
          Mark all as read
        </button>
      </div>
      {notifications}
    </section>
  );
}

export default Notifications;
