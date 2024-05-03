import express from "express";
import user from "./routes/user.js";
import posts from './routes/posts.js';
import pg from "pg";
import env from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

env.config();
const app = express();

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser())
app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
});

//routes
app.use("/",user);
app.use("/",posts);

//dbConnection
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
  db.connect()
  .then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Connected to DB and listening on port ${process.env.PORT}`);
        })
    })
    .catch((err)=>{
        console.log(err);
    });

    export {db};