import cookieparser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import { ConnectDB } from "./lib/db.js";

import { app, server } from "./lib/socket.js";

dotenv.config();
const PORT = process.env.PORT;



app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieparser());

app.use("/api/auth", authRoutes);

app.use("/api/messages", messageRoutes);
//
server.listen(PORT, () => {
  console.log("My server is running on port: " + PORT);

  ConnectDB();
});
