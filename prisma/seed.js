import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const collections = [
  {
    name: "Indian Fashion",
    slug: "indian-fashion",
    description: "Authentic Kanchipuram sarees, designer lehengas, half-sarees, and festive ethnic wear.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Indian Jewelry & Accessories",
    slug: "indian-jewelry-accessories",
    description: "Traditional temple jewelry, bridal harams, antique jhumkas, and royal accessories.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Indian Décor & Celebration",
    slug: "indian-decor-celebration",
    description: "Handcrafted brass diyas, festive torans, pooja essentials, and wedding return gifts.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
  },
];

const categories = [
  { name: "Sarees", slug: "sarees", colIndex: 0, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80" },
  { name: "Lehengas & Half Sarees", slug: "lehengas-half-sarees", colIndex: 0, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=600&q=80" },
  { name: "Salwar Suits & Kurtis", slug: "salwar-suits-kurtis", colIndex: 0, image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80" },
  { name: "Temple Jewelry", slug: "temple-jewelry", colIndex: 1, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80" },
  { name: "Bridal Jewelry", slug: "bridal-jewelry", colIndex: 1, image: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=600&q=80" },
  { name: "Jhumkas & Earrings", slug: "jhumkas-earrings", colIndex: 1, image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80" },
  { name: "Home & Pooja Décor", slug: "home-pooja-decor", colIndex: 2, image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80" },
  { name: "Torans & Door Hangings", slug: "torans-door-hangings", colIndex: 2, image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=600&q=80" },
  { name: "Gifts & Return Gifts", slug: "gifts-return-gifts", colIndex: 2, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80" },
];

async function main() {
  console.log("Seeding database...");

  // Seed Roles
  for (const roleName of ["CUSTOMER", "ADMIN", "STAFF"]) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    });
  }

  const adminRole = await prisma.role.findUnique({ where: { name: "ADMIN" } });
  const customerRole = await prisma.role.findUnique({ where: { name: "CUSTOMER" } });

  // Users
  const adminPassword = await bcrypt.hash("Admin@123", 12);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@sreecollections.local" },
    update: {},
    create: {
      name: "Sree Admin",
      email: "admin@sreecollections.local",
      phone: "+16517066485",
      passwordHash: adminPassword,
      roleId: adminRole.id,
    },
  });

  const customerPassword = await bcrypt.hash("Customer@123", 12);
  const customerUser = await prisma.user.upsert({
    where: { email: "customer@sreecollections.local" },
    update: {},
    create: {
      name: "Lakshmi Priya",
      email: "customer@sreecollections.local",
      phone: "+919876543210",
      passwordHash: customerPassword,
      roleId: customerRole.id,
    },
  });

  // Seed Collections
  const colMap = {};
  for (let i = 0; i < collections.length; i++) {
    const c = collections[i];
    const created = await prisma.collection.upsert({
      where: { slug: c.slug },
      update: { description: c.description, image: c.image },
      create: { ...c, displayOrder: i + 1 },
    });
    colMap[c.slug] = created;
  }

  // Seed Categories
  const catMap = {};
  for (const cat of categories) {
    const col = colMap[collections[cat.colIndex].slug];
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, image: cat.image, collectionId: col.id },
      create: {
        name: cat.name,
        slug: cat.slug,
        image: cat.image,
        collectionId: col.id,
      },
    });
    catMap[cat.slug] = created;
  }

  // Sample Address
  const sampleAddr = await prisma.address.create({
    data: {
      fullName: "Lakshmi Priya",
      phone: "+919876543210",
      addressLine1: "Flat 402, Royal Residency, Jubilee Hills",
      addressLine2: "Near Checkpost",
      city: "Hyderabad",
      state: "Telangana",
      postalCode: "500033",
      country: "India",
      isDefault: true,
      userId: customerUser.id,
    },
  });

  // Seed Products
  const productsList = [
    {
      name: "Kanchipuram Pure Silk Zari Saree",
      sku: "SC-SAR-001",
      description: "Handwoven in Kanchipuram with pure mulberry silk and rich gold zari weave. Perfect for bridal ceremonies and grand celebrations.",
      shortDescription: "Pure Kanchipuram Mulberry Silk Saree with Gold Zari.",
      colSlug: "indian-fashion",
      catSlug: "sarees",
      price: 15999,
      sellingPrice: 12499,
      gstPercentage: 5,
      stock: 12,
      featured: true,
      newArrival: true,
      images: [
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      name: "Royal Banarasi Silk Brocade Saree",
      sku: "SC-SAR-002",
      description: "Vibrant crimson Banarasi brocade weave crafted with elaborate floral motifs and festive border detailing.",
      shortDescription: "Classic Royal Banarasi Silk with ornate Zari motifs.",
      colSlug: "indian-fashion",
      catSlug: "sarees",
      price: 8999,
      sellingPrice: 6999,
      gstPercentage: 5,
      stock: 15,
      featured: true,
      newArrival: false,
      images: [
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      name: "Designer Velvet Bridal Lehenga Set",
      sku: "SC-LEH-001",
      description: "Intricately embroidered velvet lehenga with zardozi handcraft, dupion silk dupatta, and matching blouse piece.",
      shortDescription: "Maroon Zardozi Velvet Bridal Lehenga.",
      colSlug: "indian-fashion",
      catSlug: "lehengas-half-sarees",
      price: 24999,
      sellingPrice: 19999,
      gstPercentage: 5,
      stock: 6,
      featured: true,
      newArrival: true,
      images: [
        "https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      name: "Antique Goddess Lakshmi Temple Haram",
      sku: "SC-JWL-001",
      description: "22K gold plated antique finish Temple Haram necklace featuring Goddess Lakshmi motifs and ruby red stone accents.",
      shortDescription: "Heritage Antique Temple Haram Necklace.",
      colSlug: "indian-jewelry-accessories",
      catSlug: "temple-jewelry",
      price: 4999,
      sellingPrice: 3499,
      gstPercentage: 3,
      stock: 20,
      featured: true,
      newArrival: true,
      images: [
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      name: "Kundan & Freshwater Pearl Drop Jhumkas",
      sku: "SC-JWL-002",
      description: "Exquisite handcrafted Kundan jhumkas adorned with natural pearls and intricate meenakari work.",
      shortDescription: "Kundan Meenakari Pearl Jhumka Earrings.",
      colSlug: "indian-jewelry-accessories",
      catSlug: "jhumkas-earrings",
      price: 2499,
      sellingPrice: 1799,
      gstPercentage: 3,
      stock: 25,
      featured: false,
      newArrival: true,
      images: [
        "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      name: "Handcrafted Brass Peacock Oil Diya Set",
      sku: "SC-DEC-001",
      description: "Pure heavy brass peacock oil lamps handcrafted by skilled Indian artisans. Ideal for festive pooja rituals and home décor.",
      shortDescription: "Traditional Heavy Brass Peacock Diya Pair.",
      colSlug: "indian-decor-celebration",
      catSlug: "home-pooja-decor",
      price: 3299,
      sellingPrice: 2499,
      gstPercentage: 12,
      stock: 18,
      featured: true,
      newArrival: false,
      images: [
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      name: "Festive Marigold & Velvet Bell Door Toran",
      sku: "SC-DEC-002",
      description: "Traditional doorway bandhanwar handcrafted with velvet flowers, brass bells, and auspicious shubh-labh hangings.",
      shortDescription: "Handmade Velvet Door Hanging Bandhanwar.",
      colSlug: "indian-decor-celebration",
      catSlug: "torans-door-hangings",
      price: 1299,
      sellingPrice: 899,
      gstPercentage: 12,
      stock: 30,
      featured: false,
      newArrival: true,
      images: [
        "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=900&q=80",
      ],
    },
  ];

  let seededProdCount = 0;
  for (const item of productsList) {
    const col = colMap[item.colSlug];
    const cat = catMap[item.catSlug];
    const slug = item.sku.toLowerCase();

    const product = await prisma.product.upsert({
      where: { sku: item.sku },
      update: {
        name: item.name,
        price: item.price,
        sellingPrice: item.sellingPrice,
        stock: item.stock,
        description: item.description,
      },
      create: {
        name: item.name,
        slug,
        sku: item.sku,
        description: item.description,
        shortDescription: item.shortDescription,
        collectionId: col.id,
        categoryId: cat.id,
        price: item.price,
        sellingPrice: item.sellingPrice,
        gstPercentage: item.gstPercentage,
        stock: item.stock,
        featured: item.featured,
        newArrival: item.newArrival,
        images: {
          create: item.images.map((url, idx) => ({
            url,
            alt: `${item.name} image ${idx + 1}`,
            displayOrder: idx,
          })),
        },
      },
    });

    seededProdCount++;

    // Add review for first product
    if (seededProdCount === 1) {
      await prisma.review.upsert({
        where: {
          productId_userId: {
            productId: product.id,
            userId: customerUser.id,
          },
        },
        update: {},
        create: {
          productId: product.id,
          userId: customerUser.id,
          rating: 5,
          title: "Breathtaking Silk Quality!",
          comment: "The Kanchipuram silk saree arrived in beautiful packaging. Pure silk feel and gold zari work is stunning!",
          approved: true,
        },
      });
    }
  }

  // Site Settings
  await prisma.siteSetting.upsert({
    where: { key: "business_email" },
    update: { value: "sreecollections007@gmail.com" },
    create: { key: "business_email", value: "sreecollections007@gmail.com" },
  });
  await prisma.siteSetting.upsert({
    where: { key: "business_phone" },
    update: { value: "+16517066485" },
    create: { key: "business_phone", value: "+16517066485" },
  });

  console.log(`Seeding finished cleanly! ${seededProdCount} products created/updated.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
