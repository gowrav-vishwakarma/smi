import * as express from "express";
import * as bodyParser from "body-parser";
import environment from '../environment';
import * as mongoose from 'mongoose';
import {UserRoutes} from '../routes/users';
import {CommonRoutes} from '../routes/common_routes'

class App {
   public app: express.Application;

   public mongoUrl: string = `mongodb+srv://`+environment.getDBName();

   private user_routes: UserRoutes = new UserRoutes();
   private common_routes: CommonRoutes = new CommonRoutes();

   constructor() {
      this.app = express();
      this.config();
      this.mongo();
      this.user_routes.route(this.app)
      this.common_routes.route(this.app)
   }
private config(): void {
      // support application/json type post data
      this.app.use(bodyParser.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));
   }

  

   private mongo() {
      const connection = mongoose.connection
      connection.on('connected', () => {
        console.log('Mongo Connection Established')
      })
      connection.on('reconnected', () => {
        console.log('Mongo Connection Reestablished')
      })
      connection.on('disconnected', () => {
        console.log('Mongo Connection Disconnected')
        console.log('Trying to reconnect to Mongo ...')
        setTimeout(() => {
          mongoose.connect(this.mongoUrl, {
            keepAlive: true,
            socketTimeoutMS: 3000,
            connectTimeoutMS: 3000,
          })
        }, 3000)
      })
      connection.on('close', () => {
        console.log('Mongo Connection Closed')
      })
      connection.on('error', (error: Error) => {
        console.log('Mongo Connection ERROR: ' + error)
      })
  
      const run = async () => {
        await mongoose.connect(this.mongoUrl, {
          keepAlive: true,
        })
      }
      run().catch((error) => console.error(error))
    }
}
export default new App().app;