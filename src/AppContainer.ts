import 'reflect-metadata'
import express from "express";
import { Application } from 'express';
import { Server } from 'http';
import { Container } from 'inversify';
import { IInstaller } from "./installers/contracts/IInstaller";
import { MiddlewareInstaller } from "./installers/MiddlewareInstaller";
import { RoutesInstaller } from "./installers/RoutesInstaller";
import { UserServiceProxy } from "./services/implementation/proxy/UserServiceProxy";
import { TestController } from './controllers/TestController';
import { DocumentationInstaller } from './installers/DocumentationInstaller';
import { DataSourceInstaller } from './installers/DataSourceInstaller';
import { IUserService } from './services/contracts/proxy/IUserService';
import { TestService } from './services/implementation/TestService';
import { ITestService } from './services/contracts/ITestService';
import { RemoteCacheInstaller } from './installers/RemoteCacheInstaller';
import { EventDispatcherInstaller } from './installers/EventDispatcherInstaller';

const AppContainer = new Container();

// AppContainer
AppContainer.bind<Container>("AppContainer").toConstantValue(AppContainer);

// Application and Server
AppContainer.bind<Application>("Application").toConstantValue(express());
AppContainer.bind<Server>(Server).toConstantValue(new Server(AppContainer.get<Application>("Application")));

// Installers
AppContainer.bind<IInstaller>("IInstaller").to(MiddlewareInstaller);
AppContainer.bind<IInstaller>("IInstaller").to(DocumentationInstaller);
AppContainer.bind<IInstaller>("IInstaller").to(DataSourceInstaller);
AppContainer.bind<IInstaller>("IInstaller").to(RemoteCacheInstaller);
AppContainer.bind<IInstaller>("IInstaller").to(EventDispatcherInstaller);
AppContainer.bind<IInstaller>("IInstaller").to(RoutesInstaller);

// Services
AppContainer.bind<ITestService>("ITestService").to(TestService).inRequestScope();

// Proxy Services 
AppContainer.bind<IUserService>("IUserService").to(UserServiceProxy).inRequestScope();

// Controllers
AppContainer.bind<TestController>(TestController).toSelf();


export { AppContainer };