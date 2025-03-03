import express from "express";
import { config } from "dotenv";
import morgan from 'morgan';
config();
const app = express();
//middlewares
app.use(express.json());
app.use(morgan("dev")); //remove it in production
app.use("api/v1");
export default app;
//# sourceMappingURL=app.js.map