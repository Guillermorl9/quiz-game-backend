import { FastifyRequest, FastifyReply } from "fastify";
import * as optionService from "../services/options.service";

export const getAllOptions = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const options = await optionService.getAllOptions();
  return reply.send(options);
};
