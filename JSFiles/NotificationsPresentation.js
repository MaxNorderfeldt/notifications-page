"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../styling/notifications.css");
function Notifications(props) {
    const { notificationsCounter, readAllNotifications, notifications } = props;
    return (react_1.default.createElement("section", { id: "notifications", className: "flex-container" },
        react_1.default.createElement("div", { className: "flex-header" },
            react_1.default.createElement("h2", null, "Notifications"),
            react_1.default.createElement("h2", { id: "notificationCounter" }, notificationsCounter),
            " ",
            react_1.default.createElement("button", { className: "right-aligned", onClick: readAllNotifications }, "Mark all as read")),
        notifications));
}
exports.default = Notifications;
