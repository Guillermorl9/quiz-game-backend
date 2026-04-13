import { FastifyInstance } from 'fastify'
import { getAllCategories } from '../controllers/categories.controller'

export default async function categoryRoutes(app: FastifyInstance) {
  app.get('/all', getAllCategories)
}