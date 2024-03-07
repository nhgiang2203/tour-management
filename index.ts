import express, { Express } from 'express';
import dotenv from 'dotenv';
import moment from 'moment';
import bodyParser from 'body-parser';
import { systemConfig } from './config/system';
import path from "path";

import adminRoutes from "./routes/admin/index.route";
import clientRoutes  from "./routes/client/index.route";

dotenv.config();


const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE

//App local variables
app.locals.moment = moment;
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Admin routes
adminRoutes(app);

//Client routes
clientRoutes(app);

app.use(express.static(`${__dirname}/public`));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
