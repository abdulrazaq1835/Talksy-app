import cookieparser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import { ConnectDB } from "./lib/db.js";

import { app, server } from "./lib/socket.js";

import path from "path"

dotenv.config();
const PORT = process.env.PORT;
const __dirname =  path.resolve()


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

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html")
    )
  })
}
//
server.listen(PORT, () => {
  console.log("My server is running on port: " + PORT);

  ConnectDB();
});
