import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!
})

const prisma = new PrismaClient({ adapter })

async function main() {
  const science = await prisma.category.upsert({
    where: { name: 'Ciencia' },
    update: {},
    create: { name: 'Ciencia' }
  })

  const history = await prisma.category.upsert({
    where: { name: 'Historia' },
    update: {},
    create: { name: 'Historia' }
  })

  await prisma.question.create({
    data: {
      text: '¿Cuál es el planeta más grande del sistema solar?',
      difficulty: 'easy',
      categoryId: science.id,
      options: {
        create: [
          { text: 'Saturno', isCorrect: false },
          { text: 'Júpiter', isCorrect: true },
          { text: 'Neptuno', isCorrect: false },
          { text: 'Urano', isCorrect: false }
        ]
      }
    }
  })

  await prisma.question.create({
    data: {
      text: '¿En qué año llegó el hombre a la Luna?',
      difficulty: 'easy',
      categoryId: history.id,
      options: {
        create: [
          { text: '1965', isCorrect: false },
          { text: '1972', isCorrect: false },
          { text: '1969', isCorrect: true },
          { text: '1971', isCorrect: false }
        ]
      }
    }
  })

  await prisma.question.create({
    data: {
      text: '¿Cuál es el símbolo químico del oro?',
      difficulty: 'medium',
      categoryId: science.id,
      options: {
        create: [
          { text: 'Go', isCorrect: false },
          { text: 'Ag', isCorrect: false },
          { text: 'Ge', isCorrect: false },
          { text: 'Au', isCorrect: true }
        ]
      }
    }
  })

  console.log('Seed completado')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())