import { AlarmCheckerController } from "../controllers/AlarmCheckerController";
import { Routes } from "../routes";

export const AlarmCheckerRoutes: Routes = {
  controller: AlarmCheckerController,
  routes: [
    {
      method: "post",
      route: "/alarms/check",
      action: "checkForAlarms"
    },
  ]
}