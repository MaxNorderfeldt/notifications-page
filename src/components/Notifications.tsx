import React, { useMemo } from "react";
import "../styling/notifications.css";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { INotification } from "./NotificationInterface";

function Notifications(props: { data: INotification[] }) {
  let { data } = props;

  const notifications = useMemo(() => {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
    return data.map((notification) => {
      let avatarUrl =
        "assets/images/avatar-" +
        notification.name.split(/[ ]/)[0] +
        "-" +
        notification.name.split(/[ ]/)[1] +
        ".webp";
      return (
        <div
          className={"notification" + (notification.read ? " read" : " unread")}
          key={notification.name + notification.date}
        >
          <div className="flex-container" id="notification-info">
            <img
              src={avatarUrl.toLowerCase()}
              alt={notification.name}
              id="avatar-image"
            ></img>
            <p>
              <b id="username">{notification.name}</b>
              {handleAction(notification.action)}
              {notification.read ? null : <span id="red-circle"></span>}
              <br></br>
              <span id="timestamp">
                {timeAgo.format(new Date(notification.date).getTime())}
              </span>
            </p>
          </div>
          {notification.action.type === "message" ? (
            <div id="message-box">
              <p>{notification.action.target}</p>
            </div>
          ) : null}
        </div>
      );
    });
  }, [data]);

  function handleAction(action: INotification["action"]) {
    switch (action.type) {
      case "follow":
        return <>followed you</>;
      case "react":
        return (
          <>
            reacted to your recent post<a>{action.target}</a>
          </>
        );
      case "join":
        return (
          <>
            has joined your<a>{action.target}</a>
          </>
        );
      case "message":
        return <>Sent you a private message</>;
      case "comment":
        return <>commented on your picture</>;
      case "left":
        return (
          <>
            left the group<a>{action.target}</a>
          </>
        );
    }
  }
  return <>{notifications}</>;
}

export default Notifications;
