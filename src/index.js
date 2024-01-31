import dotenv from "dotenv";
import connecToDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config();

const port = process.env.PORT || 3000;
connecToDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error: ", error);
      throw error;
    });
    app.listen(port, () => {
      console.log(`App running at port: ${port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });

export default app;
