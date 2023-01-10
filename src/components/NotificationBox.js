import React, { useState, useEffect } from "react";
import "../styling/small.css";
import "../styling/notifications.css";

// importing the javascript-time-ago module
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en"; //This is because we want our display in english format

function NotificationBox(props) {
  const [data, setData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [countNotifications, setCountNotifications] = useState(0);

  function readAll() {
    setData(data.map((arr) => ({ ...arr, read: true })));
  }

  function handleAction(action) {
    switch (action.type) {
      case "follow":
        return <> followed you</>;
      case "react":
        return (
          <>
            reacted to your recent post <a>{action.target}</a>
          </>
        );
      case "join":
        return (
          <>
            has joined your <a>{action.target}</a>
          </>
        );
      case "message":
        return <>Sent you a private message</>;
      case "comment":
        return <>commented on your picture</>;
      case "left":
        return (
          <>
            left the group <a>{action.target}</a>
          </>
        );
      default:
        break;
    }

    return "test";
  }

  function printMessage(action) {
    if (action.type === "message") {
      return <p>{action.target}</p>;
    }
  }

  useEffect(() => {
    let counter = 0;
    data.forEach((arr) => {
      if (!arr.read) {
        counter++;
      }
    });
    setCountNotifications(counter);

    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
    setNotifications(
      data.map((notification) => {
        let avatarUrl =
          "assets/images/avatar-" +
          notification.name.split(/[ ]/)[0] +
          "-" +
          notification.name.split(/[ ]/)[1] +
          ".webp";
        return (
          <section
            className={
              "notification" + (notification.read ? " read" : " unread")
            }
          >
            <div className="main-text">
              <img
                src={require(avatarUrl)}
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
            <div id="message-box">{printMessage(notification.action)}</div>
          </section>
        );
      })
    );
  }, [data]);

  async function fetchJson() {
    const response = await fetch("./data/notifications.json");
    const json = await response.json().then(console.log(data));
    setData(json);
  }

  useEffect(() => {
    fetchJson();
  }, []);

  return (
    <section id="notifications">
      <h2>Notifications</h2>
      <h2 id="notificationCounter">{countNotifications}</h2>
      <button className="right-aligned" onClick={readAll}>
        Mark all as read
      </button>
      {notifications}
    </section>
  );
}
export default NotificationBox;
