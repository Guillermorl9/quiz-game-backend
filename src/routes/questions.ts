import { FastifyInstance } from "fastify";
import {
  getRandomQuestion,
  answerQuestion,
  createQuestion,
} from "../controllers/questions.controller";

export default async function questionRoutes(app: FastifyInstance) {
  app.post("/create", createQuestion);
  app.get("/random", getRandomQuestion);
  app.post("/:id/answer", answerQuestion);
}
