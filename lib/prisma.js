import { PrismaClient } from '@prisma/client';

// Prisma Client reads DATABASE_URL from environment variable
let prisma;

try {
  prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    errorFormat: 'pretty',
  });

  // Verify that the student model exists
  if (!prisma.student) {
    console.error('⚠ WARNING: Prisma Student model not found!');
    console.error('Please run: npm run prisma:generate');
    throw new Error('Prisma Client not properly generated. Run: npm run prisma:generate');
  }
} catch (error) {
  if (error.message.includes('Cannot find module') || error.message.includes('not properly generated')) {
    console.error('\n❌ Prisma Client Error:');
    console.error('The Prisma Client has not been generated.');
    console.error('Please run the following commands:');
    console.error('  1. npm run prisma:generate');
    console.error('  2. npm run prisma:migrate (or prisma:push)');
    console.error('\n');
    throw error;
  }
  throw error;
}

// Handle Prisma connection errors
prisma.$connect().catch((error) => {
  console.error('Failed to connect to database:', error);
  if (error.code === 'P1001') {
    console.error('Cannot reach database server. Please check your DATABASE_URL in .env file');
  }
  // Don't exit in production, just log the error
  if (process.env.NODE_ENV === 'development') {
    console.error('Continuing in development mode...');
  }
});

export default prisma;

