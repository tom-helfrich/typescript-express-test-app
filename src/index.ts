import App from "./app";
import * as http from "http";
import * as dotenv from "dotenv";
import { Logger } from "./utils/logger";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const port: number = parseInt(process.env.PORT as string, 10);

App.set("port", port);
const server = http.createServer(App);
server.listen(port);

const logger = new Logger();

server.on("listening", function (): void {
  let addr = server.address();
  let bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
  logger.info(`Listening on ${bind}`);
});

module.exports = App;
