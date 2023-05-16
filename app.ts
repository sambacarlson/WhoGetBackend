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

//cors
const allowedOrigins = [
  "http://127.0.0.1:3000",
  "https://whoget-admin.vercel.app",
  "https://whoget-admin-sambacarlson.vercel.app",
  "https://whoget-admin-git-dev-sambacarlson.vercel.app",
];
const allowedMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
app.use(
  cors({
    origin: allowedOrigins,
    methods: allowedMethods,
  })
);

//routes
app.use("/api/users", userRouter);
app.use("/api/asks", askRouter);

/** all unknown routes return  list of endpoints */
app.use("/api", (req, res) => {
  const endpoints = {
    "/asks/": "[post]create an ask",
    "/users/": "[put]create/update a user",
    "/asks/:id": "[patch, delete]update/delete an ask",
    "/asks?categories=''&showHidden=": "[get]fetch spcific asks",
    "/users/:id": "[get]get a particular user.can be userAuth or userDB ids",
    '"repo"': "https://github.com/sambacarlson/WhoGetBackend",
  };
  res.status(303).json(endpoints);
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: "404 not found" });
});
