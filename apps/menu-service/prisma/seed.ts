import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'La Bella Italia',
      address: '123 Main Street, Downtown',
      phone: '+1 555-123-4567',
    },
  });

  console.log(`✅ Created restaurant: ${restaurant.name}`);

  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Appetizers',
        description: 'Start your meal right',
        sortOrder: 1,
        restaurantId: restaurant.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Pasta',
        description: 'Fresh handmade pasta',
        sortOrder: 2,
        restaurantId: restaurant.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Pizza',
        description: 'Wood-fired perfection',
        sortOrder: 3,
        restaurantId: restaurant.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Desserts',
        description: 'Sweet endings',
        sortOrder: 4,
        restaurantId: restaurant.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Beverages',
        description: 'Refreshing drinks',
        sortOrder: 5,
        restaurantId: restaurant.id,
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  const [appetizers, pasta, pizza, desserts, beverages] = categories;

  const menuItems = await Promise.all([
    prisma.menuItem.create({
      data: {
        name: 'Bruschetta',
        description: 'Toasted bread with fresh tomatoes, basil, and garlic',
        price: 8.99,
        categoryId: appetizers.id,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Calamari Fritti',
        description: 'Crispy fried calamari with marinara sauce',
        price: 12.99,
        categoryId: appetizers.id,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Caprese Salad',
        description: 'Fresh mozzarella, tomatoes, and basil with balsamic glaze',
        price: 10.99,
        categoryId: appetizers.id,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Spaghetti Carbonara',
        description: 'Classic carbonara with pancetta and pecorino',
        price: 16.99,
        categoryId: pasta.id,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Fettuccine Alfredo',
        description: 'Creamy alfredo sauce with parmesan',
        price: 15.99,
        categoryId: pasta.id,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Penne Arrabiata',
        description: 'Spicy tomato sauce with garlic and chili',
        price: 14.99,
        categoryId: pasta.id,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Margherita Pizza',
        description: 'Classic tomato sauce, mozzarella, fresh basil',
        price: 12.99,
        categoryId: pizza.id,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Quattro Formaggi',
        description: 'Four cheese pizza with gorgonzola, mozzarella, parmesan, and fontina',
        price: 16.99,
        categoryId: pizza.id,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Diavola Pizza',
        description: 'Spicy salami, chili flakes, tomato sauce, mozzarella',
        price: 15.99,
        categoryId: pizza.id,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Tiramisu',
        description: 'Classic Italian dessert with espresso-soaked ladyfingers',
        price: 8.99,
        categoryId: desserts.id,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Panna Cotta',
        description: 'Vanilla cream with berry compote',
        price: 7.99,
        categoryId: desserts.id,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Italian Soda',
        description: 'Refreshing soda with your choice of syrup',
        price: 3.99,
        categoryId: beverages.id,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Sparkling Water',
        description: 'San Pellegrino 500ml',
        price: 4.99,
        categoryId: beverages.id,
      },
    }),
  ]);

  console.log(`✅ Created ${menuItems.length} menu items`);

  const tables = await Promise.all([
    prisma.table.create({ data: { number: 1, restaurantId: restaurant.id } }),
    prisma.table.create({ data: { number: 2, restaurantId: restaurant.id } }),
    prisma.table.create({ data: { number: 3, restaurantId: restaurant.id } }),
    prisma.table.create({ data: { number: 4, restaurantId: restaurant.id } }),
    prisma.table.create({ data: { number: 5, restaurantId: restaurant.id } }),
  ]);

  console.log(`✅ Created ${tables.length} tables`);

  console.log('🎉 Seeding complete!');
  console.log(`   Restaurant ID: ${restaurant.id}`);
  console.log(`   Table IDs: ${tables.map((t) => t.id).join(', ')}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
