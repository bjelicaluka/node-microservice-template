import path from 'path';
import { Application } from "express";
import expressJSDocSwagger, {Options} from 'express-jsdoc-swagger'
import { inject, injectable } from "inversify";
import { IInstaller } from "./contracts/IInstaller";
import { API_INFO, DOC_INFO, DOC_PATH } from '../config';

/**
 * Error
 * @typedef {object} Error
 * @property {string} message - The error message
 */

const options: Options = {
    info: {
      version: 'v1',
      title: 'Node Microservice Template',
      description: '',
    },
    security: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    baseDir: path.resolve(__dirname, '../'),
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: ['./**/*.*s'],
    // URL where SwaggerUI will be rendered
    swaggerUIPath: DOC_PATH,
    servers: [{url: `${API_INFO.API_PROTOCOL}://${API_INFO.API_HOSTNAME}:${API_INFO.API_PORT}${API_INFO.API_PREFIX}`, description: ''}],
    // Expose OpenAPI UI
    exposeSwaggerUI: DOC_INFO.EXPOSE_SWAGGER_UI,
    // Expose Open API JSON Docs documentation in `apiDocsPath` path.
    exposeApiDocs: DOC_INFO.EXPOSE_API_DOCS,
    // Open API JSON Docs endpoint.
    apiDocsPath: '/swagger/v1/swagger.json',
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