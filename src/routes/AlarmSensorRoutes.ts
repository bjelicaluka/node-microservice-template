import { AlarmSensorController } from "../controllers/AlarmSensorController";
import { Routes } from "../routes";

export const AlarmSensorRoutes: Routes = {
  controller: AlarmSensorController,
  routes: [
    {
      method: "get",
      route: "/alarm-sensors",
      action: "get",
      roles: ["Admin"]
    },
    {
      method: "get",
      route: "/alarm-sensors/:id",
      action: "getById"
    },
    {
      method: "post",
      route: "/alarm-sensors",
      action: "add"
    },
    {
      method: "put",
      route: "/alarm-sensors",
      action: "update"
    },
    {
      method: "delete",
      route: "/alarm-sensors/:id",
      action: "delete"
    }
  ]
}