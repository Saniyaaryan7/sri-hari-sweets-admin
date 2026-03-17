require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const fs = require('fs');
const path = require('path');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const dataDir = path.join(__dirname, '../data');

async function main() {
  console.log('Starting data migration...');

  // 1. Users
  const users = JSON.parse(fs.readFileSync(path.join(dataDir, 'users.json'), 'utf8'));
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        id: BigInt(user.id),
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        image: user.image
      }
    });
  }
  console.log('Users migrated.');

  // 2. Cakes
  const cakes = JSON.parse(fs.readFileSync(path.join(dataDir, 'cakes.json'), 'utf8'));
  for (const cake of cakes) {
    await prisma.cake.upsert({
      where: { cakeId: cake.cakeId },
      update: {},
      create: {
        id: BigInt(cake.id),
        cakeId: cake.cakeId,
        name: cake.name,
        price: parseFloat(cake.price),
        strike: cake.strike ? parseFloat(cake.strike) : null,
        image: cake.image,
        status: cake.status
      }
    });
  }
  console.log('Cakes migrated.');

  // 3. Categories
  const categories = JSON.parse(fs.readFileSync(path.join(dataDir, 'categories.json'), 'utf8'));
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: BigInt(cat.id) },
      update: {},
      create: {
        id: BigInt(cat.id),
        name: cat.name,
        superCategory: cat.superCategory,
        image: cat.image,
        status: cat.status
      }
    });
  }
  console.log('Categories migrated.');

  // 4. SuperCategories
  const superCats = JSON.parse(fs.readFileSync(path.join(dataDir, 'supercategories.json'), 'utf8'));
  for (const sc of superCats) {
    await prisma.superCategory.upsert({
      where: { id: BigInt(sc.id) },
      update: {},
      create: {
        id: BigInt(sc.id),
        name: sc.name,
        image: sc.image,
        status: sc.status
      }
    });
  }
  console.log('SuperCategories migrated.');

  // 5. Orders
  const orders = JSON.parse(fs.readFileSync(path.join(dataDir, 'orders.json'), 'utf8'));
  for (const order of orders) {
    await prisma.order.upsert({
      where: { id: BigInt(order.id) },
      update: {},
      create: {
        id: BigInt(order.id),
        userId: String(order.userId),
        items: order.items,
        address: order.address,
        total: parseFloat(order.total),
        paymentMethod: order.paymentMethod,
        status: order.status,
        createdAt: new Date(order.createdAt)
      }
    });
  }
  console.log('Orders migrated.');

  // 6. Messages
  const messages = JSON.parse(fs.readFileSync(path.join(dataDir, 'messages.json'), 'utf8'));
  for (const msg of messages) {
    await prisma.message.upsert({
      where: { id: BigInt(msg.id) },
      update: {},
      create: {
        id: BigInt(msg.id),
        createdAt: new Date(msg.createdAt),
        name: msg.name,
        email: msg.email,
        phone: msg.phone,
        subject: msg.subject,
        message: msg.message,
        reply: msg.reply
      }
    });
  }
  console.log('Messages migrated.');

  // 7. Hero
  const heroes = JSON.parse(fs.readFileSync(path.join(dataDir, 'hero.json'), 'utf8'));
  for (const h of heroes) {
    await prisma.hero.upsert({
      where: { id: BigInt(h.id) },
      update: {},
      create: {
        id: BigInt(h.id),
        image: h.image,
        title: h.title,
        subtitle: h.subtitle,
        link: h.link || null,
        status: h.status || 'Active'
      }
    });
  }
  console.log('Hero migrated.');

  // 8. Gallery
  const gallery = JSON.parse(fs.readFileSync(path.join(dataDir, 'gallery.json'), 'utf8'));
  for (const g of gallery) {
    await prisma.gallery.upsert({
      where: { id: BigInt(g.id) },
      update: {},
      create: {
        id: BigInt(g.id),
        image: g.image,
        title: g.title || null,
        category: g.category || null
      }
    });
  }
  console.log('Gallery migrated.');

  // 9. Specialities
  const specialities = JSON.parse(fs.readFileSync(path.join(dataDir, 'specialities.json'), 'utf8'));
  for (const s of specialities) {
    await prisma.speciality.upsert({
      where: { id: BigInt(s.id) },
      update: {},
      create: {
        id: BigInt(s.id),
        image: s.image,
        title: s.title,
        link: s.link
      }
    });
  }
  console.log('Specialities migrated.');

  // 10. Contact
  const contact = JSON.parse(fs.readFileSync(path.join(dataDir, 'contact.json'), 'utf8'));
  await prisma.contact.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      address: contact.address,
      phone: contact.phone,
      email: contact.email,
      socials: contact.socials
    }
  });
  console.log('Contact migrated.');

  // 11. About
  const about = JSON.parse(fs.readFileSync(path.join(dataDir, 'about.json'), 'utf8'));
  await prisma.about.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      banner: about.banner,
      story: about.story,
      mission: about.mission,
      bakery: about.bakery,
      values: about.values
    }
  });
  console.log('About migrated.');

  console.log('Migration completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
