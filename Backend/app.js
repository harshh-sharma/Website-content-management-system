import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import websiteRouter from "./routes/websiteRoutes.js";
import contentRouter from "./routes/contentRoutes.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: '*',
}));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/",(req,res) => {
    res.json("hello");
});

app.use("/api/v1/user",userRouter);
app.use("/api/v1/domain",websiteRouter);
app.use("/api/v1/domain/content",contentRouter);

app.all("*",(req,res) => {
    res.status(404).send("404 OOPS!! Page not found");
})


export default app;