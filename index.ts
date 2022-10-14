import bodyParser from "body-parser";
import express from 'express';
import routes from "./routes";
import cors from 'cors';
import database from "./modules/database";
import config from "./config";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

(async () => {
    await database(config.mongoURL);

    app.listen(3000, () => console.log(`App started on port 3000`));
})()


