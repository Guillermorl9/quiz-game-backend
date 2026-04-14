import "dotenv/config";
import Fastify from "fastify";
import questionRoutes from "./routes/questions";
import categoryRoutes from "./routes/categories";
import optionRoutes from "./routes/options";

const app = Fastify({ logger: true });

app.get("/health", async () => {
  return { status: "ok", message: "Quiz Game API running 🎮" };
});

app.register(questionRoutes, { prefix: "/questions" });
app.register(categoryRoutes, { prefix: "/categories" });
app.register(optionRoutes, { prefix: "/options" });

const start = async () => {
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
