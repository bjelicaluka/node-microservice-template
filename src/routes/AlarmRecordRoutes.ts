import { AlarmRecordController } from "../controllers/AlarmRecordController";
import { Routes } from "../routes";

export const AlarmRecordRoutes: Routes = {
  controller: AlarmRecordController,
  routes: [
    {
      method: "get",
      route: "/alarm-records",
      action: "get",
      roles: ["Admin"]
    },
    {
      method: "get",
      route: "/alarm-records/:id",
      action: "getById"
    },
    {
      method: "post",
      route: "/alarm-records",
      action: "add"
    },
    {
      method: "put",
      route: "/alarm-records",
      action: "update"
    },
    {
      method: "delete",
      route: "/alarm-records/:id",
      action: "delete"
    }
  ]
}