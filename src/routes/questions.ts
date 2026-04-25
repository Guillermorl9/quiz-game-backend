import { FastifyInstance } from "fastify";
import {
  getRandomQuestion,
  answerQuestion,
  createQuestion,
  updateQuestion,
  getQuestionById,
} from "../controllers/questions.controller";

export default async function questionRoutes(app: FastifyInstance) {
  app.get("/:id", getQuestionById);
  app.get("/random", getRandomQuestion);
  app.post("/create", createQuestion);
  app.post("/:id/answer", answerQuestion);
  app.put("/:id", updateQuestion);
}
