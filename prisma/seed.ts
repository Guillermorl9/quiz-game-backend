import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const categoriesData = [
    "Ciencia",
    "Historia",
    "Geografía",
    "Tecnología",
    "Deportes",
    "Cultura general",
  ];

  const categories: Record<string, any> = {};

  for (const name of categoriesData) {
    categories[name] = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const questions = [
    {
      text: "¿Cuál es el planeta más grande del sistema solar?",
      difficulty: "easy",
      category: "Ciencia",
      options: [
        { text: "Saturno", isCorrect: false },
        { text: "Júpiter", isCorrect: true },
        { text: "Neptuno", isCorrect: false },
        { text: "Urano", isCorrect: false },
      ],
    },
    {
      text: "¿Cuál es el símbolo químico del oro?",
      difficulty: "medium",
      category: "Ciencia",
      options: [
        { text: "Go", isCorrect: false },
        { text: "Ag", isCorrect: false },
        { text: "Ge", isCorrect: false },
        { text: "Au", isCorrect: true },
      ],
    },
    {
      text: "¿Qué partícula tiene carga negativa?",
      difficulty: "easy",
      category: "Ciencia",
      options: [
        { text: "Protón", isCorrect: false },
        { text: "Neutrón", isCorrect: false },
        { text: "Electrón", isCorrect: true },
        { text: "Núcleo", isCorrect: false },
      ],
    },

    {
      text: "¿En qué año llegó el hombre a la Luna?",
      difficulty: "easy",
      category: "Historia",
      options: [
        { text: "1965", isCorrect: false },
        { text: "1972", isCorrect: false },
        { text: "1969", isCorrect: true },
        { text: "1971", isCorrect: false },
      ],
    },
    {
      text: "¿Quién fue el primer emperador de Roma?",
      difficulty: "medium",
      category: "Historia",
      options: [
        { text: "Julio César", isCorrect: false },
        { text: "Augusto", isCorrect: true },
        { text: "Nerón", isCorrect: false },
        { text: "Trajano", isCorrect: false },
      ],
    },

    {
      text: "¿Cuál es el río más largo del mundo?",
      difficulty: "medium",
      category: "Geografía",
      options: [
        { text: "Amazonas", isCorrect: true },
        { text: "Nilo", isCorrect: false },
        { text: "Yangtsé", isCorrect: false },
        { text: "Misisipi", isCorrect: false },
      ],
    },
    {
      text: "¿Cuál es la capital de Australia?",
      difficulty: "medium",
      category: "Geografía",
      options: [
        { text: "Sídney", isCorrect: false },
        { text: "Melbourne", isCorrect: false },
        { text: "Canberra", isCorrect: true },
        { text: "Perth", isCorrect: false },
      ],
    },

    {
      text: "¿Qué significa HTML?",
      difficulty: "easy",
      category: "Tecnología",
      options: [
        { text: "Hyper Trainer Marking Language", isCorrect: false },
        { text: "HyperText Markup Language", isCorrect: true },
        { text: "HighText Machine Language", isCorrect: false },
        { text: "HyperText Markdown Language", isCorrect: false },
      ],
    },
    {
      text: "¿Qué empresa creó el sistema operativo Windows?",
      difficulty: "easy",
      category: "Tecnología",
      options: [
        { text: "Apple", isCorrect: false },
        { text: "Google", isCorrect: false },
        { text: "Microsoft", isCorrect: true },
        { text: "IBM", isCorrect: false },
      ],
    },

    {
      text: "¿Cuántos jugadores hay en un equipo de fútbol en el campo?",
      difficulty: "easy",
      category: "Deportes",
      options: [
        { text: "9", isCorrect: false },
        { text: "10", isCorrect: false },
        { text: "11", isCorrect: true },
        { text: "12", isCorrect: false },
      ],
    },
    {
      text: "¿En qué deporte se utiliza una raqueta?",
      difficulty: "easy",
      category: "Deportes",
      options: [
        { text: "Fútbol", isCorrect: false },
        { text: "Tenis", isCorrect: true },
        { text: "Baloncesto", isCorrect: false },
        { text: "Natación", isCorrect: false },
      ],
    },

    {
      text: "¿Quién pintó la Mona Lisa?",
      difficulty: "easy",
      category: "Cultura general",
      options: [
        { text: "Van Gogh", isCorrect: false },
        { text: "Picasso", isCorrect: false },
        { text: "Leonardo da Vinci", isCorrect: true },
        { text: "Rembrandt", isCorrect: false },
      ],
    },
    {
      text: "¿Cuántos continentes hay en la Tierra?",
      difficulty: "easy",
      category: "Cultura general",
      options: [
        { text: "5", isCorrect: false },
        { text: "6", isCorrect: false },
        { text: "7", isCorrect: true },
        { text: "8", isCorrect: false },
      ],
    },
  ];

  for (const q of questions) {
    await prisma.question.create({
      data: {
        text: q.text,
        difficulty: q.difficulty,
        categoryId: categories[q.category].id,
        options: {
          create: q.options,
        },
      },
    });
  }

  console.log("Seed completado");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
