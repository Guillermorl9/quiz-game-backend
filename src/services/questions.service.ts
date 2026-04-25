import { Question } from "@prisma/client";
import prisma from "../lib/prisma";

export interface CreateQuestionInput {
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

export const createQuestion = async (data: CreateQuestionInput) => {
  return prisma.question.create({
    data: {
      text: data.text,
      difficulty: data.difficulty,
      categoryId: data.categoryId,
      options: {
        create: data.options,
      },
    },
    include: {
      options: true,
      category: true,
    },
  });
};

export const getQuestionById = async (questionId: number) => {
  return prisma.question.findFirst({
    where: { id: questionId },
    include: {
      category: true,
      options: {
        select: { id: true, text: true },
      },
    },
  });
};

export const getRandomQuestion = async (
  categoryId?: number,
  difficulty?: string,
) => {
  const where = {
    ...(categoryId && { categoryId }),
    ...(difficulty && { difficulty }),
  };

  const count = await prisma.question.count({ where });

  if (count === 0) return null;

  const skip = Math.floor(Math.random() * count);

  return prisma.question.findFirst({
    skip,
    where,
    include: {
      category: true,
      options: {
        select: { id: true, text: true },
      },
    },
  });
};

export const updateQuestion = async (
  data: UpdateQuestionInput & { id: number },
) => {
  return prisma.question.update({
    where: { id: data.id },
    data: {
      text: data.text,
      difficulty: data.difficulty,
      categoryId: data.categoryId,
    },
    include: {
      options: true,
      category: true,
    },
  });
};

export const checkAnswer = async (questionId: number, optionId: number) => {
  const option = await prisma.option.findFirst({
    where: { id: optionId, questionId },
  });

  if (!option) return null;

  const correctOption = option.isCorrect
    ? option
    : await prisma.option.findFirst({
        where: { questionId, isCorrect: true },
      });

  return {
    correct: option.isCorrect,
    correctOptionId: correctOption!.id,
  };
};
