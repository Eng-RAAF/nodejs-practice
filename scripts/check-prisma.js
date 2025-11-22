import { PrismaClient } from '@prisma/client';

async function checkPrisma() {
  try {
    const prisma = new PrismaClient();
    
    console.log('Checking Prisma Client...');
    console.log('Prisma instance:', !!prisma);
    console.log('Student model:', typeof prisma.student);
    console.log('Available models:', Object.keys(prisma).filter(key => !key.startsWith('$') && !key.startsWith('_')));
    
    // Try to access the student model
    if (prisma.student) {
      console.log('✓ Student model is available');
      console.log('Student model methods:', Object.getOwnPropertyNames(prisma.student).filter(m => typeof prisma.student[m] === 'function'));
    } else {
      console.log('✗ Student model is NOT available');
      console.log('Please run: npm run prisma:generate');
    }
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error checking Prisma:', error);
    console.error('Error message:', error.message);
    if (error.message.includes('Cannot find module')) {
      console.error('\n⚠ Prisma Client not generated. Run: npm run prisma:generate');
    }
  }
}

checkPrisma();

