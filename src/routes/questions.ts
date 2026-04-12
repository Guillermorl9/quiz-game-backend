import { FastifyInstance } from 'fastify'
import { getRandomQuestion, answerQuestion } from '../controllers/questions.controller'

export default async function questionRoutes(app: FastifyInstance) {
  app.get('/random', getRandomQuestion)
  app.post('/:id/answer', answerQuestion)
}