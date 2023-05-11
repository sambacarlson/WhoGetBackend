if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import express from "express";
import mongoose from "mongoose";
import askRouter from "./routes/askRoutes";
import userRouter from "./routes/userRoutes";
import { log_message } from "./utilities/envSpecificHelpers";
import cors from 'cors';

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
const allowedOrigins = ['http://localhost:3000', 'https://localhost:/3000', 'https://whoget-admin.vercel.app/'];
app.use(cors({
  // origin: function (origin, callback) {
  //   if (!origin || allowedOrigins.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error('Not allowed by CORS policy set at whoget-api server'));
  //   }
  // }
  'origin': allowedOrigins
}));

//routes
app.use("/api/users", userRouter);
app.use("/api/asks", askRouter);

/** all unknown routes return  list of endpoints */
app.use("/api", (req, res) => {
  const endpoints = {
    "/": "list of all endpoints",
    "/users": "json of all users",
    "get(/users/:id)": "get one user",
    "/asks": "json of all exercise",
    "/asks/:id": "create/update/delete an ask",
    "post(/users/:id)": "create/update a user",
    "docs": "https://github.com/sambacarlson/WhoGetBackend",
  };
  res.status(303).json(endpoints);
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: '404 not found' });
});
