import { FastifyRequest, FastifyReply } from 'fastify'
import * as categoriesService from '../services/categories.service'


export const getAllCategories = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const categories = await categoriesService.getAllCategories()
  return reply.send(categories)
}