import { AlarmController } from "../controllers/AlarmController";
import { Route } from "../routes";

export const AlarmRoutes: Route[] = [
    {
        method: "get",
        route: "/alarms",
        controller: AlarmController,
        action: "get",
        roles: ["Admin"]
    },
    {
        method: "get",
        route: "/alarms/:id",
        controller: AlarmController,
        action: "getById"
    },
    {
        method: "post",
        route: "/alarms",
        controller: AlarmController,
        action: "add"
    },
    {
        method: "put",
        route: "/alarms",
        controller: AlarmController,
        action: "update"
    },
    {
        method: "delete",
        route: "/alarms/:id",
        controller: AlarmController,
        action: "delete"
    }
];