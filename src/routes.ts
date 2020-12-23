import { IController } from "./contracts/controllers/IController";
import { AlarmRecordRoutes } from "./routes/AlarmRecordRoutes";
import { AlarmSensorRoutes } from "./routes/AlarmSensorRoutes";
import { AlarmRoutes } from "./routes/AlarmRoutes";
import { AlarmCheckerRoutes } from "./routes/AlarmCheckerRoutes";

export interface Routes {
    controller: IController;
    routes: Route[];
}

interface Route {
    method: string;
    route: string;
    action: string;
    roles?: string[];
};

export const Routes: Routes[] = [
    AlarmRoutes,
    AlarmSensorRoutes,
    AlarmRecordRoutes,
    AlarmCheckerRoutes,
];