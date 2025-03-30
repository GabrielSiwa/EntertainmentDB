/*
Author: Mitzi Vera Escartin
Date: 30/03/2025
Description:
This file sets up and manages a Prisma Client instance for database interactions.
It ensures that a single Prisma Client instance is used throughout the application 
to avoid unnecessary connections, especially in development environments.

Inputs:
- process.env.NODE_ENV: The current environment mode (production or development).

Processing:
- Checks if a Prisma Client instance already exists in the global scope.
- Creates a new Prisma Client instance if one does not exist.
- In development mode, stores the Prisma Client instance in the global scope to reuse it.

Outputs:
- Exports a single Prisma Client instance for database operations.
*/

import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
