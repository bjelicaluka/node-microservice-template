import { IController } from "./controllers/contracts/IController";
import { TestRoutes } from "./routes/TestRoutes"
import { ValidationChain } from 'express-validator';

export interface Routes {
    controller: IController;
    routes: Route[];
}

interface Route {
    method: string;
    route: string;
    action: string;
    roles?: string[];
    validations?: ValidationChain[];
};

export const Routes: Routes[] = [
    TestRoutes,
];