import { NamespaceController } from "../controllers/NamespaceController";
import { UserGroupSpecificMiddleware } from "../middleware/SecurityMiddleware";
import { Routes } from "../routes";

/**
 * NamespaceInfo
 * @typedef {object} NamespaceInfo
 * @property {string} namespace.required - The namespace name
 */
export const NamespaceRoutes: Routes = {
  controller: NamespaceController,
  routes: [
    /**
   * POST /groups/{userGroupId}/namespaces
   * @tags Namespaces
   * @summary Creates a new live data namespace
   * @param {string} userGroupId.path.required - User Group ID
   * @param {NamespaceInfo} request.body.required - NamespaceInfo
   * @return {object} 200 - Created namespace
   */
    {
      method: "post",
      route: "/groups/:userGroupId/namespaces",
      action: "createNamespace",
      middleware: [
        UserGroupSpecificMiddleware(),
      ],
    },
  ]
}