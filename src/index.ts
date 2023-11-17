import * as express from "express";
import * as bodyParser from "body-parser";
import "dotenv/config";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import cors = require("cors");

const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    const allowedOrigins = ["http://localhost:3000"];

    const options: cors.CorsOptions = {
      origin: allowedOrigins,
    };

    app.use(cors(options));

    app.use(bodyParser.json());

    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );

          console.log(
            "Request Made: ",
            req.method,
            req.url,
            req.body,
            req.params,
            req.query
          );

          if (result instanceof Promise) {
            result.then((result) => {
              return result !== null && result !== undefined
                ? result.send()
                : undefined;
            });
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    app.listen(PORT);

    console.log(`Express server has started on port ${PORT}.`);
  })
  .catch((error) => console.log(error));
