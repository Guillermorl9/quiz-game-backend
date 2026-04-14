import prisma from "../lib/prisma";

export const getAllOptions = async () => {
  return prisma.option.findMany({});
};
