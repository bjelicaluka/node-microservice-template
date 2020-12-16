import { IController } from "./contracts/IController";
import { AlarmRecordRoutes } from "./routes/AlarmRecordRoutes";
import { AlarmSensorRoutes } from "./routes/AlarmSensorRoutes";
import { AlarmRoutes } from "./routes/AlarmRoutes";

export interface Route {
    method: string;
    route: string;
    controller: IController;
    action: string;
    roles?: string[];
};

export const Routes: Route[] = [];

// Attach All Routes
[
    AlarmRoutes,
    AlarmSensorRoutes,
    AlarmRecordRoutes
].forEach((routes: Route[]) => Routes.push(...routes))