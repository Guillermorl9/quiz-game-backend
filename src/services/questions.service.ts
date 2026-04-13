import prisma from '../lib/prisma'

export const getRandomQuestion = async (categoryId?: number, difficulty?: string) => {
  const where = {
    ...(categoryId && { categoryId }),
    ...(difficulty && { difficulty })
  }

  const count = await prisma.question.count({ where })

  if (count === 0) return null

  const skip = Math.floor(Math.random() * count)

  return prisma.question.findFirst({
    skip,
    where,
    include: {
      category: true,
      options: {
        select: { id: true, text: true }
      }
    }
  })
}

export const checkAnswer = async (questionId: number, optionId: number) => {
  const option = await prisma.option.findFirst({
    where: { id: optionId, questionId }
  })

  if (!option) return null

  const correctOption = option.isCorrect
    ? option
    : await prisma.option.findFirst({
        where: { questionId, isCorrect: true }
      })

  return {
    correct: option.isCorrect,
    correctOptionId: correctOption!.id
  }
}