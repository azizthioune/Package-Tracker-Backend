import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import packagesRoutes from "./routes/packages.routes";
import deliveriesRoutes from "./routes/deliveries.routes";
import * as http from "http";
import * as WebSocket from "ws";
import {
  updateDeliveryLocation,
  updateDeliveryStatus,
} from "./services/delivery/updateDelivery.service";

dotenv.config();

const app: Express = express();
const server = http.createServer(app);
const cors = require("cors");
const port = process.env.PORT;

require("./db");

app.use(cors());
app.use(express.json());

export const wss = new WebSocket.Server({ server });

wss.on("connection", (ws: WebSocket) => {
  console.log("A new client Connected!");

  ws.on("message", (message: string) => {
    const receivedMessage = JSON.parse(message);
    if (receivedMessage?.event === "UPDATE_LOCATION") {
      console.log({ receivedMessage });
      updateDeliveryLocation(
        receivedMessage?.id,
        receivedMessage?.location
      ).then((res) => {
        if (res?.code === 200) {
          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(res?.data));
            }
          });
        }
      });
    }
    if (receivedMessage?.event === "UPDATE_STATUS") {
      console.log({ receivedMessage });
      updateDeliveryStatus(receivedMessage?.id, receivedMessage?.status).then(
        (res) => {
          if (res?.code === 200) {
            wss.clients.forEach((client) => {
              if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(res?.data));
              }
            });
            ws.send("STATUS_UPDATED");
          }
        }
      );
    }
  });

  //ws.send("Hi there, I am a WebSocket server");
});

app.use("/api/packages", packagesRoutes);
app.use("/api/deliveries", deliveriesRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
