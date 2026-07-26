const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const updatedUser = await prisma.user.update({
    where: { email: 'admin@n4rz.studio' },
    data: { 
      email: 'admin@nj.studio',
      password: hashedPassword,
      name: 'Admin NJ'
    }
  });
  console.log("Updated Admin:", updatedUser.email);
}

main().catch(console.error).finally(() => prisma.$disconnect());
