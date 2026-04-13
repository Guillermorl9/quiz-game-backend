import prisma from '../lib/prisma'

export const getAllCategories = async () => {
  return prisma.category.findMany({
    include: {
      _count: { select: { questions: true } }
    }
  })
}