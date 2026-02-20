// lib/prisma.ts
// Error: The import path "../prisma/generated/client" may not exist
// Common solutions:
// 1. Run "npx prisma generate" to generate the Prisma client
// 2. Check if the path should be "@prisma/client" instead
// 3. Verify the prisma schema file exists and is properly configured
import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; 
