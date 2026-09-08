import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, useParams, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Package,
  LayoutDashboard,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Star,
  Plus,
  Trash2,
  CheckCircle2,
  Phone,
  Mail,
  Instagram,
  Facebook,
  FileText,
  ArrowRight,
  Video,
  MessageCircle,
  Clock,
  Award,
  Pencil,
  Tag,
  Loader2,
  Users,
  ShoppingCart,
  RefreshCcw
} from "lucide-react";
import { api } from "./api";

const money = (n) => `₹${Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

// ----------------------------------------------------
// BRAND LOGO COMPONENT (MATCHING FIGMA SPECIFICATION)
// ----------------------------------------------------
function SreeLogo({ size = "md", dark = false }) {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      {/* SVG Emblem */}
      <div className={`relative flex items-center justify-center ${size === "lg" ? "w-14 h-14" : "w-10 h-10"}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Circle border */}
          <circle cx="50" cy="50" r="44" stroke={dark ? "#F7E5A9" : "#6B1D34"} strokeWidth="3" opacity="0.8" />
          {/* Crown */}
          <path d="M40 22 L45 28 L50 20 L55 28 L60 22 L58 32 L42 32 Z" fill="#C89B3C" />
          {/* Monogram SC */}
          <text x="50" y="62" textAnchor="middle" fill={dark ? "#FFFDF9" : "#6B1D34"} fontFamily="Georgia, serif" fontSize="34" fontWeight="bold" fontStyle="italic">
            SC
          </text>
          {/* Leaf vine accent */}
          <path d="M78 40 C85 50 82 65 72 75 C76 68 78 58 75 48 Z" fill="#C89B3C" />
          <circle cx="82" cy="42" r="3" fill="#C89B3C" />
          <circle cx="86" cy="52" r="2.5" fill="#6B1D34" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span className={`serif font-bold tracking-wider leading-none ${size === "lg" ? "text-2xl" : "text-xl"} ${dark ? "text-[#FFFDF9]" : "text-[#6B1D34]"}`}>
          sreecollections
        </span>
        <span className={`tracking-[0.25em] uppercase font-bold mt-1 ${size === "lg" ? "text-[10px]" : "text-[8px]"} ${dark ? "text-[#C89B3C]" : "text-[#701D35]"}`}>
          BEAUTY • FASHION • STYLE
        </span>
      </div>
    </Link>
  );
}

// ----------------------------------------------------
// HEADER COMPONENT
// ----------------------------------------------------
function Header({ onOpenCart }) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    api.get("/auth/me")
      .then((res) => setUser(res.data.data))
      .catch(() => setUser(null));

    api.get("/cart")
      .then((res) => setCartCount(res.data.data?.items?.length || 0))
      .catch(() => setCartCount(0));

    api.get("/wishlist")
      .then((res) => setWishCount(res.data.data?.items?.length || 0))
      .catch(() => setWishCount(0));
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      nav(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("sree_token");
      setUser(null);
      setUserMenuOpen(false);
      nav("/");
    } catch (e) {
      localStorage.removeItem("sree_token");
      setUser(null);
      nav("/");
    }
  };

  return (
    <>
      {/* Top Notice Bar */}
      <div className="bg-[#6B1D34] text-[#F9F1D8] text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles size={14} className="text-[#C89B3C]" />
        <span>Free Express Delivery Across India on Orders Above ₹2000 • Order Direct via WhatsApp</span>
      </div>

      <header className="sticky top-0 z-40 bg-[#FBF7F0]/95 backdrop-blur border-b border-[#E5D5C0] transition-all">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <button
            aria-label="Toggle Menu"
            className="md:hidden p-2 text-[#6B1D34] hover:bg-[#F9F1D8] rounded-lg"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <SreeLogo />

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#3A242B]">
            <Link to="/" className="hover:text-[#6B1D34] transition">Home</Link>
            <Link to="/collections" className="hover:text-[#6B1D34] transition">Categories</Link>
            <Link to="/products" className="hover:text-[#6B1D34] transition">Shop All</Link>
            <Link to="/about" className="hover:text-[#6B1D34] transition">About Us</Link>
            <Link to="/contact" className="hover:text-[#6B1D34] transition">Contact Us</Link>
            <Link to="/return-policy" className="hover:text-[#6B1D34] transition">Return Policy</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center border border-[#C89B3C]/40 bg-white rounded-full px-3 py-1.5 w-56 focus-within:ring-2 focus-within:ring-[#6B1D34]/30">
              <Search size={15} className="text-[#6B1D34] ml-1" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none px-2 text-xs w-full text-[#3A242B]"
                placeholder="Search outfits, jewelry..."
              />
            </form>

            <Link to="/wishlist" className="relative p-2 text-[#6B1D34] hover:bg-[#F9F1D8] rounded-full transition" title="Wishlist">
              <Heart size={20} />
              {wishCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#6B1D34] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishCount}
                </span>
              )}
            </Link>

            <button onClick={onOpenCart} className="relative p-2 text-[#6B1D34] hover:bg-[#F9F1D8] rounded-full transition" title="Cart Drawer">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C89B3C] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account dropdown */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 text-xs font-semibold text-[#6B1D34] hover:bg-[#F9F1D8] rounded-full transition"
                >
                  <div className="w-8 h-8 rounded-full bg-[#6B1D34] text-white flex items-center justify-center text-xs font-bold uppercase shadow">
                    {user.name?.[0] || "U"}
                  </div>
                </button>
              ) : (
                <Link to="/login" className="p-2 text-[#6B1D34] hover:bg-[#F9F1D8] rounded-full transition" title="Account">
                  <User size={20} />
                </Link>
              )}

              {userMenuOpen && user && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-[#E5D5C0] py-2 z-50">
                  <div className="px-4 py-2 border-b border-[#F5E6D3]">
                    <p className="text-xs text-[#7A6269]">Signed in as</p>
                    <p className="text-sm font-bold text-[#6B1D34] truncate">{user.name}</p>
                    <span className="inline-block mt-1 text-[10px] bg-[#F9F1D8] text-[#6B1D34] px-2 py-0.5 rounded font-bold uppercase">
                      {user.role}
                    </span>
                  </div>

                  <Link to="/orders" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-xs text-[#3A242B] hover:bg-[#FBF7F0]">
                    <Package size={15} /> My Orders
                  </Link>

                  {(user.role === "ADMIN" || user.role === "STAFF") && (
                    <Link to="/admin/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-xs text-[#6B1D34] font-bold hover:bg-[#FBF7F0]">
                      <LayoutDashboard size={15} /> Admin Portal
                    </Link>
                  )}

                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 text-left border-t border-[#F5E6D3] mt-1">
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <div className="md:hidden border-t border-[#E5D5C0] bg-[#FBF7F0] px-6 py-4 space-y-3 font-semibold text-sm text-[#3A242B]">
            <form onSubmit={handleSearch} className="flex items-center border border-[#C89B3C]/40 bg-white rounded-full px-3 py-2 w-full mb-3">
              <Search size={16} className="text-[#6B1D34] ml-1" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none px-2 text-xs w-full text-[#3A242B]"
                placeholder="Search outfits, jewelry..."
              />
            </form>

            <Link to="/" onClick={() => setOpen(false)} className="block py-1">Home</Link>
            <Link to="/collections" onClick={() => setOpen(false)} className="block py-1">Categories</Link>
            <Link to="/products" onClick={() => setOpen(false)} className="block py-1">Shop All Products</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="block py-1">About Us</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="block py-1">Contact Us</Link>
            <Link to="/return-policy" onClick={() => setOpen(false)} className="block py-1">Return Policy</Link>
          </div>
        )}
      </header>
    </>
  );
}

// ----------------------------------------------------
// FOOTER COMPONENT
// ----------------------------------------------------
function Footer() {
  return (
    <footer className="mt-24 bg-[#2A1B20] text-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <SreeLogo size="lg" dark />
          <p className="mt-4 text-xs text-[#F9F1D8] opacity-80 leading-relaxed">
            Curated Indian heritage fashion, Kanchipuram silk sarees, temple jewelry, bridal lehengas, and festive home décor crafted with timeless artistry.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.instagram.com/sreecollections007?igsh=cGliZ2xlZ2w3Nnlq"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white/10 hover:bg-[#6B1D34] rounded-full transition text-white"
              title="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.facebook.com/share/1FeXcHxQLh/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white/10 hover:bg-[#6B1D34] rounded-full transition text-white"
              title="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="mailto:Sreecollections007@gmail.com"
              className="p-2.5 bg-white/10 hover:bg-[#6B1D34] rounded-full transition text-white"
              title="Email Us"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://wa.me/19526830741"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 rounded-full transition text-white"
              title="WhatsApp Direct Order"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-sm text-[#C89B3C] tracking-wider uppercase mb-4">Shop Categories</h4>
          <ul className="space-y-2.5 text-xs opacity-80">
            <li><Link to="/products?collectionId=1" className="hover:text-[#C89B3C] transition">Casual & Festive Wear</Link></li>
            <li><Link to="/products?collectionId=1" className="hover:text-[#C89B3C] transition">Kanchipuram & Banarasi Sarees</Link></li>
            <li><Link to="/products?collectionId=2" className="hover:text-[#C89B3C] transition">Temple & Kundan Jewelry</Link></li>
            <li><Link to="/products?collectionId=3" className="hover:text-[#C89B3C] transition">Decorative Items & Torans</Link></li>
            <li><Link to="/products?occasion=wedding" className="hover:text-[#C89B3C] transition">Bridal Ensemble</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm text-[#C89B3C] tracking-wider uppercase mb-4">Customer Support</h4>
          <ul className="space-y-2.5 text-xs opacity-80">
            <li><Link to="/about" className="hover:text-[#C89B3C] transition">About Sree Collections</Link></li>
            <li><Link to="/return-policy" className="hover:text-[#C89B3C] transition">Return & Replacement Policy</Link></li>
            <li><Link to="/contact" className="hover:text-[#C89B3C] transition">Contact Us</Link></li>
            <li><Link to="/orders" className="hover:text-[#C89B3C] transition">Track Your Order</Link></li>
            <li><Link to="/admin/login" className="hover:text-[#C89B3C] transition">Staff & Admin Portal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm text-[#C89B3C] tracking-wider uppercase mb-4">Direct Contact</h4>
          <div className="space-y-3 text-xs opacity-80">
            <p className="flex items-center gap-2">
              <Mail size={14} className="text-[#C89B3C]" />
              <span>Sreecollections007@gmail.com</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone size={14} className="text-[#C89B3C]" />
              <span>+1 952-683-0741 / +91-9526830741</span>
            </p>
            <p className="flex items-center gap-2">
              <MessageCircle size={14} className="text-emerald-400" />
              <span>Instant WhatsApp Order Assist</span>
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] leading-relaxed opacity-70">
              <span className="text-[#C89B3C] font-semibold">Damaged Claim Notice:</span> An unedited unboxing video from original parcel seal opening is compulsory for damaged replacement claims.
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} sreecollections. BEAUTY • FASHION • STYLE. All Rights Reserved.
      </div>
    </footer>
  );
}

// ----------------------------------------------------
// HOME PAGE (EXACT FIGMA DESIGN IMPLEMENTATION)
// ----------------------------------------------------
function Home({ onOpenCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/products?limit=8")
      .then((r) => setProducts(r.data.data.items))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header onOpenCart={onOpenCart} />
      <main className="overflow-hidden">
        {/* HERO BANNER SECTION (MATCHING FIGMA FRAME 1) */}
        <section className="relative bg-[#F9F1D8]/40 py-16 md:py-24 border-b border-[#E5D5C0]">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#6B1D34] uppercase bg-[#6B1D34]/10 px-3.5 py-1.5 rounded-full">
                <Sparkles size={14} className="text-[#C89B3C]" /> Beauty • Fashion • Style
              </span>
              <h1 className="serif text-4xl md:text-6xl text-[#6B1D34] font-bold leading-[1.15]">
                Dive Into A World Of Endless Fashion Possibilities
              </h1>
              <p className="text-base text-[#5A3A42] max-w-lg leading-relaxed">
                Discover handcrafted Kanchipuram silk sarees, temple jewelry, festive outfits, and home décor curated for grand Indian celebrations.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/products"
                  className="px-8 py-3.5 bg-[#6B1D34] text-white font-bold rounded-full shadow-lg hover:bg-[#521325] transition flex items-center gap-2 text-sm"
                >
                  Explore Collection <ArrowRight size={16} />
                </Link>
                <a
                  href="https://wa.me/19526830741?text=Hello%20Sree%20Collections,%20I%20want%20to%20place%20an%20order!"
                  target="_blank"
                  rel="noreferrer"
                  className="px-7 py-3.5 bg-emerald-700 text-white font-bold rounded-full hover:bg-emerald-800 transition flex items-center gap-2 text-sm shadow-md"
                >
                  <MessageCircle size={18} /> Order on WhatsApp
                </a>
              </div>
            </div>

            {/* Hero Image Cluster */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border-2 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
                    alt="Saree Collection"
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-md border border-[#E5D5C0] text-center">
                  <p className="serif font-bold text-sm text-[#6B1D34]">Saree Collection</p>
                  <p className="text-[10px] text-[#7A6269]">Pure Silk & Zari Handlooms</p>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="bg-white p-4 rounded-2xl shadow-md border border-[#E5D5C0] text-center">
                  <p className="serif font-bold text-sm text-[#6B1D34]">Temple Jewelry</p>
                  <p className="text-[10px] text-[#7A6269]">22K Gold Finish Craftsmanship</p>
                </div>
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border-2 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
                    alt="Jewelry Collection"
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE SREE COLLECTIONS (FIGMA PILLARS) */}
        <section className="bg-white py-12 border-b border-[#E5D5C0]">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="serif text-center text-xl font-bold text-[#6B1D34] mb-8">Why Choose Sree Collections</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-5 rounded-2xl bg-[#FBF7F0] border border-[#E5D5C0]">
                <div className="w-12 h-12 bg-[#6B1D34] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award size={22} />
                </div>
                <h4 className="font-bold text-sm text-[#3A242B]">100% Genuine</h4>
                <p className="text-xs text-[#7A6269] mt-1">Authentic silk and artisanal quality</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FBF7F0] border border-[#E5D5C0]">
                <div className="w-12 h-12 bg-[#6B1D34] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <Truck size={22} />
                </div>
                <h4 className="font-bold text-sm text-[#3A242B]">Free Shipping</h4>
                <p className="text-xs text-[#7A6269] mt-1">Free delivery over ₹2000 in India</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FBF7F0] border border-[#E5D5C0]">
                <div className="w-12 h-12 bg-[#6B1D34] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock size={22} />
                </div>
                <h4 className="font-bold text-sm text-[#3A242B]">Fast Delivery</h4>
                <p className="text-xs text-[#7A6269] mt-1">Express dispatch to your doorstep</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FBF7F0] border border-[#E5D5C0]">
                <div className="w-12 h-12 bg-[#6B1D34] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <RotateCcw size={22} />
                </div>
                <h4 className="font-bold text-sm text-[#3A242B]">Easy Returns</h4>
                <p className="text-xs text-[#7A6269] mt-1">7-day replacement with unpacking video</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS GRID */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#C89B3C] font-bold">Handpicked Collections</p>
              <h2 className="serif text-3xl md:text-4xl text-[#6B1D34] font-bold mt-1">Featured Apparel & Accessories</h2>
            </div>
            <Link to="/products" className="text-xs font-bold text-[#6B1D34] hover:underline flex items-center gap-1">
              View All Products <ChevronRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-16 text-xs text-[#7A6269]">Loading collections...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </section>

        {/* WHATSAPP ORDER BANNER (EXACT FIGMA RED LUXURY BANNER) */}
        <section className="max-w-7xl mx-auto px-6 py-10">
          <div className="bg-gradient-to-r from-[#6B1D34] via-[#801D35] to-[#5A1224] rounded-3xl p-8 md:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border-2 border-[#C89B3C]/50">
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <span className="bg-[#C89B3C] text-[#2A1B20] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Instant WhatsApp Checkout
              </span>
              <h2 className="serif text-3xl md:text-4xl font-bold leading-tight text-[#F9F1D8]">
                Create your cart, Complete on WhatsApp.
              </h2>
              <p className="text-xs text-[#F9F1D8]/80 leading-relaxed">
                Want personalized assist, size assistance, or direct payment link? Order directly with our team on WhatsApp at +1 952-683-0741!
              </p>
            </div>

            <a
              href="https://wa.me/19526830741?text=Hello%20Sree%20Collections,%20I%20am%20interested%20in%20placing%20an%20order!"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-sm shadow-xl transition flex items-center gap-2 shrink-0 border border-emerald-400"
            >
              <MessageCircle size={20} /> Complete Order on WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// ----------------------------------------------------
// PRODUCT CARD COMPONENT
// ----------------------------------------------------
function ProductCard({ p }) {
  const [adding, setAdding] = useState(false);
  const [wishlistActive, setWishlistActive] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setAdding(true);
      await api.post("/cart/items", { productId: p.id, quantity: 1 });
      alert("Added to cart!");
    } catch (err) {
      alert("Please sign in to add items to cart");
    } finally {
      setAdding(false);
    }
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (wishlistActive) {
        await api.delete(`/wishlist/${p.id}`);
        setWishlistActive(false);
      } else {
        await api.post("/wishlist", { productId: p.id });
        setWishlistActive(true);
      }
    } catch (err) {
      alert("Please sign in to manage wishlist");
    }
  };

  const imgUrl =
    p.images?.[0]?.url ||
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80";

  const discount =
    p.price && p.sellingPrice && p.price > p.sellingPrice
      ? Math.round(((p.price - p.sellingPrice) / p.price) * 100)
      : null;

  return (
    <Link to={`/products/${p.slug || p.id}`} className="group block bg-white rounded-2xl overflow-hidden border border-[#E5D5C0] shadow-sm hover:shadow-xl transition duration-300">
      <div className="relative aspect-[3/4] bg-[#FBF7F0] overflow-hidden">
        <img
          src={imgUrl}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        {discount && (
          <span className="absolute top-3 left-3 bg-[#6B1D34] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            {discount}% OFF
          </span>
        )}

        <button
          onClick={handleWishlist}
          aria-label="Save to Wishlist"
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full text-[#6B1D34] hover:text-[#C89B3C] shadow transition"
        >
          <Heart size={16} className={wishlistActive ? "fill-[#6B1D34] text-[#6B1D34]" : ""} />
        </button>
      </div>

      <div className="p-4">
        <p className="text-[10px] uppercase font-bold tracking-wider text-[#C89B3C]">
          {p.collection?.name || "sreecollections"}
        </p>
        <h3 className="font-semibold text-sm text-[#3A242B] mt-1 line-clamp-1 group-hover:text-[#6B1D34] transition">
          {p.name}
        </h3>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F5E6D3]">
          <div>
            <span className="font-bold text-sm text-[#6B1D34]">{money(p.sellingPrice)}</span>
            {p.price > p.sellingPrice && (
              <span className="line-through text-xs text-[#7A6269] ml-2 font-normal">
                {money(p.price)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={adding || p.stock < 1}
            className="p-2 bg-[#6B1D34] text-white rounded-lg hover:bg-[#521325] disabled:opacity-40 transition text-xs flex items-center gap-1"
            title="Add to Cart"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </Link>
  );
}

// ----------------------------------------------------
// ABOUT US PAGE (EXACT FIGMA FRAME)
// ----------------------------------------------------
function AboutPage() {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <SreeLogo size="lg" />
          <h1 className="serif text-4xl font-bold text-[#6B1D34] mt-4">About sreecollections</h1>
          <p className="text-xs text-[#7A6269] tracking-widest uppercase">BEAUTY • FASHION • STYLE</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#E5D5C0] shadow-sm space-y-6 text-sm text-[#3A242B] leading-relaxed">
          <h2 className="serif text-2xl font-bold text-[#6B1D34]">Our Story & Heritage</h2>
          <p>
            At <strong>sreecollections</strong>, we bring you the finest Indian traditional fashion, handcrafted Kanchipuram silk sarees, temple jewelry, bridal ensembles, and festive home décor.
          </p>
          <p>
            Every piece in our catalog is handpicked by our curators to ensure authentic silk purity, intricate zari weaving, and timeless design elegance for your weddings, poojas, and joyous celebrations.
          </p>

          <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-[#F5E6D3]">
            <div className="p-4 bg-[#FBF7F0] rounded-2xl text-center">
              <h4 className="font-bold text-[#6B1D34] text-sm">Authentic Craftsmanship</h4>
              <p className="text-xs text-[#7A6269] mt-1">Directly sourced from master handloom weavers.</p>
            </div>
            <div className="p-4 bg-[#FBF7F0] rounded-2xl text-center">
              <h4 className="font-bold text-[#6B1D34] text-sm">WhatsApp Concierge</h4>
              <p className="text-xs text-[#7A6269] mt-1">Direct order assistance at +1 952-683-0741.</p>
            </div>
            <div className="p-4 bg-[#FBF7F0] rounded-2xl text-center">
              <h4 className="font-bold text-[#6B1D34] text-sm">Unpacking Guarantee</h4>
              <p className="text-xs text-[#7A6269] mt-1">7-day replacement with unboxing video audit.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ----------------------------------------------------
// PRODUCT DETAIL PAGE (WITH COLOR SWATCHES & SIZE SELECTOR)
// ----------------------------------------------------
function Product() {
  const { slug } = useParams();
  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Wine");
  const [selectedSize, setSelectedSize] = useState("M");
  const nav = useNavigate();

  useEffect(() => {
    api.get(`/products/${slug}`)
      .then((r) => setP(r.data.data))
      .catch(() => setP(null));
  }, [slug]);

  if (!p) {
    return (
      <>
        <Header />
        <div className="p-24 text-center text-xs text-[#7A6269]">Loading product details...</div>
      </>
    );
  }

  const handleAddToCart = async () => {
    try {
      await api.post("/cart/items", { productId: p.id, quantity: qty });
      nav("/cart");
    } catch (e) {
      alert("Please sign in first.");
    }
  };

  const whatsappMsg = `Hello Sree Collections, I want to order "${p.name}" (SKU: ${p.sku}, Size: ${selectedSize}, Color: ${selectedColor}) priced at ${money(p.sellingPrice)}.`;
  const whatsappUrl = `https://wa.me/19526830741?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Images */}
          <div>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-[#FBF7F0] border border-[#E5D5C0]">
              <img
                src={p.images?.[activeImg]?.url || p.images?.[0]?.url || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div>
            {p.images?.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto">
                {p.images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImg(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${activeImg === idx ? "border-[#6B1D34]" : "border-transparent opacity-70"}`}
                  >
                    <img src={img.url} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Selectors */}
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-[#C89B3C]">
                {p.collection?.name} • {p.category?.name}
              </p>
              <h1 className="serif text-3xl md:text-4xl text-[#6B1D34] font-bold mt-2 leading-tight">
                {p.name}
              </h1>
              <p className="text-xs text-[#7A6269] mt-1">SKU: {p.sku}</p>
            </div>

            <div className="flex items-baseline gap-4 py-3 border-y border-[#E5D5C0]">
              <span className="text-3xl font-bold text-[#6B1D34]">{money(p.sellingPrice)}</span>
              {p.price > p.sellingPrice && (
                <span className="line-through text-base text-[#7A6269] font-normal">{money(p.price)}</span>
              )}
              <span className="text-xs font-semibold text-green-800 bg-green-50 px-2.5 py-1 rounded-full">
                Includes {p.gstPercentage}% GST
              </span>
            </div>

            {/* Color Swatch Options (Matching Figma Product Frame) */}
            <div>
              <label className="text-xs font-bold uppercase text-[#3A242B] block mb-2">Color: <span className="font-normal">{selectedColor}</span></label>
              <div className="flex gap-2">
                {[
                  { name: "Wine", bg: "#6B1D34" },
                  { name: "Gold", bg: "#C89B3C" },
                  { name: "Navy", bg: "#1E293B" },
                  { name: "Crimson", bg: "#9F1239" },
                ].map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-8 h-8 rounded-full border-2 transition ${selectedColor === c.name ? "border-[#2A1B20] scale-110 shadow-md" : "border-transparent"}`}
                    style={{ backgroundColor: c.bg }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector Buttons */}
            <div>
              <label className="text-xs font-bold uppercase text-[#3A242B] block mb-2">Select Size</label>
              <div className="flex gap-2">
                {["S", "M", "L", "XL", "XXL"].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl border transition ${selectedSize === sz ? "bg-[#6B1D34] text-white border-[#6B1D34]" : "bg-white text-[#3A242B] border-[#E5D5C0] hover:bg-[#FBF7F0]"}`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-[#5A3A42] leading-relaxed">{p.description}</p>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#6B1D34] text-white py-3.5 rounded-full font-bold hover:bg-[#521325] transition text-xs shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} /> Add to Shopping Cart
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-emerald-700 text-white py-3.5 rounded-full font-bold hover:bg-emerald-800 transition text-xs shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} /> Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ----------------------------------------------------
// OTHER EXISTING PAGES & ROUTES
// ----------------------------------------------------
function Collections() {
  const [cols, setCols] = useState([]);
  useEffect(() => {
    api.get("/collections").then((r) => setCols(r.data.data)).catch(() => {});
  }, []);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest text-[#C89B3C] font-bold">sreecollections</p>
          <h1 className="serif text-4xl text-[#6B1D34] font-bold mt-1">Categories</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cols.map((c) => (
            <Link
              to={`/products?collectionId=${c.id}`}
              key={c.id}
              className="group block bg-white rounded-3xl overflow-hidden border border-[#E5D5C0] shadow-sm hover:shadow-2xl transition duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#FBF7F0]">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <div className="p-6">
                <h2 className="serif text-xl font-bold text-[#6B1D34]">{c.name}</h2>
                <p className="text-xs text-[#7A6269] mt-2">{c.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

function Products() {
  const [data, setData] = useState({ items: [] });
  const [search, setSearch] = useState(new URLSearchParams(location.search).get("search") || "");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    let url = `/products?limit=24&sort=${sort}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    api.get(url).then((r) => setData(r.data.data)).catch(() => {});
  }, [search, sort]);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center pb-6 border-b border-[#E5D5C0]">
          <h1 className="serif text-3xl font-bold text-[#6B1D34]">Catalog</h1>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="border px-4 py-2 rounded-full text-xs">
            <option value="newest">Sort: Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {data.items.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </main>
      <Footer />
    </>
  );
}

function Cart() {
  const [cart, setCart] = useState(null);
  const nav = useNavigate();

  const refreshCart = () => api.get("/cart").then((r) => setCart(r.data.data)).catch(() => {});
  useEffect(() => { refreshCart(); }, []);

  if (!cart) return <><Header /><div className="p-20 text-center text-xs">Please sign in to view cart.</div><Footer /></>;
  const items = cart.items || [];
  const subtotal = items.reduce((s, i) => s + Number(i.product?.sellingPrice || 0) * i.quantity, 0);

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="serif text-3xl font-bold text-[#6B1D34]">Shopping Cart</h1>
        {items.map((i) => (
          <div key={i.id} className="flex gap-4 items-center bg-white p-4 rounded-2xl border my-4">
            <img src={i.product?.images?.[0]?.url} className="w-16 h-20 object-cover rounded" />
            <div className="flex-1">
              <p className="font-bold text-xs">{i.product?.name}</p>
              <p className="text-xs">{money(i.product?.sellingPrice)}</p>
            </div>
            <button onClick={async () => { await api.delete(`/cart/items/${i.id}`); refreshCart(); }} className="text-red-600 text-xs">Remove</button>
          </div>
        ))}
        <div className="text-right mt-6">
          <p className="font-bold text-sm">Subtotal: {money(subtotal)}</p>
          <button onClick={() => nav("/checkout")} className="mt-4 bg-[#6B1D34] text-white px-8 py-3 rounded-full text-xs font-bold">Checkout</button>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Checkout() {
  const [order, setOrder] = useState(null);
  const nav = useNavigate();

  const handlePlaceOrder = async () => {
    const res = await api.post("/orders", { addressId: 1 });
    setOrder(res.data.data);
  };

  if (order) {
    return (
      <>
        <Header />
        <main className="max-w-xl mx-auto px-6 py-20 text-center space-y-4">
          <h1 className="serif text-3xl font-bold text-[#6B1D34]">Order Placed!</h1>
          <p className="text-xs font-bold">Order Number: {order.orderNumber}</p>
          <button onClick={() => nav(`/orders/${order.id}`)} className="px-6 py-3 bg-[#6B1D34] text-white rounded-full text-xs font-bold">View Details</button>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-6 py-12 text-center">
        <h1 className="serif text-3xl font-bold text-[#6B1D34]">Checkout</h1>
        <button onClick={handlePlaceOrder} className="mt-8 px-8 py-4 bg-[#6B1D34] text-white rounded-full font-bold text-xs">Confirm Order</button>
      </main>
      <Footer />
    </>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("sree_token", res.data.data.token);
    nav(res.data.data.user.role === "CUSTOMER" ? "/" : "/admin/dashboard");
  };

  return (
    <>
      <Header />
      <main className="max-w-md mx-auto px-6 py-20">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl border space-y-4">
          <h1 className="serif text-2xl font-bold text-[#6B1D34]">Sign In</h1>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border p-3 rounded-xl text-xs" />
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full border p-3 rounded-xl text-xs" />
          <button className="w-full bg-[#6B1D34] text-white py-3 rounded-full text-xs font-bold">Login</button>
        </form>
      </main>
      <Footer />
    </>
  );
}

function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => { api.get("/orders").then((r) => setOrders(r.data.data)).catch(() => {}); }, []);
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-4">
        <h1 className="serif text-3xl font-bold text-[#6B1D34]">My Orders</h1>
        {orders.map((o) => (
          <div key={o.id} className="bg-white p-5 rounded-2xl border flex justify-between">
            <span className="font-bold text-xs">{o.orderNumber}</span>
            <span className="text-xs font-bold text-[#6B1D34]">{money(o.total)}</span>
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
}

function OrderDetail() {
  return <><Header /><div className="p-20 text-center text-xs">Order details view</div><Footer /></>;
}
function ReturnPolicyPage() {
  return <><Header /><div className="max-w-3xl mx-auto p-12 text-xs leading-relaxed"><h1 className="serif text-3xl font-bold text-[#6B1D34] mb-4">Return Policy</h1><p>7-Day Return Policy with Unboxing Video requirement for damaged items.</p></div><Footer /></>;
}
function ContactPage() {
  return <><Header /><div className="max-w-3xl mx-auto p-12 text-xs"><h1 className="serif text-3xl font-bold text-[#6B1D34] mb-4">Contact Us</h1><p>Email: Sreecollections007@gmail.com | Phone: +1 952-683-0741</p></div><Footer /></>;
}

// ----------------------------------------------------
// ADMIN: CATEGORY MANAGEMENT (List / Add / Edit / Delete)
// ----------------------------------------------------
const emptyCategoryForm = { name: "", collectionId: "", image: "", status: true };

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyCategoryForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const loadData = () => {
    setLoading(true);
    setError("");
    Promise.all([
      api.get("/admin/categories"),
      api.get("/collections"),
    ])
      .then(([catRes, colRes]) => {
        setCategories(catRes.data?.data || []);
        setCollections(colRes.data?.data || []);
      })
      .catch((e) => {
        setError(
          e?.response?.data?.message ||
            "Could not load categories. Please check your connection and try again."
        );
        setCategories([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyCategoryForm);
    setFormError("");
    setShowForm(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setForm({
      name: cat.name || "",
      collectionId: cat.collectionId ? String(cat.collectionId) : "",
      image: cat.image || "",
      status: cat.status !== false,
    });
    setFormError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(emptyCategoryForm);
    setFormError("");
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.collectionId) {
      setFormError("Category name and collection are required.");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      const payload = {
        name: form.name.trim(),
        collectionId: Number(form.collectionId),
        image: form.image.trim(),
        status: Boolean(form.status),
      };
      if (editing) {
        await api.put(`/admin/categories/${editing.id}`, payload);
      } else {
        await api.post("/admin/categories", payload);
      }
      closeForm();
      loadData();
    } catch (e) {
      setFormError(
        e?.response?.data?.message || "Could not save the category. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (cat) => {
    try {
      await api.patch(`/admin/categories/${cat.id}/status`, { status: !cat.status });
      setCategories((prev) =>
        prev.map((c) => (c.id === cat.id ? { ...c, status: !cat.status } : c))
      );
    } catch (e) {
      setError(e?.response?.data?.message || "Could not update category status.");
    }
  };

  const removeCategory = async (cat) => {
    if (!window.confirm(`Delete category "${cat.name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/admin/categories/${cat.id}`);
      setCategories((prev) => prev.filter((c) => c.id !== cat.id));
    } catch (e) {
      setError(e?.response?.data?.message || "Could not delete this category.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="serif text-3xl font-bold text-[#6B1D34]">Categories</h1>
          <p className="text-xs text-[#7A6269] mt-1">
            Manage product categories shown across the storefront.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadData}
            className="border border-[#E5D5C0] text-[#6B1D34] px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-[#FBF7F0] transition"
          >
            <RefreshCcw size={14} /> Refresh
          </button>
          <button
            onClick={openCreate}
            className="bg-[#6B1D34] text-white px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-[#5a1729] transition"
          >
            <Plus size={14} /> Add Category
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-4 flex justify-between items-center">
          <span>{error}</span>
          <button onClick={loadData} className="font-bold underline">Retry</button>
        </div>
      )}

      <div className="mt-6 bg-white rounded-3xl border border-[#E5D5C0] overflow-hidden">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center text-[#7A6269] gap-3">
            <Loader2 size={22} className="animate-spin" />
            <span className="text-xs">Loading categories...</span>
          </div>
        ) : categories.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center gap-3">
            <Tag size={28} className="text-[#C89B3C]" />
            <p className="text-sm font-bold text-[#6B1D34]">No categories found</p>
            <p className="text-xs text-[#7A6269] max-w-xs">
              You haven't added any categories yet. Click "Add Category" to create your first one.
            </p>
            <button
              onClick={openCreate}
              className="mt-2 bg-[#6B1D34] text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2"
            >
              <Plus size={14} /> Add Category
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#FBF7F0] text-left text-[#7A6269] uppercase tracking-wider">
                  <th className="p-4 font-bold">Image</th>
                  <th className="p-4 font-bold">Name</th>
                  <th className="p-4 font-bold">Slug</th>
                  <th className="p-4 font-bold">Collection</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c.id} className="border-t border-[#E5D5C0]">
                    <td className="p-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#FBF7F0] border border-[#E5D5C0]">
                        {c.image ? (
                          <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#C89B3C]">
                            <Tag size={16} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-[#2A1B20]">{c.name}</td>
                    <td className="p-4 text-[#7A6269]">{c.slug}</td>
                    <td className="p-4 text-[#7A6269]">{c.collection?.name || "—"}</td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleStatus(c)}
                        className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase ${
                          c.status
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {c.status ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(c)}
                          className="p-2 rounded-full border border-[#E5D5C0] hover:bg-[#FBF7F0] text-[#6B1D34]"
                          title="Edit category"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => removeCategory(c)}
                          className="p-2 rounded-full border border-[#E5D5C0] hover:bg-red-50 text-red-600"
                          title="Delete category"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="serif text-xl font-bold text-[#6B1D34]">
                {editing ? "Edit Category" : "Add Category"}
              </h2>
              <button onClick={closeForm} className="text-[#7A6269]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submitForm} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-[#7A6269]">Category Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-[#E5D5C0] rounded-xl px-4 py-2.5 text-xs mt-1"
                  placeholder="e.g. Sarees"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-[#7A6269]">Collection *</label>
                <select
                  value={form.collectionId}
                  onChange={(e) => setForm({ ...form, collectionId: e.target.value })}
                  className="w-full border border-[#E5D5C0] rounded-xl px-4 py-2.5 text-xs mt-1"
                >
                  <option value="">Select a collection</option>
                  {collections.map((col) => (
                    <option key={col.id} value={col.id}>{col.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-[#7A6269]">Image URL</label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full border border-[#E5D5C0] rounded-xl px-4 py-2.5 text-xs mt-1"
                  placeholder="https://..."
                />
              </div>

              <label className="flex items-center gap-2 text-xs font-bold text-[#6B1D34]">
                <input
                  type="checkbox"
                  checked={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.checked })}
                />
                Active (visible on storefront)
              </label>

              {formError && <p className="text-xs text-red-600">{formError}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 border border-[#E5D5C0] text-[#6B1D34] py-2.5 rounded-full text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-[#6B1D34] text-white py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  {editing ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// ADMIN SHELL (Sidebar + Routed Sections)
// ----------------------------------------------------
function Admin({ page = "dashboard" }) {
  const nav = useNavigate();

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, to: "/admin/dashboard" },
    { key: "categories", label: "Categories", icon: Tag, to: "/admin/categories" },
    { key: "products", label: "Products", icon: Package, to: "/admin/products" },
    { key: "orders", label: "Orders", icon: ShoppingCart, to: "/admin/orders" },
    { key: "customers", label: "Customers", icon: Users, to: "/admin/customers" },
    { key: "returns", label: "Returns", icon: RotateCcw, to: "/admin/returns" },
    { key: "reviews", label: "Reviews", icon: Star, to: "/admin/reviews" },
    { key: "contact", label: "Contact", icon: Phone, to: "/admin/contact" },
  ];

  return (
    <div className="min-h-screen bg-[#FBF7F0]">
      <header className="bg-[#2A1B20] text-white p-4 flex justify-between items-center">
        <span className="serif font-bold">sreecollections Admin</span>
        <button onClick={() => { localStorage.removeItem("sree_token"); nav("/"); }}><LogOut size={16} /></button>
      </header>
      <div className="flex">
        <aside className="w-56 shrink-0 bg-white border-r border-[#E5D5C0] min-h-[calc(100vh-64px)] p-4 hidden md:block">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = page === item.key;
              return (
                <Link
                  key={item.key}
                  to={item.to}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                    active
                      ? "bg-[#6B1D34] text-white"
                      : "text-[#6B1D34] hover:bg-[#FBF7F0]"
                  }`}
                >
                  <Icon size={15} /> {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="flex-1 p-8">
          {page === "categories" ? (
            <AdminCategories />
          ) : page === "dashboard" ? (
            <>
              <h1 className="serif text-3xl font-bold text-[#6B1D34]">Admin Dashboard</h1>
              <p className="text-xs mt-2">Manage products, orders, and customer returns.</p>
            </>
          ) : (
            <>
              <h1 className="serif text-3xl font-bold text-[#6B1D34] capitalize">{page}</h1>
              <p className="text-xs mt-2 text-[#7A6269]">This section is coming soon.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MAIN ROUTER APP COMPONENT
// ----------------------------------------------------
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:slug" element={<Product />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:id" element={<OrderDetail />} />
      <Route path="/return-policy" element={<ReturnPolicyPage />} />
      <Route path="/contact" element={<ContactPage />} />

      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/dashboard" element={<Admin page="dashboard" />} />
      <Route path="/admin/categories" element={<Admin page="categories" />} />
      <Route path="/admin/products" element={<Admin page="products" />} />
      <Route path="/admin/orders" element={<Admin page="orders" />} />
      <Route path="/admin/customers" element={<Admin page="customers" />} />
      <Route path="/admin/returns" element={<Admin page="returns" />} />
      <Route path="/admin/reviews" element={<Admin page="reviews" />} />
      <Route path="/admin/contact" element={<Admin page="contact" />} />

      <Route path="*" element={<Home />} />
    </Routes>
  );
}
