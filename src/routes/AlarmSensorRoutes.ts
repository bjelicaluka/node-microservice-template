import { AlarmSensorController } from "../controllers/AlarmSensorController";
import { Route } from "../routes";

export const AlarmSensorRoutes: Route[] = [
    {
        method: "get",
        route: "/alarm-sensors",
        controller: AlarmSensorController,
        action: "get",
        roles: ["Admin"]
    },
    {
        method: "get",
        route: "/alarm-sensors/:id",
        controller: AlarmSensorController,
        action: "getById"
    },
    {
        method: "post",
        route: "/alarm-sensors",
        controller: AlarmSensorController,
        action: "add"
    },
    {
        method: "put",
        route: "/alarm-sensors",
        controller: AlarmSensorController,
        action: "update"
    },
    {
        method: "delete",
        route: "/alarm-sensors/:id",
        controller: AlarmSensorController,
        action: "delete"
    }
];