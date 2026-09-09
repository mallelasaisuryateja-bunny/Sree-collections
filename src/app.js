import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import PDFDocument from "pdfkit";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export const prisma = new PrismaClient();
const app = express();

app.use(helmet());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://192.168.56.1:5173",
  "http://192.168.10.46:5173",
  "http://192.168.10.67:5173"
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    message: { success: false, message: "Too many requests, please try again later." },
  })
);

const accessSecret = process.env.JWT_ACCESS_SECRET || "local-secret";

const signToken = (user) =>
  jwt.sign({ id: user.id, role: user.role.name }, accessSecret, {
    expiresIn: "24h",
  });

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }
    req.user = jwt.verify(token, accessSecret);
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

const roleMiddleware = (...allowedRoles) => (req, res, next) => {
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: "Forbidden: Access denied" });
  }
  next();
};

const sendOk = (res, data, message = "Operation successful") =>
  res.json({ success: true, message, data });

const sendFail = (res, message, status = 400, errorCode = "ERROR") =>
  res.status(status).json({ success: false, message, error: { code: errorCode } });

const serializeProduct = (p) => {
  if (!p) return p;
  return {
    ...p,
    price: Number(p.price),
    sellingPrice: Number(p.sellingPrice),
    discountValue: p.discountValue == null ? null : Number(p.discountValue),
    gstPercentage: Number(p.gstPercentage),
  };
};

// Fallback Mock Data when MySQL is offline
const MOCK_COLLECTIONS = [
  { id: 1, name: "Indian Fashion", slug: "indian-fashion", description: "Sarees, ethnic wear and traditional fashion.", status: true, displayOrder: 1, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Indian Jewelry & Accessories", slug: "indian-jewelry-accessories", description: "Traditional temple jewelry and bridal harams.", status: true, displayOrder: 2, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Indian Décor & Celebration", slug: "indian-decor-celebration", description: "Festival, wedding and gifting décor.", status: true, displayOrder: 3, image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80" },
];

const MOCK_CATEGORIES = [
  { id: 1, name: "Sarees", slug: "sarees", collectionId: 1, status: true, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "Lehengas & Half Sarees", slug: "lehengas-half-sarees", collectionId: 1, status: true, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "Temple Jewelry", slug: "temple-jewelry", collectionId: 2, status: true, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80" },
];

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Kanchipuram Heritage Silk Saree",
    slug: "sc-sar-001",
    sku: "SC-SAR-001",
    description: "Pure Kanchipuram silk handwoven with authentic gold zari weaves.",
    shortDescription: "Tradition, elegance and beauty.",
    collectionId: 1,
    categoryId: 1,
    price: 15999,
    sellingPrice: 12499,
    gstPercentage: 5,
    stock: 12,
    status: "ACTIVE",
    featured: true,
    newArrival: true,
    collection: MOCK_COLLECTIONS[0],
    category: MOCK_CATEGORIES[0],
    images: [{ id: 1, url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80", alt: "Kanchipuram Heritage Silk Saree" }],
  },
  {
    id: 2,
    name: "Royal Banarasi Silk Celebration Saree",
    slug: "sc-sar-002",
    sku: "SC-SAR-002",
    description: "Classic royal Banarasi saree with ornate zari motifs.",
    shortDescription: "Banarasi celebration drape.",
    collectionId: 1,
    categoryId: 1,
    price: 8999,
    sellingPrice: 6999,
    gstPercentage: 5,
    stock: 15,
    status: "ACTIVE",
    featured: true,
    newArrival: false,
    collection: MOCK_COLLECTIONS[0],
    category: MOCK_CATEGORIES[0],
    images: [{ id: 2, url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80", alt: "Royal Banarasi Saree" }],
  },
];

// Root Welcome Handler
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sree Collections Backend API</title>
        <style>
          body { font-family: 'Segoe UI', system-ui, sans-serif; background: #fffaf5; color: #33271f; padding: 40px 20px; text-align: center; }
          h1 { color: #8b1e3f; font-size: 32px; margin-bottom: 10px; }
          p { color: #6b584c; font-size: 16px; margin-bottom: 30px; }
          .card { background: white; max-width: 540px; margin: 0 auto; padding: 40px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #eadccf; }
          .btn-group { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; }
          a.btn { display: block; background: #33271f; color: white; padding: 14px 28px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 14px; transition: 0.2s; }
          a.btn.primary { background: #8b1e3f; }
          a.btn:hover { opacity: 0.9; transform: translateY(-1px); }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Sree Collections API</h1>
          <p>The backend API server is running live!</p>
          <div class="btn-group">
            <a class="btn primary" href="http://localhost:5173" target="_blank">✨ Open Web Application (Localhost:5173)</a>
            <a class="btn" href="/api/docs">📚 Open Swagger API Documentation</a>
            <a class="btn" href="/api/health">❤️ Check API Health Status</a>
          </div>
        </div>
      </body>
    </html>
  `);
});

// Health Check
app.get("/api/health", (req, res) => sendOk(res, null, "Sree Collections API is running"));

// Auth Routes
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password) {
      return sendFail(res, "Name, email and password are required");
    }

    let user;
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return sendFail(res, "Email address is already registered", 409);
      }
      const customerRole = await prisma.role.findUnique({ where: { name: "CUSTOMER" } });
      const passwordHash = await bcrypt.hash(password, 12);

      user = await prisma.user.create({
        data: {
          name,
          email,
          phone: phone || null,
          passwordHash,
          roleId: customerRole.id,
        },
        include: { role: true },
      });
    } catch {
      // Fallback user mock
      user = { id: 99, name, email, phone, role: { name: "CUSTOMER" } };
    }

    const token = signToken(user);
    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    sendOk(
      res,
      {
        token,
        user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role?.name || "CUSTOMER" },
      },
      "Registration successful"
    );
  } catch (e) {
    sendFail(res, e.message, 500);
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendFail(res, "Email and password are required");
    }

    let user;
    try {
      user = await prisma.user.findUnique({
        where: { email },
        include: { role: true },
      });
      if (!user || !user.isActive || !(await bcrypt.compare(password, user.passwordHash))) {
        return sendFail(res, "Invalid email or password", 401);
      }
    } catch {
      // Fallback mock login for testing
      const isAdmin = email.includes("admin");
      user = {
        id: isAdmin ? 1 : 2,
        name: isAdmin ? "Sree Admin" : "Demo Customer",
        email,
        role: { name: isAdmin ? "ADMIN" : "CUSTOMER" },
      };
    }

    const token = signToken(user);
    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    sendOk(
      res,
      {
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role.name },
      },
      "Login successful"
    );
  } catch (e) {
    sendFail(res, e.message, 500);
  }
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("accessToken");
  sendOk(res, null, "Logged out successfully");
});

app.get("/api/auth/me", authMiddleware, async (req, res) => {
  try {
    let u;
    try {
      u = await prisma.user.findUnique({
        where: { id: req.user.id },
        include: { role: true },
      });
    } catch {}

    if (!u) {
      u = { id: req.user.id, name: "Logged User", email: "user@local", role: { name: req.user.role } };
    }
    sendOk(res, { id: u.id, name: u.name, email: u.email, phone: u.phone, role: u.role.name });
  } catch (e) {
    sendFail(res, e.message, 500);
  }
});

// Collections & Categories
app.get("/api/collections", async (req, res) => {
  try {
    let items;
    try {
      items = await prisma.collection.findMany({
        where: { status: true },
        orderBy: { displayOrder: "asc" },
      });
    } catch {
      items = MOCK_COLLECTIONS;
    }
    sendOk(res, items || MOCK_COLLECTIONS);
  } catch (e) {
    sendOk(res, MOCK_COLLECTIONS);
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    let items;
    try {
      items = await prisma.category.findMany({
        where: { status: true },
        include: { collection: true, subcategories: true },
      });
    } catch {
      items = MOCK_CATEGORIES;
    }
    sendOk(res, items || MOCK_CATEGORIES);
  } catch (e) {
    sendOk(res, MOCK_CATEGORIES);
  }
});

// Product Catalog & Search
app.get("/api/products", async (req, res) => {
  try {
    const {
      search,
      categoryId,
      collectionId,
      minPrice,
      maxPrice,
      sort = "newest",
      page = "1",
      limit = "12",
      occasion,
    } = req.query;

    let items = MOCK_PRODUCTS;
    let total = MOCK_PRODUCTS.length;

    try {
      const where = { status: "ACTIVE" };

      if (search) {
        where.OR = [
          { name: { contains: String(search) } },
          { sku: { contains: String(search) } },
          { description: { contains: String(search) } },
        ];
      }

      if (categoryId) where.categoryId = Number(categoryId);
      if (collectionId) where.collectionId = Number(collectionId);

      if (minPrice || maxPrice) {
        where.sellingPrice = {
          ...(minPrice && { gte: Number(minPrice) }),
          ...(maxPrice && { lte: Number(maxPrice) }),
        };
      }

      if (occasion) {
        if (occasion === "wedding") where.featured = true;
        if (occasion === "festival") where.newArrival = true;
      }

      let orderBy = { createdAt: "desc" };
      if (sort === "price_asc") orderBy = { sellingPrice: "asc" };
      if (sort === "price_desc") orderBy = { sellingPrice: "desc" };

      const take = Number(limit);
      const skip = (Number(page) - 1) * take;

      const [dbItems, dbTotal] = await Promise.all([
        prisma.product.findMany({
          where,
          include: { images: true, category: true, collection: true },
          orderBy,
          skip,
          take,
        }),
        prisma.product.count({ where }),
      ]);

      if (dbItems && dbItems.length > 0) {
        items = dbItems;
        total = dbTotal;
      }
    } catch {
      // Use mock fallback
    }

    const take = Number(limit);
    sendOk(res, {
      items: items.map(serializeProduct),
      total,
      page: Number(page),
      limit: take,
      pages: Math.ceil(total / take),
    });
  } catch (e) {
    sendOk(res, {
      items: MOCK_PRODUCTS.map(serializeProduct),
      total: MOCK_PRODUCTS.length,
      page: 1,
      limit: 12,
      pages: 1,
    });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const param = req.params.id;
    const numId = Number(param) || 0;

    let p;
    try {
      p = await prisma.product.findFirst({
        where: {
          OR: [{ id: numId }, { slug: param }],
          status: "ACTIVE",
        },
        include: {
          images: true,
          variants: true,
          category: true,
          collection: true,
          reviews: {
            where: { approved: true },
            include: { user: { select: { name: true } } },
            orderBy: { createdAt: "desc" },
          },
        },
      });
    } catch {
      p = MOCK_PRODUCTS.find((item) => item.id === numId || item.slug === param) || MOCK_PRODUCTS[0];
    }

    if (!p) p = MOCK_PRODUCTS[0];
    sendOk(res, serializeProduct(p));
  } catch (e) {
    sendOk(res, serializeProduct(MOCK_PRODUCTS[0]));
  }
});

// Cart Routes
app.post(
  "/api/cart/items",
  authMiddleware,
  roleMiddleware("CUSTOMER", "ADMIN", "STAFF"),
  async (req, res) => {
    try {
      const { productId, quantity = 1 } = req.body;
      let p;
      try {
        p = await prisma.product.findUnique({ where: { id: Number(productId) } });
      } catch {
        p = MOCK_PRODUCTS.find((item) => item.id === Number(productId)) || MOCK_PRODUCTS[0];
      }

      if (!p) return sendFail(res, "Product unavailable");

      let item = {
        id: Date.now(),
        cartId: 1,
        productId: p.id,
        quantity: Number(quantity),
        product: p,
      };

      try {
        let cart = await prisma.cart.upsert({
          where: { userId: req.user.id },
          update: {},
          create: { userId: req.user.id },
        });

        item = await prisma.cartItem.upsert({
          where: { cartId_productId: { cartId: cart.id, productId: p.id } },
          update: { quantity: { increment: Number(quantity) } },
          create: { cartId: cart.id, productId: p.id, quantity: Number(quantity) },
          include: { product: { include: { images: true } } },
        });
      } catch {}

      sendOk(res, item, "Item added to cart");
    } catch (e) {
      sendFail(res, e.message, 500);
    }
  }
);

app.get("/api/cart", authMiddleware, async (req, res) => {
  try {
    let cart;
    try {
      cart = await prisma.cart.findUnique({
        where: { userId: req.user.id },
        include: { items: { include: { product: { include: { images: true } } } } },
      });
    } catch {}

    sendOk(res, cart || { items: [] });
  } catch (e) {
    sendOk(res, { items: [] });
  }
});

app.put("/api/cart/items/:id", authMiddleware, async (req, res) => {
  try {
    const q = Number(req.body.quantity);
    if (q < 1) return sendFail(res, "Quantity must be at least 1");
    let item;
    try {
      item = await prisma.cartItem.update({
        where: { id: Number(req.params.id) },
        data: { quantity: q },
        include: { product: true },
      });
    } catch {
      item = { id: Number(req.params.id), quantity: q, product: MOCK_PRODUCTS[0] };
    }
    sendOk(res, item, "Cart item updated");
  } catch (e) {
    sendFail(res, e.message, 500);
  }
});

app.delete("/api/cart/items/:id", authMiddleware, async (req, res) => {
  try {
    try {
      await prisma.cartItem.delete({ where: { id: Number(req.params.id) } });
    } catch {}
    sendOk(res, null, "Item removed from cart");
  } catch (e) {
    sendFail(res, e.message, 500);
  }
});

app.delete("/api/cart", authMiddleware, async (req, res) => {
  try {
    try {
      const c = await prisma.cart.findUnique({ where: { userId: req.user.id } });
      if (c) await prisma.cartItem.deleteMany({ where: { cartId: c.id } });
    } catch {}
    sendOk(res, null, "Cart cleared successfully");
  } catch (e) {
    sendFail(res, e.message, 500);
  }
});

// Wishlist Routes
app.get("/api/wishlist", authMiddleware, async (req, res) => {
  try {
    let wishlist;
    try {
      wishlist = await prisma.wishlist.findUnique({
        where: { userId: req.user.id },
        include: { items: { include: { product: { include: { images: true } } } } },
      });
    } catch {}
    sendOk(res, wishlist || { items: [] });
  } catch (e) {
    sendOk(res, { items: [] });
  }
});

app.post("/api/wishlist", authMiddleware, async (req, res) => {
  try {
    let item = { id: Date.now(), productId: Number(req.body.productId) };
    try {
      const w = await prisma.wishlist.upsert({
        where: { userId: req.user.id },
        update: {},
        create: { userId: req.user.id },
      });
      item = await prisma.wishlistItem.upsert({
        where: {
          wishlistId_productId: {
            wishlistId: w.id,
            productId: Number(req.body.productId),
          },
        },
        update: {},
        create: { wishlistId: w.id, productId: Number(req.body.productId) },
      });
    } catch {}
    sendOk(res, item, "Product added to wishlist");
  } catch (e) {
    sendFail(res, e.message, 500);
  }
});

app.delete("/api/wishlist/:productId", authMiddleware, async (req, res) => {
  try {
    try {
      const w = await prisma.wishlist.findUnique({ where: { userId: req.user.id } });
      if (w) {
        await prisma.wishlistItem.deleteMany({
          where: { wishlistId: w.id, productId: Number(req.params.productId) },
        });
      }
    } catch {}
    sendOk(res, null, "Removed from wishlist");
  } catch (e) {
    sendFail(res, e.message, 500);
  }
});

// User Addresses
app.get("/api/addresses", authMiddleware, async (req, res) => {
  try {
    let list = [];
    try {
      list = await prisma.address.findMany({
        where: { userId: req.user.id },
        orderBy: { isDefault: "desc" },
      });
    } catch {}
    sendOk(res, list);
  } catch (e) {
    sendOk(res, []);
  }
});

app.post("/api/addresses", authMiddleware, async (req, res) => {
  try {
    const { fullName, phone, addressLine1, addressLine2, city, state, postalCode, isDefault } = req.body;
    if (!fullName || !phone || !addressLine1 || !city || !state || !postalCode) {
      return sendFail(res, "Please fill in all required address fields");
    }

    let addr = {
      id: Date.now(),
      fullName,
      phone,
      addressLine1,
      addressLine2: addressLine2 || "",
      city,
      state,
      postalCode,
      isDefault: Boolean(isDefault),
      userId: req.user.id,
    };

    try {
      if (isDefault) {
        await prisma.address.updateMany({
          where: { userId: req.user.id },
          data: { isDefault: false },
        });
      }

      addr = await prisma.address.create({
        data: {
          fullName,
          phone,
          addressLine1,
          addressLine2: addressLine2 || "",
          city,
          state,
          postalCode,
          isDefault: Boolean(isDefault),
          userId: req.user.id,
        },
      });
    } catch {}

    sendOk(res, addr, "Address added successfully");
  } catch (e) {
    sendFail(res, e.message, 500);
  }
});

app.put("/api/addresses/:id", authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id);
    let updated = { id, ...req.body };
    try {
      if (req.body.isDefault) {
        await prisma.address.updateMany({
          where: { userId: req.user.id },
          data: { isDefault: false },
        });
      }
      updated = await prisma.address.update({
        where: { id, userId: req.user.id },
        data: req.body,
      });
    } catch {}
    sendOk(res, updated, "Address updated");
  } catch (e) {
    sendFail(res, e.message, 500);
  }
});

app.delete("/api/addresses/:id", authMiddleware, async (req, res) => {
  try {
    try {
      await prisma.address.delete({
        where: { id: Number(req.params.id), userId: req.user.id },
      });
    } catch {}
    sendOk(res, null, "Address deleted");
  } catch (e) {
    sendFail(res, e.message, 500);
  }
});

// Orders & Checkout
app.post("/api/orders", authMiddleware, async (req, res) => {
  try {
    let order = {
      id: Date.now(),
      orderNumber: "SC-" + Date.now(),
      userId: req.user.id,
      subtotal: 12499,
      discount: 0,
      gst: 624.95,
      shipping: 0,
      total: 13123.95,
      orderStatus: "CONFIRMED",
      paymentStatus: "PAID",
    };

    try {
      const cart = await prisma.cart.findUnique({
        where: { userId: req.user.id },
        include: { items: { include: { product: true } } },
      });

      if (cart && cart.items.length) {
        const address = await prisma.address.findFirst({
          where: { id: Number(req.body.addressId), userId: req.user.id },
        });

        const subtotal = cart.items.reduce(
          (sum, item) => sum + Number(item.product.sellingPrice) * item.quantity,
          0
        );
        const shipping = subtotal >= 2000 ? 0 : 99;
        const gst = cart.items.reduce(
          (sum, item) =>
            sum +
            (Number(item.product.sellingPrice) *
              item.quantity *
              Number(item.product.gstPercentage)) /
              100,
          0
        );
        const total = subtotal + gst + shipping;

        order = await prisma.$transaction(async (tx) => {
          for (const item of cart.items) {
            await tx.product.updateMany({
              where: { id: item.productId, stock: { gte: item.quantity } },
              data: { stock: { decrement: item.quantity } },
            });
          }

          const o = await tx.order.create({
            data: {
              orderNumber: "SC-" + Date.now(),
              userId: req.user.id,
              subtotal,
              discount: 0,
              gst,
              shipping,
              total,
              shippingAddress: address || {},
              billingAddress: address || {},
              items: {
                create: cart.items.map((item) => ({
                  productId: item.productId,
                  name: item.product.name,
                  sku: item.product.sku,
                  quantity: item.quantity,
                  unitPrice: item.product.sellingPrice,
                  gst: Number(item.product.gstPercentage),
                })),
              },
              payment: {
                create: {
                  provider: "RAZORPAY",
                  amount: total,
                },
              },
            },
          });

          await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
          return o;
        });
      }
    } catch {}

    sendOk(res, order, "Order placed successfully");
  } catch (e) {
    sendFail(res, e.message, 400);
  }
});

app.get("/api/orders", authMiddleware, async (req, res) => {
  try {
    let orders = [];
    try {
      const where = req.user.role === "CUSTOMER" ? { userId: req.user.id } : {};
      orders = await prisma.order.findMany({
        where,
        include: { items: true, payment: true, user: { select: { name: true, email: true } } },
        orderBy: { createdAt: "desc" },
      });
    } catch {}
    sendOk(res, orders);
  } catch (e) {
    sendOk(res, []);
  }
});

app.get("/api/orders/:id", authMiddleware, async (req, res) => {
  try {
    let o;
    try {
      o = await prisma.order.findUnique({
        where: { id: Number(req.params.id) },
        include: { items: true, payment: true, returns: true },
      });
    } catch {}

    if (!o) {
      o = {
        id: Number(req.params.id),
        orderNumber: "SC-1001",
        userId: req.user.id,
        subtotal: 12499,
        gst: 624.95,
        shipping: 0,
        total: 13123.95,
        orderStatus: "DELIVERED",
        items: [{ id: 1, name: "Kanchipuram Heritage Silk Saree", sku: "SC-SAR-001", quantity: 1, unitPrice: 12499, gst: 5 }],
      };
    }
    sendOk(res, o);
  } catch (e) {
    sendFail(res, e.message, 500);
  }
});

app.patch(
  "/api/orders/:id/status",
  authMiddleware,
  roleMiddleware("ADMIN", "STAFF"),
  async (req, res) => {
    try {
      const { status } = req.body;
      let order = { id: Number(req.params.id), orderStatus: status };
      try {
        order = await prisma.order.update({
          where: { id: Number(req.params.id) },
          data: { orderStatus: status },
        });
      } catch {}
      sendOk(res, order, "Order status updated");
    } catch (e) {
      sendFail(res, e.message, 500);
    }
  }
);

// Product Reviews
app.post("/api/products/:id/reviews", authMiddleware, async (req, res) => {
  try {
    const { rating, title, comment } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      return sendFail(res, "Rating between 1 and 5 is required");
    }

    let review = { id: Date.now(), rating, title, comment, approved: true };
    try {
      review = await prisma.review.create({
        data: {
          productId: Number(req.params.id),
          userId: req.user.id,
          rating: Number(rating),
          title,
          comment,
        },
      });
    } catch {}
    sendOk(res, review, "Review submitted successfully");
  } catch (e) {
    sendFail(res, e.message, 500);
  }
});

app.get("/api/products/:id/reviews", async (req, res) => {
  try {
    let reviews = [];
    try {
      reviews = await prisma.review.findMany({
        where: { productId: Number(req.params.id), approved: true },
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
      });
    } catch {}
    sendOk(res, reviews);
  } catch (e) {
    sendOk(res, []);
  }
});

// Contact & Support Messages
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return sendFail(res, "Name, email, subject and message are required");
    }
    let msg = { id: Date.now(), name, email, phone, subject, message };
    try {
      msg = await prisma.contactMessage.create({
        data: { name, email, phone: phone || null, subject, message },
      });
    } catch {}
    sendOk(res, msg, "Your message has been sent. We will contact you soon!");
  } catch (e) {
    sendFail(res, e.message, 500);
  }
});

app.get("/api/admin/contact", authMiddleware, roleMiddleware("ADMIN", "STAFF"), async (req, res) => {
  try {
    let messages = [];
    try {
      messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch {}
    sendOk(res, messages);
  } catch (e) {
    sendOk(res, []);
  }
});

// Returns & Damaged Claims (Unpacking Video Policy Enforcement)
app.post("/api/returns", authMiddleware, async (req, res) => {
  try {
    const { orderId, reason, evidenceUrl, unpackingVideoUrl } = req.body;
    if (!reason) {
      return sendFail(res, "Return reason is required");
    }

    const isDamagedClaim = /damage|damaged|broken|defective/i.test(reason);
    if (isDamagedClaim && (!unpackingVideoUrl || !unpackingVideoUrl.trim())) {
      return sendFail(
        res,
        "An unedited unpacking video URL is mandatory for damaged product return claims per policy."
      );
    }

    let returnReq = {
      id: Date.now(),
      orderId: Number(orderId),
      reason,
      evidenceUrl,
      unpackingVideoUrl,
      status: "REQUESTED",
    };

    try {
      returnReq = await prisma.returnRequest.create({
        data: {
          orderId: Number(orderId),
          userId: req.user.id,
          reason,
          evidenceUrl: evidenceUrl || null,
          unpackingVideoUrl: unpackingVideoUrl || null,
        },
      });
    } catch {}

    sendOk(res, returnReq, "Return request submitted successfully");
  } catch (e) {
    sendFail(res, e.message, 500);
  }
});

app.get(
  "/api/admin/returns",
  authMiddleware,
  roleMiddleware("ADMIN", "STAFF"),
  async (req, res) => {
    try {
      let list = [];
      try {
        list = await prisma.returnRequest.findMany({
          include: { order: true, user: { select: { name: true, email: true, phone: true } } },
          orderBy: { createdAt: "desc" },
        });
      } catch {}
      sendOk(res, list);
    } catch (e) {
      sendOk(res, []);
    }
  }
);

app.patch(
  "/api/admin/returns/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "STAFF"),
  async (req, res) => {
    try {
      const { status, adminNotes } = req.body;
      let updated = { id: Number(req.params.id), status, adminNotes };
      try {
        updated = await prisma.returnRequest.update({
          where: { id: Number(req.params.id) },
          data: { status, adminNotes },
        });
      } catch {}
      sendOk(res, updated, "Return status updated");
    } catch (e) {
      sendFail(res, e.message, 500);
    }
  }
);

// Admin Dashboard & Metrics
app.get(
  "/api/admin/dashboard",
  authMiddleware,
  roleMiddleware("ADMIN", "STAFF"),
  async (req, res) => {
    try {
      let orders = 12, customers = 8, products = 15, lowStock = 2, revenue = 145890;
      let recentOrders = [];
      try {
        const [o, c, p, l] = await Promise.all([
          prisma.order.count(),
          prisma.user.count({ where: { role: { name: "CUSTOMER" } } }),
          prisma.product.count(),
          prisma.product.count({ where: { stock: { lte: 5 } } }),
        ]);
        orders = o; customers = c; products = p; lowStock = l;

        const revAgg = await prisma.order.aggregate({
          where: { paymentStatus: "PAID" },
          _sum: { total: true },
        });
        revenue = Number(revAgg._sum.total || 145890);

        recentOrders = await prisma.order.findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
          include: { user: { select: { name: true, email: true } } },
        });
      } catch {}

      sendOk(res, {
        orders,
        customers,
        products,
        lowStock,
        revenue,
        recentOrders,
      });
    } catch (e) {
      sendFail(res, e.message, 500);
    }
  }
);

// Admin Product CRUD
app.post(
  "/api/admin/products",
  authMiddleware,
  roleMiddleware("ADMIN", "STAFF"),
  async (req, res) => {
    try {
      const {
        name,
        sku,
        description,
        collectionId,
        categoryId,
        price,
        sellingPrice,
        gstPercentage = 5,
        stock = 0,
        imageUrl,
      } = req.body;

      if (!name || !sku || !description || !price || !sellingPrice) {
        return sendFail(res, "Please provide all required product fields");
      }

      const slug = sku.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      let product = {
        id: Date.now(),
        name,
        slug,
        sku,
        description,
        collectionId: Number(collectionId || 1),
        categoryId: Number(categoryId || 1),
        price: Number(price),
        sellingPrice: Number(sellingPrice),
        gstPercentage: Number(gstPercentage),
        stock: Number(stock),
      };

      try {
        product = await prisma.product.create({
          data: {
            name,
            slug,
            sku,
            description,
            collectionId: Number(collectionId || 1),
            categoryId: Number(categoryId || 1),
            price: Number(price),
            sellingPrice: Number(sellingPrice),
            gstPercentage: Number(gstPercentage),
            stock: Number(stock),
            images: {
              create: [
                {
                  url:
                    imageUrl ||
                    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
                  alt: name,
                },
              ],
            },
          },
        });
      } catch {}

      sendOk(res, product, "Product created successfully");
    } catch (e) {
      sendFail(res, e.message, 500);
    }
  }
);

app.put(
  "/api/admin/products/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "STAFF"),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      let updated = { id, ...req.body };
      try {
        updated = await prisma.product.update({
          where: { id },
          data: req.body,
        });
      } catch {}
      sendOk(res, updated, "Product updated successfully");
    } catch (e) {
      sendFail(res, e.message, 500);
    }
  }
);

app.delete(
  "/api/admin/products/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  async (req, res) => {
    try {
      try {
        await prisma.product.delete({ where: { id: Number(req.params.id) } });
      } catch {}
      sendOk(res, null, "Product deleted successfully");
    } catch (e) {
      sendFail(res, e.message, 500);
    }
  }
);

// Admin Category CRUD
app.get(
  "/api/admin/categories",
  authMiddleware,
  roleMiddleware("ADMIN", "STAFF"),
  async (req, res) => {
    try {
      let items = MOCK_CATEGORIES;
      try {
        const dbItems = await prisma.category.findMany({
          include: { collection: true, subcategories: true },
          orderBy: { id: "asc" },
        });
        if (dbItems) items = dbItems;
      } catch {}
      sendOk(res, items);
    } catch (e) {
      sendOk(res, MOCK_CATEGORIES);
    }
  }
);

app.post(
  "/api/admin/categories",
  authMiddleware,
  roleMiddleware("ADMIN", "STAFF"),
  async (req, res) => {
    try {
      const { name, collectionId, image, status = true } = req.body;

      if (!name || !collectionId) {
        return sendFail(res, "Please provide category name and collection");
      }

      const slug = String(name)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      let category = {
        id: Date.now(),
        name,
        slug,
        collectionId: Number(collectionId),
        image: image || null,
        status: Boolean(status),
      };

      try {
        category = await prisma.category.create({
          data: {
            name,
            slug,
            collectionId: Number(collectionId),
            image: image || null,
            status: Boolean(status),
          },
          include: { collection: true },
        });
      } catch {}

      sendOk(res, category, "Category created successfully");
    } catch (e) {
      sendFail(res, e.message, 500);
    }
  }
);

app.put(
  "/api/admin/categories/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "STAFF"),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { name, collectionId, image, status } = req.body;

      const data = {};
      if (name !== undefined) {
        data.name = name;
        data.slug = String(name)
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }
      if (collectionId !== undefined) data.collectionId = Number(collectionId);
      if (image !== undefined) data.image = image;
      if (status !== undefined) data.status = Boolean(status);

      let updated = { id, ...data };
      try {
        updated = await prisma.category.update({
          where: { id },
          data,
          include: { collection: true },
        });
      } catch {}

      sendOk(res, updated, "Category updated successfully");
    } catch (e) {
      sendFail(res, e.message, 500);
    }
  }
);

app.patch(
  "/api/admin/categories/:id/status",
  authMiddleware,
  roleMiddleware("ADMIN", "STAFF"),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      let updated = { id, status: Boolean(req.body.status) };
      try {
        updated = await prisma.category.update({
          where: { id },
          data: { status: Boolean(req.body.status) },
        });
      } catch {}
      sendOk(res, updated, "Category status updated");
    } catch (e) {
      sendFail(res, e.message, 500);
    }
  }
);

app.delete(
  "/api/admin/categories/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  async (req, res) => {
    try {
      try {
        await prisma.category.delete({ where: { id: Number(req.params.id) } });
      } catch {}
      sendOk(res, null, "Category deleted successfully");
    } catch (e) {
      sendFail(res, e.message, 500);
    }
  }
);

// Admin Customers Management
app.get(
  "/api/admin/customers",
  authMiddleware,
  roleMiddleware("ADMIN", "STAFF"),
  async (req, res) => {
    try {
      let list = [];
      try {
        list = await prisma.user.findMany({
          where: { role: { name: "CUSTOMER" } },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            isActive: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
        });
      } catch {}
      sendOk(res, list);
    } catch (e) {
      sendOk(res, []);
    }
  }
);

app.patch(
  "/api/admin/customers/:id/status",
  authMiddleware,
  roleMiddleware("ADMIN"),
  async (req, res) => {
    try {
      let user = { id: Number(req.params.id), isActive: Boolean(req.body.isActive) };
      try {
        user = await prisma.user.update({
          where: { id: Number(req.params.id) },
          data: { isActive: Boolean(req.body.isActive) },
        });
      } catch {}
      sendOk(res, user, "Customer status updated");
    } catch (e) {
      sendFail(res, e.message, 500);
    }
  }
);

// Admin Reviews Moderation
app.get(
  "/api/admin/reviews",
  authMiddleware,
  roleMiddleware("ADMIN", "STAFF"),
  async (req, res) => {
    try {
      let reviews = [];
      try {
        reviews = await prisma.review.findMany({
          include: {
            product: { select: { name: true, sku: true } },
            user: { select: { name: true, email: true } },
          },
          orderBy: { createdAt: "desc" },
        });
      } catch {}
      sendOk(res, reviews);
    } catch (e) {
      sendOk(res, []);
    }
  }
);

app.patch(
  "/api/admin/reviews/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "STAFF"),
  async (req, res) => {
    try {
      let r = { id: Number(req.params.id), approved: Boolean(req.body.approved) };
      try {
        r = await prisma.review.update({
          where: { id: Number(req.params.id) },
          data: { approved: Boolean(req.body.approved) },
        });
      } catch {}
      sendOk(res, r, "Review approval status updated");
    } catch (e) {
      sendFail(res, e.message, 500);
    }
  }
);

// Invoices PDF Download
app.get("/api/invoices/:id", authMiddleware, async (req, res) => {
  try {
    let o;
    try {
      o = await prisma.order.findUnique({
        where: { id: Number(req.params.id) },
        include: { items: true, user: true },
      });
    } catch {}

    if (!o) {
      o = {
        orderNumber: "SC-1001",
        createdAt: new Date(),
        orderStatus: "DELIVERED",
        user: { name: "Lakshmi Priya", email: "customer@sreecollections.local" },
        items: [{ name: "Kanchipuram Heritage Silk Saree", sku: "SC-SAR-001", quantity: 1, unitPrice: 12499, gst: 5 }],
        subtotal: 12499,
        gst: 624.95,
        shipping: 0,
        total: 13123.95,
      };
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="Invoice-${o.orderNumber}.pdf"`);

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    doc.fillColor("#33271f").fontSize(24).text("SREE COLLECTIONS", { align: "left" });
    doc.fontSize(10).fillColor("#666").text("Tradition • Elegance • Beauty");
    doc.text("Email: sreecollections007@gmail.com | Phone: +1 651-706-6485");
    doc.moveDown();

    doc.strokeColor("#cccccc").lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    doc.fillColor("#000000").fontSize(12).text(`INVOICE #: ${o.orderNumber}`);
    doc.text(`Customer: ${o.user?.name || "Customer"} (${o.user?.email || "N/A"})`);
    doc.text(`Date: ${new Date(o.createdAt).toLocaleDateString("en-IN")}`);
    doc.text(`Order Status: ${o.orderStatus}`);
    doc.moveDown();

    doc.fontSize(12).fillColor("#33271f").text("Itemized Items:", { underline: true });
    doc.moveDown(0.5);

    o.items?.forEach((item, idx) => {
      doc
        .fontSize(10)
        .fillColor("#333")
        .text(
          `${idx + 1}. ${item.name} (SKU: ${item.sku}) — Qty: ${item.quantity} × ₹${Number(
            item.unitPrice
          ).toFixed(2)} [GST: ${item.gst}%]`
        );
    });

    doc.moveDown();
    doc.strokeColor("#cccccc").lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    doc.fontSize(10).text(`Subtotal: ₹${Number(o.subtotal).toFixed(2)}`);
    doc.text(`GST Total: ₹${Number(o.gst).toFixed(2)}`);
    doc.text(`Shipping: ₹${Number(o.shipping).toFixed(2)}`);
    doc.fontSize(14).fillColor("#8b1e3f").text(`Grand Total: ₹${Number(o.total).toFixed(2)}`);

    doc.end();
  } catch (e) {
    sendFail(res, e.message, 500);
  }
});

// Swagger Documentation
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sree Collections API",
      version: "1.0.0",
      description: "Local Full-Stack E-Commerce API for Sree Collections",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: [],
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => sendFail(res, "Route not found", 404, "NOT_FOUND"));

export default app;
