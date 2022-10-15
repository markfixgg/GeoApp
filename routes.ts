import { Express } from "express";
import { expressjwt } from "express-jwt";
import controllers from "./controllers";
import config from "./config";
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
    app.post('/web/login', controllers.AuthController.login);

    app.get('/web/devices', expressjwt({ secret: config.JWTSecret, algorithms: ["HS256"] }), controllers.WebController.DeviceController.get)

    app.get('/web/groups', controllers.WebController.GroupController.get)
    app.post('/web/groups', expressjwt({ secret: config.JWTSecret, algorithms: ["HS256"] }), controllers.WebController.GroupController.create)
    app.delete('/web/groups/:name', expressjwt({ secret: config.JWTSecret, algorithms: ["HS256"] }), controllers.WebController.GroupController.delete)
}