import { Express, NextFunction, Request, Response } from "express";
import controllers from "./controllers";
import config from "./config";

const authorization = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers["Authorization"]) return res.status(403).send("Missing auth token");
    if (req.headers["Authorization"] !== config.authToken) return res.status(403).send("Incorrect token");

    // Temporary solution, basic auth will be implemented

    return next();
}

export default function (app: Express) {
    app.use((req, res, next) => {
        console.log({ url: req.url, params: req.params, query: req.query })

        return next()
    })

    // I am used GET methods, because had some troubles while creating POST/PUT requests from Kotlin
    // Better to use put (updating) and post (create)
    app.get('/mobile/create/:name', controllers.MobileController.create);
    app.get('/mobile/:name', controllers.MobileController.get)
    app.get('/mobile/:name/coordinates', controllers.MobileController.change_coordinates);
    app.get('/mobile/:name/group/:groupName', controllers.MobileController.change_group);

    // For frontend
    app.get('/web/devices', controllers.WebController.DeviceController.get)

    app.get('/web/groups', controllers.WebController.GroupController.get)
    app.post('/web/groups', controllers.WebController.GroupController.create)
    app.delete('/web/groups/:name', controllers.WebController.GroupController.delete)
}