import { AlarmController } from "../controllers/AlarmController";
import { Routes } from "../routes";

export const AlarmRoutes: Routes = {
  controller: AlarmController,
  routes: [
    {
      method: "get",
      route: "/alarms",
      action: "get",
      roles: ["Admin"]
    },
    {
      method: "get",
      route: "/alarms/:id",
      action: "getById"
    },
    {
      method: "post",
      route: "/alarms",
      action: "add"
    },
    {
      method: "put",
      route: "/alarms",
      action: "update"
    },
    {
      method: "delete",
      route: "/alarms/:id",
      action: "delete"
    }
  ]
}