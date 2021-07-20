import { IController } from "./controllers/contracts/IController";
import { TestRoutes } from "./routes/TestRoutes"
import { ValidationChain } from 'express-validator';
import { NamespaceRoutes } from "./routes/NamespaceRoutes";

export interface Routes {
    controller: IController;
    routes: Route[];
}

export interface Route {
    method: string;
    route: string;
    action: string;
    roles?: string[];
    middleware?: Function[];
    validations?: ValidationChain[];
};

export const Routes: Routes[] = [
    TestRoutes,
    NamespaceRoutes,
];