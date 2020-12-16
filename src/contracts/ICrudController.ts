import { NextFunction, Request, Response } from "express";
import { IController } from "./IController";


export interface ICrudController extends IController {
  
  get(request: Request, response: Response, next: NextFunction);

  getById(request: Request, response: Response, next: NextFunction);

  add(request: Request, response: Response, next: NextFunction);

  update(request: Request, response: Response, next: NextFunction);

  delete(request: Request, response: Response, next: NextFunction);

};