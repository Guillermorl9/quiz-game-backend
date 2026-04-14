import { FastifyInstance } from "fastify";
import { getAllOptions } from "../services/options.service";

export default async function optionRoutes(app: FastifyInstance) {
  app.get("/all", getAllOptions);
}
