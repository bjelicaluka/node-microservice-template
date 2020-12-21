import { IController } from "./contracts/IController";
import { AlarmRecordRoutes } from "./routes/AlarmRecordRoutes";
import { AlarmSensorRoutes } from "./routes/AlarmSensorRoutes";
import { AlarmRoutes } from "./routes/AlarmRoutes";

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
    AlarmRecordRoutes
];