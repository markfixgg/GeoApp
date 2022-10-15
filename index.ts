import bodyParser from "body-parser";
import express from 'express';
import routes from "./routes";
import cors from 'cors';
import database from "./modules/database";
import config from "./config";
import * as path from "path";

const app = express();

const front = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

front.use('/static', express.static('./build/static'));
front.use('/css', express.static('./build/css'));
front.use('/fonts', express.static('./build/fonts'));
front.use('/font-awesome', express.static('./build/font-awesome'));

front.all('*', (req, res) => {
    res.sendFile(path.resolve('./build/index.html'))
});

routes(app);

(async () => {
    await database(config.mongoURL);

    app.listen(3000, () => console.log(`Back started on port 3000`));
    front.listen(3001, () => console.log(`Front started on port 3001`));
})()


