import { UserController } from "../controllers/UserController";
import { Route } from "../routes";

export const UserRoutes: Route[] = [
    {
        method: "get",
        route: "/users",
        controller: UserController,
        action: "get",
        roles: ["Admin"]
    },
    {
        method: "get",
        route: "/users/:id",
        controller: UserController,
        action: "getById"
    },
    {
        method: "post",
        route: "/users",
        controller: UserController,
        action: "add"
    },
    {
        method: "put",
        route: "/users",
        controller: UserController,
        action: "update"
    },
    {
        method: "delete",
        route: "/users/:id",
        controller: UserController,
        action: "delete"
    }
];