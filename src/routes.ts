import { IController } from "./contracts/IController";
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
    AlarmRoutes
].forEach((routes: Route[]) => Routes.push(...routes))