const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.siteSettings.update({
    where: { id: 'global' },
    data: { address: 'Jakarta Selatan, Indonesia' }
  });
  console.log('Address updated in db');
}

main().catch(console.error).finally(() => prisma.$disconnect());
