if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import express from "express";
import mongoose from "mongoose";
import askRouter from "./routes/askRoutes";
import userRouter from "./routes/userRoutes";
import { log_message } from "./utilities/envSpecificHelpers";
import cors from "cors";

// const environment = process.env
// console.log(environment.NODE_ENV);

const app = express();
//cors
app.use(cors({
  origin: '*',
  methods: '*'
}));
//connect to db and listen to changes
const DB_URI: string = process.env.DB_URI ? process.env.DB_URI : "";
const PORT = process.env.PORT;
mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(PORT);
    log_message(`listening on ${PORT}`);
  })
  .catch((error) => {
    log_message(`error: ${error.message}`);
  });

app.use(express.json());

//routes
app.use("/api/users", userRouter);
app.use("/api/asks", askRouter);

/** all unknown routes return  list of endpoints */
app.use("/api", (req, res) => {
  const endpoints = {
    info: "all endpoints you can use will be published here. Soon"
  };
  res.status(303).json(endpoints);
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: "404 not found" });
});
