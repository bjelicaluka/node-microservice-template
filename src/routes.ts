import { IController } from "./contracts/IController";
import { UserRoutes } from "./routes/UserRoutes";

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
    UserRoutes
].forEach((routes: Route[]) => Routes.push(...routes))