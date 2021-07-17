import { TestController } from "../controllers/TestController";
import { Routes } from "../routes";
import { body } from 'express-validator';
import { TestEnum } from "../model/enum/TestEnum";

export const TestRoutes: Routes = {
  controller: TestController,
  routes: [
    /**
   * GET /tests
   * @tags Test
   * @summary Get all tests
   * @return {array<Test>} 200 - An array of test entities
   */
    {
      method: "get",
      route: "/tests",
      action: "get",
      roles: ["Admin"]
    },
    /**
   * GET /tests/{id}
   * @tags Test
   * @summary Get one test
   * @param {number} id.path - id
   * @return {Test} 200 - A single test entity
   * @return {Error} 404 - Entity with the given id not found
   */
    {
      method: "get",
      route: "/tests/:id",
      action: "getById"
    },
    /**
   * POST /tests
   * @tags Test
   * @summary Add new test
   * @param {Test} request.body.required - Test
   * @return {Test} 200 - Created test
   * @return {Error} 400 - Invalid data or entity with the given id already exists
   */
    {
      method: "post",
      route: "/tests",
      action: "add",
      validations: [
        body('id').not().exists(),
        body('name').not().isEmpty().exists(),
        body('numValue').isFloat(),
        body('enum').isInt().custom(v => [TestEnum.First, TestEnum.Second, TestEnum.Third].includes(v)),
        body('userGroupId').isUUID().withMessage("User group id must be a UUID.")
      ]
    },
    /**
   * PUT /tests/{id}
   * @tags Test
   * @summary Update existing test
   * @param {number} id.path - id
   * @param {Test} request.body.required - Test
   * @return {Test} 200 - Updated test
   * @return {Error} 404 - Entity with the given id not found
   * @return {Error} 400 - Invalid Entity
   */
    {
      method: "put",
      route: "/tests",
      action: "update",
      validations: [
        body('id').exists(),
        body('name').not().isEmpty().exists(),
        body('numValue').isFloat(),
        body('enum').isInt().custom(v => [TestEnum.First, TestEnum.Second, TestEnum.Third].includes(v)),
        body('userGroupId').isUUID().withMessage("User group id must be a UUID.")
      ]
    },
    /**
   * DELETE /tests/{id}
   * @tags Test
   * @summary Delete existing test
   * @param {number} id.path - id
   * @return {Test} 200 - Deleted test
   * @return {Error} 404 - Entity with the given id not found
   */
    {
      method: "delete",
      route: "/tests/:id",
      action: "delete"
    }
  ]
}