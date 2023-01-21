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
// @ts-ignore
const Notifications_1 = __importDefault(require("./Notifications"));
function NotificationBox() {
    const [data, setData] = (0, react_1.useState)([]);
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
    return (react_1.default.createElement("section", { id: "notifications", className: "flex-container" },
        react_1.default.createElement("div", { className: "flex-header" },
            react_1.default.createElement("h2", null, "Notifications"),
            react_1.default.createElement("h2", { id: "notificationCounter" }, notificationsCounter),
            " ",
            react_1.default.createElement("button", { className: "right-aligned", onClick: readAllNotifications }, "Mark all as read")),
        react_1.default.createElement(Notifications_1.default, { data: data })));
}
exports.default = NotificationBox;
