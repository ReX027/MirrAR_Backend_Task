import express from "express";
// import cors from "cors";
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//routes import
import productRouter from "./routes/product.route.js";
app.use("/api/product", productRouter);
export { app };
