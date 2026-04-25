import { FastifyRequest, FastifyReply } from "fastify";
import * as questionsService from "../services/questions.service";

interface CreateQuestionInput {
  text: string;
  difficulty: string;
  categoryId: number;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
}

export interface UpdateQuestionInput {
  text: string;
  difficulty: string;
  categoryId: number;
}

export const createQuestion = async (
  request: FastifyRequest<{
    Body: CreateQuestionInput;
  }>,
  reply: FastifyReply,
) => {
  const data = request.body;

  const result = await questionsService.createQuestion(data);
  if (!result) {
    return reply
      .status(500)
      .send({ error: "No se ha podido crear la pregunta" });
  }

  return reply.send(result);
};

export const getQuestionById = async (
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply,
) => {
  const id = parseInt(request.params.id);

  const result = await questionsService.getQuestionById(id);
  if (!result) {
    return reply.status(500).send({ error: "NO hay preguntas disponibles" });
  }

  return reply.send(result);
};

export const getRandomQuestion = async (
  request: FastifyRequest<{
    Querystring: { categoryId?: string; difficulty?: string };
  }>,
  reply: FastifyReply,
) => {
  const { categoryId, difficulty } = request.query;

  const question = await questionsService.getRandomQuestion(
    categoryId ? parseInt(categoryId) : undefined,
    difficulty,
  );

  if (!question) {
    return reply.status(404).send({ error: "No hay preguntas disponibles" });
  }

  return reply.send(question);
};

export const updateQuestion = async (
  request: FastifyRequest<{
    Body: UpdateQuestionInput;
    Params: { id: string };
  }>,
  reply: FastifyReply,
) => {
  const id = parseInt(request.params.id);
  const data = request.body;

  const result = await questionsService.updateQuestion({ id, ...data });
  if (!result) {
    return reply
      .status(500)
      .send({ error: "No se ha podido crear la pregunta" });
  }

  return reply.send(result);
};

export const deleteQuestion = async (
  request: FastifyRequest<{
    Params: { questionId: string };
  }>,
  reply: FastifyReply,
) => {
  const id = parseInt(request.params.questionId);

  const result = questionsService.deleteQuestion(id);
  if (!result) {
    return reply
      .status(500)
      .send({ error: "No se ha podido eliminar la pregunta" });
  }

  return reply.send(result);
};

export const answerQuestion = async (
  request: FastifyRequest<{
    Params: { id: string };
    Body: { optionId: number };
  }>,
  reply: FastifyReply,
) => {
  const questionId = parseInt(request.params.id);
  const { optionId } = request.body;

  const result = await questionsService.checkAnswer(questionId, optionId);

  if (!result) {
    return reply.status(404).send({ error: "Opción no encontrada" });
  }

  return reply.send(result);
};
