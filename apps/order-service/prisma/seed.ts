import { PrismaClient, OrderStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding orders...');

  const restaurant = await prisma.restaurant.findFirst({
    include: { tables: true, categories: { include: { menuItems: true } } },
  });

  if (!restaurant) {
    console.log('❌ No restaurant found. Run menu-service seed first.');
    return;
  }

  const table = restaurant.tables[0];
  const menuItems = restaurant.categories.flatMap((c) => c.menuItems);

  if (!table || menuItems.length === 0) {
    console.log('❌ No tables or menu items. Run menu-service seed first.');
    return;
  }

  const order1 = await prisma.order.create({
    data: {
      status: OrderStatus.PENDING,
      tableId: table.id,
      restaurantId: restaurant.id,
      totalAmount: menuItems[0].price * 2 + menuItems[1].price,
      orderItems: {
        create: [
          {
            menuItemId: menuItems[0].id,
            quantity: 2,
            unitPrice: menuItems[0].price,
          },
          {
            menuItemId: menuItems[1].id,
            quantity: 1,
            unitPrice: menuItems[1].price,
          },
        ],
      },
    },
    include: { orderItems: true },
  });

  console.log(`✅ Created order 1: ${order1.id} (PENDING)`);

  const order2 = await prisma.order.create({
    data: {
      status: OrderStatus.IN_PREPARATION,
      tableId: table.id,
      restaurantId: restaurant.id,
      totalAmount: menuItems[2].price * 3,
      orderItems: {
        create: [
          {
            menuItemId: menuItems[2].id,
            quantity: 3,
            unitPrice: menuItems[2].price,
          },
        ],
      },
    },
    include: { orderItems: true },
  });

  console.log(`✅ Created order 2: ${order2.id} (IN_PREPARATION)`);

  console.log('🎉 Order seeding complete!');
  console.log(`   Order 1 ID: ${order1.id}`);
  console.log(`   Order 2 ID: ${order2.id}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
