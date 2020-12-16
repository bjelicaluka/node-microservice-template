import { AlarmRecordController } from "../controllers/AlarmRecordController";
import { Route } from "../routes";

export const AlarmRecordRoutes: Route[] = [
    {
        method: "get",
        route: "/alarm-records",
        controller: AlarmRecordController,
        action: "get",
        roles: ["Admin"]
    },
    {
        method: "get",
        route: "/alarm-records/:id",
        controller: AlarmRecordController,
        action: "getById"
    },
    {
        method: "post",
        route: "/alarm-records",
        controller: AlarmRecordController,
        action: "add"
    },
    {
        method: "put",
        route: "/alarm-records",
        controller: AlarmRecordController,
        action: "update"
    },
    {
        method: "delete",
        route: "/alarm-records/:id",
        controller: AlarmRecordController,
        action: "delete"
    }
];