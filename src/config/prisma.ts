import { PrismaClient } from "@prisma/client";
import { url } from "inspector";

const config = {
  url: process.env.DATABASE_URL,
};
const prisma = new PrismaClient()

export default prisma