import { FastifyInstance } from "fastify";
import {
  getRandomQuestion,
  answerQuestion,
  createQuestion,
  updateQuestion,
  getQuestionById,
  deleteQuestion,
} from "../controllers/questions.controller";

export default async function questionRoutes(app: FastifyInstance) {
  app.post("/create", createQuestion);
  app.get("/:id", getQuestionById);
  app.get("/random", getRandomQuestion);
  app.put("/:id", updateQuestion);
  app.delete("/:id", deleteQuestion);
  app.post("/:id/answer", answerQuestion);
}
