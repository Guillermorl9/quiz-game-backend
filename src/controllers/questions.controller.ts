import { FastifyRequest, FastifyReply } from 'fastify'
import prisma from '../lib/prisma'

export const getRandomQuestion = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const count = await prisma.question.count()

  if (count === 0) {
    return reply.status(404).send({ error: 'No hay preguntas disponibles' })
  }

  const skip = Math.floor(Math.random() * count)

  const question = await prisma.question.findFirst({
    skip,
    include: {
      category: true,
      options: {
        select: {
          id: true,
          text: true
        }
      }
    }
  })

  return reply.send(question)
}

export const answerQuestion = async (
  request: FastifyRequest<{
    Params: { id: string }
    Body: { optionId: number }
  }>,
  reply: FastifyReply
) => {
  const questionId = parseInt(request.params.id)
  const { optionId } = request.body

  const option = await prisma.option.findFirst({
    where: {
      id: optionId,
      questionId
    }
  })

  if (!option) {
    return reply.status(404).send({ error: 'Opción no encontrada' })
  }

  return reply.send({
    correct: option.isCorrect,
    correctOptionId: option.isCorrect
      ? optionId
      : (await prisma.option.findFirst({
          where: { questionId, isCorrect: true }
        }))!.id
  })
}