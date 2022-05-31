"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const environment_1 = require("../environment");
const mongoose = require("mongoose");
const users_1 = require("../routes/users");
const common_routes_1 = require("../routes/common_routes");
class App {
    constructor() {
        this.mongoUrl = `mongodb+srv://` + environment_1.default.getDBName();
        this.user_routes = new users_1.UserRoutes();
        this.common_routes = new common_routes_1.CommonRoutes();
        this.app = express();
        this.config();
        this.mongo();
        this.user_routes.route(this.app);
        this.common_routes.route(this.app);
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongo() {
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('Mongo Connection Established');
        });
        connection.on('reconnected', () => {
            console.log('Mongo Connection Reestablished');
        });
        connection.on('disconnected', () => {
            console.log('Mongo Connection Disconnected');
            console.log('Trying to reconnect to Mongo ...');
            setTimeout(() => {
                mongoose.connect(this.mongoUrl, {
                    keepAlive: true,
                    socketTimeoutMS: 3000,
                    connectTimeoutMS: 3000,
                });
            }, 3000);
        });
        connection.on('close', () => {
            console.log('Mongo Connection Closed');
        });
        connection.on('error', (error) => {
            console.log('Mongo Connection ERROR: ' + error);
        });
        const run = () => __awaiter(this, void 0, void 0, function* () {
            yield mongoose.connect(this.mongoUrl, {
                keepAlive: true,
            });
        });
        run().catch((error) => console.error(error));
    }
}
exports.default = new App().app;
