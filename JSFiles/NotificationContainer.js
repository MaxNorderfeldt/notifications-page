"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("../styling/notifications.css");
const NotificationsPresentation_1 = __importDefault(require("./NotificationsPresentation"));
const javascript_time_ago_1 = __importDefault(require("javascript-time-ago"));
const en_1 = __importDefault(require("javascript-time-ago/locale/en"));
function NotificationContainer() {
    const [data, setData] = (0, react_1.useState)([]);
    const notifications = (0, react_1.useMemo)(() => {
        javascript_time_ago_1.default.addLocale(en_1.default);
        const timeAgo = new javascript_time_ago_1.default("en-US");
        return data.map((notification) => {
            let avatarUrl = "assets/images/avatar-" +
                notification.name.split(/[ ]/)[0] +
                "-" +
                notification.name.split(/[ ]/)[1] +
                ".webp";
            return (react_1.default.createElement("div", { className: "notification" + (notification.read ? " read" : " unread"), key: notification.name + notification.date },
                react_1.default.createElement("div", { className: "flex-container", id: "notification-info" },
                    react_1.default.createElement("img", { src: avatarUrl.toLowerCase(), alt: notification.name, id: "avatar-image" }),
                    react_1.default.createElement("p", null,
                        react_1.default.createElement("b", { id: "username" }, notification.name),
                        handleAction(notification.action),
                        notification.read ? null : react_1.default.createElement("span", { id: "red-circle" }),
                        react_1.default.createElement("br", null),
                        react_1.default.createElement("span", { id: "timestamp" }, timeAgo.format(new Date(notification.date).getTime())))),
                notification.action.type === "message" ? (react_1.default.createElement("div", { id: "message-box" },
                    react_1.default.createElement("p", null, notification.action.target))) : null));
        });
    }, [data]);
    function handleAction(action) {
        switch (action.type) {
            case "follow":
                return react_1.default.createElement(react_1.default.Fragment, null, "followed you");
            case "react":
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    "reacted to your recent post",
                    react_1.default.createElement("a", null, action.target)));
            case "join":
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    "has joined your",
                    react_1.default.createElement("a", null, action.target)));
            case "message":
                return react_1.default.createElement(react_1.default.Fragment, null, "Sent you a private message");
            case "comment":
                return react_1.default.createElement(react_1.default.Fragment, null, "commented on your picture");
            case "left":
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    "left the group",
                    react_1.default.createElement("a", null, action.target)));
        }
    }
    const notificationsCounter = (0, react_1.useMemo)(() => {
        let counter = 0;
        data.forEach((Notification) => {
            if (!Notification.read) {
                counter++;
            }
        });
        return counter;
    }, [data]);
    (0, react_1.useEffect)(() => {
        function fetchNotifications() {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch("./data/notifications.json");
                const json = yield response.json();
                setData(json);
            });
        }
        fetchNotifications();
    }, []);
    function readAllNotifications() {
        setData(data.map((arr) => (Object.assign(Object.assign({}, arr), { read: true }))));
    }
    return (react_1.default.createElement(NotificationsPresentation_1.default, { notificationsCounter: notificationsCounter, readAllNotifications: readAllNotifications, notifications: notifications }));
}
exports.default = NotificationContainer;
