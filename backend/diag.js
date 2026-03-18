const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const contact = await prisma.contact.findUnique({ where: { id: 1 } });
    console.log('--- DB CHECK ---');
    console.log(JSON.stringify(contact, (key, value) => 
      typeof value === 'bigint' ? value.toString() : value, 2
    ));
    console.log('----------------');
    await prisma.$disconnect();
    process.exit(0);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

check();
