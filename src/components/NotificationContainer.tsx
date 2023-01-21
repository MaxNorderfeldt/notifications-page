import React, { useState, useEffect, useMemo } from "react";
import "../styling/notifications.css";
import Notifications from "./Notifications";

import { INotification } from "./NotificationInterface";

function NotificationContainer() {
  const [data, setData] = useState<INotification[]>([]);

  const notificationsCounter = useMemo(() => {
    let counter = 0;
    data.forEach((Notification) => {
      if (!Notification.read) {
        counter++;
      }
    });
    return counter;
  }, [data]);

  useEffect(() => {
    async function fetchNotifications() {
      const response = await fetch("./data/notifications.json");
      const json = await response.json();
      setData(json);
    }
    fetchNotifications();
  }, []);

  function readAllNotifications() {
    setData(data.map((arr) => ({ ...arr, read: true })));
  }

  return (
    <section id="notifications" className="flex-container">
      <div className="flex-header">
        <h2>Notifications</h2>
        <h2 id="notificationCounter">{notificationsCounter}</h2>{" "}
        <button className="right-aligned" onClick={readAllNotifications}>
          Mark all as read
        </button>
      </div>
      {<Notifications data={data} />}
    </section>
  );
}
export default NotificationContainer;
