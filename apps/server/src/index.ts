import { Hono } from "hono";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
const app = new Hono();

app.use("/ping", logger());
app.get("/ping", (c) => c.json({ ping: "pong" }, 200));

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const isDev = process.env.NODE_ENV === "development";
const port = 8000;

if (isDev) showRoutes(app, { verbose: true, colorize: true });

console.log(`Starting server on port ${port}`);

const server = { port, fetch: app.fetch };

export default server;
