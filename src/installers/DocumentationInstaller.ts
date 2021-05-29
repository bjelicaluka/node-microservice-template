import path from 'path';
import { Application } from "express";
import expressJSDocSwagger, {Options} from 'express-jsdoc-swagger'
import { inject, injectable } from "inversify";
import { IInstaller } from "./contracts/IInstaller";
import { DOC_PATH } from "../config";

/**
 * Error
 * @typedef {object} Error
 * @property {string} message - The error message
 */

const options: Options = {
    info: {
      version: '1.0.0',
      title: 'Node Microservice Template',
      description: 'Description',
      license: {
        name: 'MIT',
      },
    },
    security: {
      BasicAuth: {
        type: 'http',
        scheme: 'basic',
      },
    },
    baseDir: path.resolve(__dirname, '../'),
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: ['./**/*.*s'],
    // URL where SwaggerUI will be rendered
    swaggerUIPath: DOC_PATH,
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    // Expose Open API JSON Docs documentation in `apiDocsPath` path.
    exposeApiDocs: false,
    // Open API JSON Docs endpoint.
    apiDocsPath: DOC_PATH,
    // Set non-required fields as nullable by default
    notRequiredAsNullable: false,
    // You can customize your UI options.
    // you can extend swagger-ui-express config. You can checkout an example of this
    // in the `example/configuration/swaggerOptions.js`
    swaggerUiOptions: {},
  };

@injectable()
export class DocumentationInstaller implements IInstaller {
    private app: Application;

    constructor(@inject("Application") app: Application) {
        this.app = app;
    }

    install(): void {
      expressJSDocSwagger(this.app)(options);
    }

}