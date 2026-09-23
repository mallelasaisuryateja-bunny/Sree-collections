import {
  ArrowRight,
  Award,
  ChevronRight,
  Facebook,
  Filter,
  Heart,
  Instagram,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  Package,
  Phone,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
  Trash2,
  Truck,
  User,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { api } from "./api";
const logoImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAABLCAYAAAAicppkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAivSURBVHhe7Zt/TJTnHcA/lAM9PfQ8oQJWYayOFX8wHYjDBlfEXtQIsxJrZaYZ2DjD5prW1MXQJe1IncY2VkOYm9AYRqfG6rBDdxNRiBAcKAUVg7YEIfJD4HbIyQke3v5Qzrunx8vBvWC7vJ+/7v1+vy/J+3mf532e530fvAb6e20ouOQ5MaDwFEWOBIocCRQ5EihyJFDkSKDIkUCRI4EiRwJFjgSKHAkUORIociRQ5EigyJFAkSOBIkcCr+/Km8C2hkbaG25jbG3DbOrmoeUBAD7qiWi0U9EFBTIjLITAsFDx1DHj2cmx2ag5V0pd+SW+qfoKS48ZjU6LLjgQP50OX/VEAPotD+gxGjG2tGE2mlD7afhh1E+IiI0hcnkceHmJf1k2xl2O2Wii/IsC/vOlAavVyry4WOZELyJ0QQRTA/zFcie6OzpprK3jVuUVrpWWo1KpWLxGT+y6JDQ6rVjuMeMq53zeUYrzjvD87FksWbuaRfoEvFXeYplbDFgHuGIoouJkIXebmonftIFXNr0ulnnEuMhprqvn1P6D3OvoJCE1hejVerHEI6oKDZzNzWdKgD+J27YwKyJcLBkVYy6nqtDAyb1ZLNTHszp9M2o/jVgiC5YeM4VZh6g2FLN2ezpRMtyAMZVzPu8oRbn5rEpPY2lykpgeE8qOF3A6K4eE1BSPu9mYyRkUsz5j++NRZRypOVfKscy9Hgsak0lgVaHBYzFt9Rdoq78ght0icnkc6zO2U5SbT1WhQUy7jexymuvqObk3i1XpaSMS01p31v67z9xFfUk29SXZ9Jm7XNYMR+TyOFalp3FybxbNdfVi2i1kl3Nq/0EW6uNH/IzpvH2ZpuoT2Gw2rp3ZxUB/LwP9vVw7swubzUZT9Qk6b18WT5NkaXISC/XxnNp/UEy5haxyzucd5V5HJ6vTN4upYdEGvcTXZZ9RfWIH3e1P73R3ez3VJ3bwddlnaINecjrHHVanb+ZeRyfn846KqWGRTY7ZaKI47wgrUlNGNVxPCfwxAKbWG2LKHhusGQlqPw0JqSkU5x3BbDSJaUlkG63+/dfD1F+6zG8P7RdTbvFowMrtqmNi2ImQqPU8560Sw25xYPM2wmN+yqtvvSmmhkQeOTYbmUkp6Le8KfvsVy4qCw0YDh4moyDf7cWqLN2q5lwpVquVRfoEMfWdYZE+AavVSs25UjE1JLLIqSu/xLy42FEvIuWm19hEr7HJKeat8mZeXCx15Zec4lLI0q0yEzey5ne/HtG8BsDU0clHv0ih606rmAJg26EDRCYssx8PV5+84y3mLw3lZulfAFiyMYtJutn2fM25Ur789M9knPrc4ayh8bjltDU0YukxE7ogQkxJciY7l3ej4wH4uLKYnMZachpriX0tEYDpM4MIiZwLQN/9XnZvSHVZn7zjbQB81WpeeHEKjRIP9dAFEVh6zLQ1NIopl3gsp73hNhqddtgXVY40Xr1un5ilfLATrcO5v/zjTn60JIrwmGi0Af6YOjp5/9W13KyoYvrMIHb+I9+pfuXWVGJfS8RPp2Wgr5X+XhNhizd+q9UATA3wR6PT0t5w2yk+FB7LMba2oQsOFMOS3Lh4iX6LBYCWW9845SZMnsSCZS8TPCcMgC927bN3I1HkIFGrVhAeE02v8RYA/225/i0xg+iCAzG2tolhl3gsx2zqxk+nE8Nuc3z3Pt5bqsfU0WmPrdyaysqtqTRevU7VmcfrKcduJhKZsIy0TzLtx6Y7V7E9sjrVDOKn02E2dYthl3gs56Hlgf1luLv8LDmR6TOD7Mddd1p5NzqetNAF5LyTYY87trDBbiaFNngeADbbIx70dJGZtJHMpI1ONb7qifYvG8PhsZzRoA3wZ0+Zwf7wdaT8xCl2b0il734vLbca7PHBbibFJO1M++/++09X86PFYzk+6on0u3knRNI+ySSnsZaPK4udWtLNiiquXSijs6XFqX44JmqetixvXzUZBZ+TUeA8bPdbHuDjZkv3WI5GO5Ueo1EMu2RwSK4pKnGKiy3JV61m+uxg/IODneqGIuedDGqKSvD2eXrRvuqpTjWD9BiNaLSucyIey9EFBWJsce/pb+ntpav5Dv86dJi++71i2k5o5FyCwn7A8l+9ga9aDUBtyUWX55zJziV4TtjjyeKTNdOESdPwnex6kDC2tKELcm909VjOjLAQzEYT3Q6jzVCY2trpMZq4WVHFvrTfOF1sTVEJ5SdOMX1mEFsO7GHC5EmEzp9L4rYt8KSr/e39j+z1g62w5VYDK7emAvDQcg+AabMX2usc6e7oxGw0MSMsREy5ZFyXD2eyc6ktuUhX8x2XS4DkHW/bL9QRV8sGX7WaHcdyCZ3/dHhvqMijseoYkYkfMH32Int8kJEuH2SR8/cP9+Dj60vy7x9P5Z8Vtf/8EEt3KzEp2WIKgON/2sfD/n7e+MN7YsolHncrgIjYGK6VljNgHRBT44bN9ghT6w1Colx/ihmwDnCttJyI2BgxNSSyyIlcHodKpeKKoUhMjRvG5q/Q6GYRGP5zMQXAFUMRKpVq2K7viCxy8PJi8Ro9FScLxcy40X6zhPD4bWLYTsXJQhav0bv9FhDZ5ACx65K429RMpQcf0UZLv8XE8y++zORpL4gpePKR8W5TM7HrRva5SDY5Gp2W+E0bKMrNx9JjFtNjirdqAv6h0WIYnmwwOJubT/ymDSPewyObHIBXNr3OlAB/CrMOiakxxdvn8UTRFYVZh5gS4D+qb+ayygFI3LaFakMxZccLxNS4U3a8gGpDsX0iOVJklzMrIpy129M5nZUzojf9clNzrpTTWTms3Z4+6s1MsssBiFqtJyE1hWOZe5+JIMctKJ5sYpJlhjwUyualYVC2vQ2D44bJFR42dVdUPtks9b3bMOmIstV2GJRN2u6gbO93H+UfQ75njMkk8P8FRY4EihwJFDkSKHIkUORIoMiRQJEjgSJHAkWOBP8DwejisHqwzKUAAAAASUVORK5CYII=";

const money = (n) => `₹${Number(n || 0).toFixed(2)}`;

// ----------------------------------------------------
// BRAND LOGO COMPONENT (MATCHING FIGMA SPECIFICATION)
// ----------------------------------------------------
function SreeLogo({ size = "md", dark = false }) {
  return (
    <Link to="/" className="flex items-center gap-3 group shrink-0">
      {/* Real Logo Image */}
      <div className={`relative flex items-center justify-center rounded-full overflow-hidden ${size === "lg" ? "w-14 h-14" : "w-10 h-10"}`}>
        <img src={logoImg} alt="Sree Collections" className="w-full h-full object-contain" />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span className={`serif font-bold tracking-wider leading-none ${size === "lg" ? "text-2xl" : "text-xl"} ${dark ? "text-[var(--color-cream)]" : "text-[var(--color-wine)]"}`}>
          sreecollections
        </span>
        <span className={`tracking-[0.25em] uppercase font-bold mt-1 ${size === "lg" ? "text-[10px]" : "text-[8px]"} ${dark ? "text-[var(--color-gold)]" : "text-[var(--color-wine)]"}`}>
          BEAUTY • FASHION • STYLE
        </span>
      </div>
    </Link>
  );
}

// ----------------------------------------------------
// DECORATIVE BRAND WATERMARK (ornamental flourish, used
// as a subtle background accent behind section headings)
// ----------------------------------------------------
function BrandWatermark({ color = "var(--color-wine)", opacity = 0.08, className = "", preserveAspectRatio }) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      style={{ opacity }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...(preserveAspectRatio ? { preserveAspectRatio } : {})}
    >
      {/* Large flowing "S" vine flourish */}
      <path
        d="M420 60
           C 300 40, 190 90, 190 190
           C 190 280, 320 280, 320 370
           C 320 460, 210 500, 120 470"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Secondary echo curve */}
      <path
        d="M470 120
           C 370 105, 280 150, 280 230
           C 280 300, 380 300, 380 380
           C 380 450, 290 485, 210 465"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Leaf accents along the vine */}
      <path d="M420 60 C 445 55, 465 68, 462 90 C 440 92, 418 82, 420 60 Z" fill={color} />
      <path d="M190 190 C 165 185, 148 200, 152 222 C 176 222, 195 210, 190 190 Z" fill={color} />
      <path d="M320 370 C 345 365, 365 378, 362 400 C 340 402, 318 392, 320 370 Z" fill={color} />
      <circle cx="120" cy="470" r="6" fill={color} />
      <circle cx="420" cy="60" r="4" fill={color} />
    </svg>
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
      nav(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
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
      <div className="bg-[var(--color-wine)] text-[var(--color-cream)] text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles size={14} className="text-[var(--color-gold)]" />
        <span>Free Delivery on Orders Above ₹199 • Order Direct via WhatsApp +1 651-706-6485</span>
      </div>

      <header className="sticky top-0 z-40 bg-[var(--color-cream)]/95 backdrop-blur border-b border-[var(--color-border)] transition-all">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <button
            aria-label="Toggle Menu"
            className="md:hidden p-2 text-[var(--color-wine)] hover:bg-[var(--color-cream-alt)] rounded-lg"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <SreeLogo />

          {/* Nav Links (Matching Screenshot Specification: Home, About, Categories, CONTACT US Pill) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[var(--color-wine-muted)]">
            <Link
              to="/"
              className={`relative py-1 transition ${
                location.pathname === "/"
                  ? "text-[var(--color-wine)] font-bold border-b-2 border-[var(--color-wine)]"
                  : "hover:text-[var(--color-wine)]"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`relative py-1 transition ${
                location.pathname === "/about"
                  ? "text-[var(--color-wine)] font-bold border-b-2 border-[var(--color-wine)]"
                  : "hover:text-[var(--color-wine)]"
              }`}
            >
              About
            </Link>
            <Link
              to="/collections"
              className={`relative py-1 transition ${
                location.pathname === "/collections"
                  ? "text-[var(--color-wine)] font-bold border-b-2 border-[var(--color-wine)]"
                  : "hover:text-[var(--color-wine)]"
              }`}
            >
              Categories
            </Link>
            <Link
              to="/contact"
              className="bg-[var(--color-gold-dark)] hover:bg-[var(--color-gold-dark)] text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center"
            >
              CONTACT US
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center border border-[var(--color-gold)]/40 bg-white rounded-full px-3 py-1.5 w-52 focus-within:ring-2 focus-within:ring-[var(--color-wine)]/30">
              <Search size={15} className="text-[var(--color-wine)] ml-1" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none px-2 text-xs w-full text-[var(--color-wine-muted)]"
                placeholder="Search outfits, jewelry..."
              />
            </form>

            <Link to="/search" className="lg:hidden p-2 text-[var(--color-wine)] hover:bg-[var(--color-cream-alt)] rounded-full transition" title="Search">
              <Search size={20} />
            </Link>

            <Link to="/wishlist" className="relative p-2 text-[var(--color-wine)] hover:bg-[var(--color-cream-alt)] rounded-full transition" title="Wishlist">
              <Heart size={20} />
              {wishCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--color-wine)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishCount}
                </span>
              )}
            </Link>

            <button onClick={onOpenCart} className="relative p-2 text-[var(--color-wine)] hover:bg-[var(--color-cream-alt)] rounded-full transition" title="Cart Drawer">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--color-gold)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account dropdown */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 text-xs font-semibold text-[var(--color-wine)] hover:bg-[var(--color-cream-alt)] rounded-full transition"
                >
                  <div className="w-8 h-8 rounded-full bg-[var(--color-wine)] text-white flex items-center justify-center text-xs font-bold uppercase shadow">
                    {user.name?.[0] || "U"}
                  </div>
                </button>
              ) : (
                <Link to="/login" className="p-2 text-[var(--color-wine)] hover:bg-[var(--color-cream-alt)] rounded-full transition" title="Account">
                  <User size={20} />
                </Link>
              )}

              {userMenuOpen && user && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-[var(--color-border)] py-2 z-50">
                  <div className="px-4 py-2 border-b border-[var(--color-cream-deep)]">
                    <p className="text-xs text-[var(--color-mauve)]">Signed in as</p>
                    <p className="text-sm font-bold text-[var(--color-wine)] truncate">{user.name}</p>
                    <span className="inline-block mt-1 text-[10px] bg-[var(--color-cream-alt)] text-[var(--color-wine)] px-2 py-0.5 rounded font-bold uppercase">
                      {user.role}
                    </span>
                  </div>

                  <Link to="/orders" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-xs text-[var(--color-wine-muted)] hover:bg-[var(--color-cream)]">
                    <Package size={15} /> My Orders
                  </Link>

                  {(user.role === "ADMIN" || user.role === "STAFF") && (
                    <Link to="/admin/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-xs text-[var(--color-wine)] font-bold hover:bg-[var(--color-cream)]">
                      <LayoutDashboard size={15} /> Admin Portal
                    </Link>
                  )}

                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 text-left border-t border-[var(--color-cream-deep)] mt-1">
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-cream)] px-6 py-4 space-y-3 font-semibold text-sm text-[var(--color-wine-muted)]">
            <form onSubmit={handleSearch} className="flex items-center border border-[var(--color-gold)]/40 bg-white rounded-full px-3 py-2 w-full mb-3">
              <Search size={16} className="text-[var(--color-wine)] ml-1" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none px-2 text-xs w-full text-[var(--color-wine-muted)]"
                placeholder="Search outfits, jewelry..."
              />
            </form>

            <Link to="/" onClick={() => setOpen(false)} className={`block py-1 ${location.pathname === '/' ? 'text-[var(--color-wine)] font-bold' : ''}`}>Home</Link>
            <Link to="/about" onClick={() => setOpen(false)} className={`block py-1 ${location.pathname === '/about' ? 'text-[var(--color-wine)] font-bold' : ''}`}>About</Link>
            <Link to="/collections" onClick={() => setOpen(false)} className={`block py-1 ${location.pathname === '/collections' ? 'text-[var(--color-wine)] font-bold' : ''}`}>Categories</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="inline-block mt-2 bg-[var(--color-gold-dark)] text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider">CONTACT US</Link>
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
    <footer className="mt-24 bg-[var(--color-ink)] text-[var(--color-cream)]">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <SreeLogo size="lg" dark />
          <p className="mt-4 text-xs text-[var(--color-cream)]/80 leading-relaxed">
            Curated Indian heritage fashion, Kanchipuram silk sarees, temple jewelry, bridal ensembles, and festive home décor crafted with timeless artistry.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.instagram.com/sreecollections007?igsh=cGliZ2xlZ2w3Nnlq"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white/10 hover:bg-[var(--color-wine)] rounded-full transition text-white"
              title="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.facebook.com/share/1FeXcHxQLh/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white/10 hover:bg-[var(--color-wine)] rounded-full transition text-white"
              title="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="mailto:sreecollections007@gmail.com"
              className="p-2.5 bg-white/10 hover:bg-[var(--color-wine)] rounded-full transition text-white"
              title="Email Us"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://wa.me/16517066485"
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
          <h4 className="font-bold text-sm text-[var(--color-gold)] tracking-wider uppercase mb-4">Shop Categories</h4>
          <ul className="space-y-2.5 text-xs opacity-80">
            <li><Link to="/products?category=Casual+Wear" className="hover:text-[var(--color-gold)] transition">Casual Wear & Co-ords</Link></li>
            <li><Link to="/products?category=Sarees" className="hover:text-[var(--color-gold)] transition">Kanchipuram & Banarasi Sarees</Link></li>
            <li><Link to="/products?category=One+Gram+Gold+Jewellery" className="hover:text-[var(--color-gold)] transition">One Gram Gold Jewellery</Link></li>
            <li><Link to="/products?category=Decorative+Items" className="hover:text-[var(--color-gold)] transition">Decorative Items & Diyas</Link></li>
            <li><Link to="/products?category=Lehengas+%26+Half+Sarees" className="hover:text-[var(--color-gold)] transition">Bridal Lehengas & Half Sarees</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm text-[var(--color-gold)] tracking-wider uppercase mb-4">Customer Support</h4>
          <ul className="space-y-2.5 text-xs opacity-80">
            <li><Link to="/about" className="hover:text-[var(--color-gold)] transition">About Sree Collections</Link></li>
            <li><Link to="/return-policy" className="hover:text-[var(--color-gold)] transition">Return & Replacement Policy</Link></li>
            <li><Link to="/contact" className="hover:text-[var(--color-gold)] transition">Contact Us</Link></li>
            <li><Link to="/orders" className="hover:text-[var(--color-gold)] transition">Track Your Order</Link></li>
            <li><Link to="/admin/login" className="hover:text-[var(--color-gold)] transition">Staff & Admin Portal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm text-[var(--color-gold)] tracking-wider uppercase mb-4">Direct Contact</h4>
          <div className="space-y-3 text-xs opacity-80">
            <p className="flex items-center gap-2">
              <Mail size={14} className="text-[var(--color-gold)]" />
              <span>sreecollections007@gmail.com</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone size={14} className="text-[var(--color-gold)]" />
              <span>+1 651-706-6485 / +91-9526830741</span>
            </p>
            <p className="flex items-center gap-2">
              <MessageCircle size={14} className="text-emerald-400" />
              <span>Instant WhatsApp Order Assist</span>
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] leading-relaxed opacity-70">
              <span className="text-[var(--color-gold)] font-semibold">Damaged Claim Notice:</span> An unedited unboxing video from original parcel seal opening is compulsory for damaged replacement claims.
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
// HOME PAGE (MATCHING ALL FIGMA FRAMES & SCREENSHOTS)
// ----------------------------------------------------
function Home({ onOpenCart, onOpenWhatsAppModal }) {
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
        <section className="relative bg-[var(--color-cream)] py-16 md:py-24 border-b border-[var(--color-border)] overflow-hidden">
          {/* Decorative flourish specific to hero content stays removed here — 
              a site-wide fixed version now lives in App() so it shows on every page and while scrolling */}

          <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[var(--color-wine)] uppercase bg-[var(--color-wine)]/10 px-3.5 py-1.5 rounded-full">
                <Sparkles size={14} className="text-[var(--color-gold)]" /> Beauty • Fashion • Style
              </span>
              <h1 className="serif text-4xl md:text-6xl text-[var(--color-wine)] font-bold leading-[1.15]">
                Dive Into A World Of Endless Fashion Possibilities
              </h1>
              <p className="text-base text-[var(--color-wine-soft)] max-w-lg leading-relaxed">
                Discover handcrafted Kanchipuram silk sarees, temple jewelry, festive outfits, and home décor curated for grand Indian celebrations.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/products"
                  className="px-8 py-3.5 bg-[var(--color-wine)] text-white font-bold rounded-full shadow-lg hover:bg-[var(--color-wine-dark)] transition flex items-center gap-2 text-sm"
                >
                  Explore Collection <ArrowRight size={16} />
                </Link>
                <button
                  onClick={() => onOpenWhatsAppModal()}
                  className="px-7 py-3.5 bg-emerald-700 text-white font-bold rounded-full hover:bg-emerald-800 transition flex items-center gap-2 text-sm shadow-md"
                >
                  <MessageCircle size={18} /> Order on WhatsApp
                </button>
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
                <div className="bg-white p-4 rounded-2xl shadow-md border border-[var(--color-border)] text-center">
                  <p className="serif font-bold text-sm text-[var(--color-wine)]">Saree Collection</p>
                  <p className="text-[10px] text-[var(--color-mauve)]">Pure Silk & Zari Handlooms</p>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="bg-white p-4 rounded-2xl shadow-md border border-[var(--color-border)] text-center">
                  <p className="serif font-bold text-sm text-[var(--color-wine)]">Temple Jewelry</p>
                  <p className="text-[10px] text-[var(--color-mauve)]">22K Gold Finish Craftsmanship</p>
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

        {/* WHY CHOOSE SREE COLLECTIONS & FREE DELIVERY BANNERS (SCREEN 2 & 3) */}
        <section className="bg-white py-12 border-b border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            {/* 3 Pillars Banner (Screen 3) */}
            <div>
              <h3 className="serif text-center text-2xl font-bold text-[var(--color-wine)] mb-8">Why Choose SREE Collections</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-6 rounded-2xl bg-[var(--color-cream)] border border-[var(--color-border)] flex flex-col items-center">
                  <div className="w-12 h-12 bg-[var(--color-wine)] text-[var(--color-gold)] rounded-full flex items-center justify-center mb-3 shadow">
                    <Award size={24} />
                  </div>
                  <h4 className="font-bold text-base text-[var(--color-wine-muted)]">100% Cotton & Pure Silk</h4>
                  <p className="text-xs text-[var(--color-mauve)] mt-1">Top quality natural fabrics & handlooms</p>
                </div>

                <div className="p-6 rounded-2xl bg-[var(--color-cream)] border border-[var(--color-border)] flex flex-col items-center">
                  <div className="w-12 h-12 bg-[var(--color-wine)] text-[var(--color-gold)] rounded-full flex items-center justify-center mb-3 shadow">
                    <Truck size={24} />
                  </div>
                  <h4 className="font-bold text-base text-[var(--color-wine-muted)]">Free Shipping</h4>
                  <p className="text-xs text-[var(--color-mauve)] mt-1">Available on all orders above $199-</p>
                </div>

                <div className="p-6 rounded-2xl bg-[var(--color-cream)] border border-[var(--color-border)] flex flex-col items-center">
                  <div className="w-12 h-12 bg-[var(--color-wine)] text-[var(--color-gold)] rounded-full flex items-center justify-center mb-3 shadow">
                    <RotateCcw size={24} />
                  </div>
                  <h4 className="font-bold text-base text-[var(--color-wine-muted)]">Easy Returns</h4>
                  <p className="text-xs text-[var(--color-mauve)] mt-1">7-day replacement with unpacking video</p>
                </div>
              </div>
            </div>

            {/* Free Delivery Banner (Screen 2) */}
            <div className="bg-[var(--color-cream)] rounded-3xl p-8 border border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-[var(--color-wine)] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <Truck size={40} className="text-[var(--color-gold)]" />
                </div>
                <div>
                  <h3 className="serif text-3xl font-bold text-[var(--color-wine)]">Free Delivery</h3>
                  <p className="text-sm font-semibold text-[var(--color-gold)] mt-1">Order above $199-</p>
                </div>
              </div>
              <Link to="/products" className="px-6 py-3 bg-[var(--color-wine)] text-white font-bold rounded-full text-xs hover:bg-[var(--color-wine-dark)] transition">
                Shop Eligible Items
              </Link>
            </div>
          </div>
        </section>

        {/* CATEGORY SHOWCASE MASONRY GRID (SCREEN 2 & 3) */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-widest text-[var(--color-gold)] font-bold">Featured Catalog</p>
            <h2 className="serif text-3xl md:text-4xl text-[var(--color-wine)] font-bold mt-1">Explore By Categories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Casual Wear */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[var(--color-border)] shadow-sm hover:shadow-xl transition group">
              <div className="aspect-[4/3] bg-[var(--color-cream)] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
                  alt="Casual Wear"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="serif text-xl font-bold text-[var(--color-wine)]">Casual Wear Collection</h3>
                <p className="text-xs text-[var(--color-mauve)] mt-2">Chic fusion kurtis, floral co-ord sets, and executive dresses.</p>
                <Link to="/products?category=Casual+Wear" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[var(--color-wine)] hover:underline">
                  Explore Casual Wear <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Sarees & Jewellery */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[var(--color-border)] shadow-sm hover:shadow-xl transition group">
              <div className="aspect-[4/3] bg-[var(--color-cream)] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
                  alt="One Gram Gold Jewellery"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="serif text-xl font-bold text-[var(--color-wine)]">One Gram Gold Jewellery</h3>
                <p className="text-xs text-[var(--color-mauve)] mt-2">Temple antique harams, bridal chokers, bangles, and jhumkas.</p>
                <Link to="/products?category=One+Gram+Gold+Jewellery" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[var(--color-wine)] hover:underline">
                  Explore Jewellery <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Decorative Items */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[var(--color-border)] shadow-sm hover:shadow-xl transition group">
              <div className="aspect-[4/3] bg-[var(--color-cream)] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
                  alt="Decorative Items"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="serif text-xl font-bold text-[var(--color-wine)]">Decorative Item Collection</h3>
                <p className="text-xs text-[var(--color-mauve)] mt-2">Traditional brass diyas, torans, pooja decor, and return gifts.</p>
                <Link to="/products?category=Decorative+Items" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[var(--color-wine)] hover:underline">
                  Explore Decor <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* STYLING BANNER (YOUR STYLE | YOUR RULES) */}
        <section className="bg-[var(--color-cream)] py-12 border-y border-[var(--color-border)] text-center space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)]">Your Style • Your Rules</p>
          <h2 className="serif text-4xl font-bold text-[var(--color-wine)]">Empower Your Fashion</h2>
          <div className="pt-2">
            <Link to="/products" className="px-8 py-3 bg-[var(--color-wine)] text-white font-bold rounded-full text-xs shadow-md hover:bg-[var(--color-wine-dark)] transition">
              Shop The Trends
            </Link>
          </div>
        </section>

        {/* FEATURED PRODUCTS GRID */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--color-gold)] font-bold">Handpicked Collections</p>
              <h2 className="serif text-3xl md:text-4xl text-[var(--color-wine)] font-bold mt-1">Featured Apparel & Accessories</h2>
            </div>
            <Link to="/products" className="text-xs font-bold text-[var(--color-wine)] hover:underline flex items-center gap-1">
              View All Products <ChevronRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-16 text-xs text-[var(--color-mauve)]">Loading collections...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} p={p} onOpenWhatsAppModal={onOpenWhatsAppModal} />
              ))}
            </div>
          )}
        </section>

        {/* WHATSAPP ORDER BANNER (EXACT FIGMA RED LUXURY BANNER) */}
        <section className="max-w-7xl mx-auto px-6 py-10">
          <div className="bg-gradient-to-r from-[var(--color-wine)] via-[var(--color-wine-dark)] to-[var(--color-wine-dark)] rounded-3xl p-8 md:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border-2 border-[var(--color-gold)]/50">
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <span className="bg-[var(--color-gold)] text-[var(--color-ink)] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Shopping Made Personal
              </span>
              <h2 className="serif text-3xl md:text-4xl font-bold leading-tight text-[var(--color-cream)]">
                Curate your cart. Complete on WhatsApp.
              </h2>
              <p className="text-xs text-[var(--color-cream)]/80 leading-relaxed">
                Want personalized assistance, custom sizing, or instant stock confirmation? Order directly with our team on WhatsApp!
              </p>
            </div>

            <button
              onClick={() => onOpenWhatsAppModal()}
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-sm shadow-xl transition flex items-center gap-2 shrink-0 border border-emerald-400"
            >
              <MessageCircle size={20} /> Order via WhatsApp
            </button>
          </div>
        </section>

        {/* TESTIMONIALS SECTION (WHAT OUR CUSTOMER SAYS) */}
        <section className="bg-white py-16 border-t border-[var(--color-border)]">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-[var(--color-gold)] font-bold">What our Customer says</p>
              <h2 className="serif text-3xl font-bold text-[var(--color-wine)]">Love From Our Shoppers</h2>
            </div>

            <div className="bg-[var(--color-cream)] p-8 rounded-3xl border border-[var(--color-border)] space-y-4 text-left shadow-sm">
              <div className="flex gap-1 text-[var(--color-gold)]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="serif text-base text-[var(--color-wine-muted)] font-medium leading-relaxed italic">
                "The Kanchipuram silk saree arrived in beautiful packaging! The gold zari work and silk softness were beyond expectations. Direct WhatsApp order was super easy and fast."
              </p>
              <div className="pt-2 border-t border-[var(--color-border)] flex justify-between items-center text-xs">
                <span className="font-bold text-[var(--color-wine)]">Priya Sharma</span>
                <span className="text-[var(--color-mauve)]">Verified Buyer • California, USA</span>
              </div>
            </div>
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
function ProductCard({ p, onOpenWhatsAppModal }) {
  const [adding, setAdding] = useState(false);
  const [wishlistActive, setWishlistActive] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setAdding(true);
      await api.post("/cart/items", { productId: p.id, quantity: 1 });
      alert("Item added to cart!");
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
    <div className="group block bg-white rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-sm hover:shadow-xl transition duration-300 relative">
      <Link to={`/products/${p.slug || p.id}`} className="block relative aspect-[3/4] bg-[var(--color-cream)] overflow-hidden">
        <img
          src={imgUrl}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        {discount && (
          <span className="absolute top-3 left-3 bg-[var(--color-wine)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shadow">
            {discount}% OFF
          </span>
        )}

        <button
          onClick={handleWishlist}
          aria-label="Save to Wishlist"
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full text-[var(--color-wine)] hover:text-[var(--color-gold)] shadow transition z-10"
        >
          <Heart size={16} className={wishlistActive ? "fill-[var(--color-wine)] text-[var(--color-wine)]" : ""} />
        </button>
      </Link>

      <div className="p-4">
        <p className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-gold)]">
          {p.category?.name || p.collection?.name || "sreecollections"}
        </p>
        <Link to={`/products/${p.slug || p.id}`}>
          <h3 className="font-semibold text-sm text-[var(--color-wine-muted)] mt-1 line-clamp-1 group-hover:text-[var(--color-wine)] transition">
            {p.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[var(--color-cream-deep)]">
          <div>
            <span className="font-bold text-sm text-[var(--color-wine)]">{money(p.sellingPrice)}</span>
            {p.price > p.sellingPrice && (
              <span className="line-through text-xs text-[var(--color-mauve)] ml-2 font-normal">
                {money(p.price)}
              </span>
            )}
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => onOpenWhatsAppModal && onOpenWhatsAppModal(p)}
              className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-xs flex items-center justify-center"
              title="Order on WhatsApp"
            >
              <MessageCircle size={14} />
            </button>
            <button
              onClick={handleAddToCart}
              disabled={adding || p.stock < 1}
              className="p-2 bg-[var(--color-wine)] text-white rounded-lg hover:bg-[var(--color-wine-dark)] disabled:opacity-40 transition text-xs flex items-center gap-1"
              title="Add to Cart"
            >
              <ShoppingBag size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// CATEGORY / ALL PRODUCTS PAGE (MATCHING IMAGE 4 SCREENSHOT)
// ----------------------------------------------------
function Products({ onOpenWhatsAppModal }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "All Products";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [sort, setSort] = useState("newest");

  const categoriesList = [
    "All Products",
    "Casual Wear",
    "Sarees",
    "One Gram Gold Jewellery",
    "Decorative Items",
    "Lehengas & Half Sarees"
  ];

  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "₹10 - ₹100", min: 10, max: 100, value: "10-100" },
    { label: "₹100 - ₹200", min: 100, max: 200, value: "100-200" },
    { label: "₹200 - ₹300", min: 200, max: 300, value: "200-300" },
    { label: "₹300+", min: 300, max: 10000, value: "300+" },
  ];

  useEffect(() => {
    setLoading(true);
    let url = `/products?limit=30&sort=${sort}`;
    api.get(url)
      .then((r) => setProducts(r.data.data.items || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [sort]);

  const filteredProducts = products.filter((p) => {
    // Filter Category
    if (selectedCategory !== "All Products") {
      const matchCat = p.category?.name?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                       p.collection?.name?.toLowerCase().includes(selectedCategory.toLowerCase());
      if (!matchCat) return false;
    }
    // Filter Price
    if (selectedPriceRange !== "all") {
      const range = priceRanges.find((r) => r.value === selectedPriceRange);
      if (range) {
        if (p.sellingPrice < range.min || p.sellingPrice > range.max) return false;
      }
    }
    return true;
  });

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">sreecollections</p>
          <h1 className="serif text-4xl font-bold text-[var(--color-wine)] mt-1">All Products</h1>
        </div>

        <div className="grid md:grid-cols-4 gap-8 items-start">
          {/* SIDEBAR FILTERS (EXACT FIGMA SPECIFICATION) */}
          <aside className="bg-white p-6 rounded-3xl border border-[var(--color-border)] shadow-sm space-y-6">
            <div>
              <h3 className="serif text-lg font-bold text-[var(--color-wine)] mb-3 flex items-center justify-between">
                <span>Categories</span>
                <Filter size={16} className="text-[var(--color-gold)]" />
              </h3>
              <ul className="space-y-2 text-xs">
                {categoriesList.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left py-1.5 px-3 rounded-xl font-medium transition ${
                        selectedCategory === cat
                          ? "bg-[var(--color-wine)] text-white font-bold"
                          : "text-[var(--color-wine-muted)] hover:bg-[var(--color-cream)]"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[var(--color-cream-deep)]">
              <h3 className="serif text-lg font-bold text-[var(--color-wine)] mb-3">Price Range</h3>
              <div className="space-y-2 text-xs">
                {priceRanges.map((r) => (
                  <label key={r.value} className="flex items-center gap-2 cursor-pointer text-[var(--color-wine-muted)]">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={selectedPriceRange === r.value}
                      onChange={() => setSelectedPriceRange(r.value)}
                      className="accent-[var(--color-wine)]"
                    />
                    <span>{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-cream-deep)]">
              <h3 className="serif text-lg font-bold text-[var(--color-wine)] mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {["all", "S", "M", "L", "XL", "XXL"].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition ${
                      selectedSize === sz
                        ? "bg-[var(--color-wine)] text-white border-[var(--color-wine)]"
                        : "bg-white text-[var(--color-wine-muted)] border-[var(--color-border)] hover:bg-[var(--color-cream)]"
                    }`}
                  >
                    {sz === "all" ? "All Sizes" : sz}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedCategory("All Products");
                setSelectedPriceRange("all");
                setSelectedSize("all");
              }}
              className="w-full text-xs font-bold text-[var(--color-wine)] border border-[var(--color-wine)] py-2 rounded-full hover:bg-[var(--color-wine)] hover:text-white transition"
            >
              Reset Filters
            </button>
          </aside>

          {/* MAIN PRODUCT CATALOG GRID */}
          <div className="md:col-span-3 space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-[var(--color-border)]">
              <p className="text-xs text-[var(--color-mauve)] font-medium">
                Showing <strong className="text-[var(--color-wine)]">{filteredProducts.length}</strong> items
              </p>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-[var(--color-border)] bg-[var(--color-cream)] px-4 py-2 rounded-full text-xs font-semibold text-[var(--color-wine-muted)] outline-none"
              >
                <option value="newest">Sort: Newest Arrivals</option>
                <option value="price_asc">Sort: Price (Low to High)</option>
                <option value="price_desc">Sort: Price (High to Low)</option>
              </select>
            </div>

            {loading ? (
              <div className="text-center py-20 text-xs text-[var(--color-mauve)]">Loading products...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white p-16 text-center rounded-3xl border border-[var(--color-border)] space-y-3">
                <Package size={32} className="mx-auto text-[var(--color-gold)]" />
                <h3 className="serif text-xl font-bold text-[var(--color-wine)]">No products match selected filters</h3>
                <p className="text-xs text-[var(--color-mauve)]">Try resetting your category or price range filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} p={p} onOpenWhatsAppModal={onOpenWhatsAppModal} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ----------------------------------------------------
// PRODUCT DETAIL PAGE (MATCHING IMAGE 5 TOP SCREENSHOT)
// ----------------------------------------------------
function Product({ onOpenWhatsAppModal }) {
  const { slug } = useParams();
  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Wine");
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeTab, setActiveTab] = useState("policy");
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
        <div className="p-24 text-center text-xs text-[var(--color-mauve)]">Loading product details...</div>
      </>
    );
  }

  const handleAddToCart = async () => {
    try {
      await api.post("/cart/items", { productId: p.id, quantity: qty });
      alert("Added to cart!");
    } catch (e) {
      alert("Please sign in first.");
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-[var(--color-mauve)] flex items-center gap-2">
          <Link to="/" className="hover:underline">Home</Link> /
          <Link to="/products" className="hover:underline">Products</Link> /
          <span className="text-[var(--color-wine)] font-bold">{p.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Product Image Gallery with Thumbnails */}
          <div>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-[var(--color-cream)] border border-[var(--color-border)] shadow-md">
              <img
                src={p.images?.[activeImg]?.url || p.images?.[0]?.url || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"}
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
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition ${activeImg === idx ? "border-[var(--color-wine)] scale-105 shadow-md" : "border-transparent opacity-70"}`}
                  >
                    <img src={img.url} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Selection Controls */}
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-[var(--color-wine-soft)]">
                {p.collection?.name} • {p.category?.name}
              </p>
              <h1 className="serif text-3xl md:text-4xl text-[var(--color-wine)] font-bold mt-2 leading-tight">
                {p.name}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex text-[var(--color-gold)]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="text-xs text-[var(--color-mauve)] font-medium">
                  ({p.reviewsCount || 24} customer reviews)
                </span>
                <span className="text-xs text-[var(--color-mauve)]">| SKU: {p.sku}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-4 py-4 border-y border-[var(--color-border)]">
              <span className="text-3xl font-bold text-[var(--color-wine)]">{money(p.sellingPrice)}</span>
              {p.price > p.sellingPrice && (
                <span className="line-through text-base text-[var(--color-mauve)] font-normal">{money(p.price)}</span>
              )}
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Includes {p.gstPercentage || 5}% GST
              </span>
            </div>

            {/* Color Swatch Selector (Matching Figma Product Detail Frame) */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-wine-muted)] block mb-2">
                Color: <span className="font-semibold text-[var(--color-wine)]">{selectedColor}</span>
              </label>
              <div className="flex gap-3">
                {[
                  { name: "Wine Maroon", bg: "var(--color-wine)" },
                  { name: "Luxe Gold", bg: "var(--color-gold)" },
                  { name: "Navy Blue", bg: "var(--color-slate)" },
                  { name: "Emerald Green", bg: "var(--color-status-green)" },
                  { name: "Magenta", bg: "var(--color-status-red)" },
                ].map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-9 h-9 rounded-full border-2 transition ${selectedColor === c.name ? "border-[var(--color-ink)] scale-110 shadow-lg ring-2 ring-[var(--color-gold)]" : "border-transparent opacity-85 hover:opacity-100"}`}
                    style={{ backgroundColor: c.bg }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector Buttons */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-wine-muted)] block mb-2">Select Size</label>
              <div className="flex gap-2">
                {["S", "M", "L", "XL", "XXL"].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl border transition ${selectedSize === sz ? "bg-[var(--color-wine)] text-white border-[var(--color-wine)] shadow-md" : "bg-white text-[var(--color-wine-muted)] border-[var(--color-border)] hover:bg-[var(--color-cream)]"}`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-[var(--color-wine-soft)] leading-relaxed">{p.description}</p>

            <div className="flex gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[var(--color-wine)] text-white py-4 rounded-full font-bold hover:bg-[var(--color-wine-dark)] transition text-xs shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} /> Add to Cart
              </button>
              <button
                onClick={() => onOpenWhatsAppModal && onOpenWhatsAppModal(p)}
                className="flex-1 bg-emerald-600 text-white py-4 rounded-full font-bold hover:bg-emerald-700 transition text-xs shadow-lg flex items-center justify-center gap-2 border border-emerald-400"
              >
                <MessageCircle size={16} /> Order via WhatsApp
              </button>
            </div>

            {/* Accordion / Details Tabs Section (Matching Image 5) */}
            <div className="border border-[var(--color-border)] rounded-2xl bg-[var(--color-cream)] p-5 space-y-4">
              <div className="flex border-b border-[var(--color-border)] pb-2 gap-4 text-xs font-bold">
                <button onClick={() => setActiveTab("policy")} className={`pb-2 border-b-2 transition ${activeTab === "policy" ? "border-[var(--color-wine)] text-[var(--color-wine)]" : "border-transparent text-[var(--color-mauve)]"}`}>
                  Return Policy
                </button>
                <button onClick={() => setActiveTab("size")} className={`pb-2 border-b-2 transition ${activeTab === "size" ? "border-[var(--color-wine)] text-[var(--color-wine)]" : "border-transparent text-[var(--color-mauve)]"}`}>
                  Size & Fit
                </button>
                <button onClick={() => setActiveTab("shipping")} className={`pb-2 border-b-2 transition ${activeTab === "shipping" ? "border-[var(--color-wine)] text-[var(--color-wine)]" : "border-transparent text-[var(--color-mauve)]"}`}>
                  Shipping Info
                </button>
              </div>

              {activeTab === "policy" && (
                <div className="text-xs text-[var(--color-wine-soft)] space-y-2 leading-relaxed">
                  <p className="font-bold text-[var(--color-wine)]">Damaged Claims Policy:</p>
                  <p>If the product is damaged then the return will be applicable. For Damaged product, an <strong>unpacking video must</strong> be provided from original parcel opening without cuts or edits.</p>
                </div>
              )}
              {activeTab === "size" && (
                <div className="text-xs text-[var(--color-wine-soft)] space-y-1">
                  <p>Fits true to standard Indian sizing guidelines.</p>
                  <p>Custom blouses & alter options available via WhatsApp support.</p>
                </div>
              )}
              {activeTab === "shipping" && (
                <div className="text-xs text-[var(--color-wine-soft)] space-y-1">
                  <p>Free Express Shipping across India on orders over ₹199.</p>
                  <p>Dispatched within 24-48 business hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ----------------------------------------------------
// ABOUT US PAGE (MATCHING IMAGE 5 BOTTOM SCREENSHOT)
// ----------------------------------------------------
function AboutPage() {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <SreeLogo size="lg" />
          <h1 className="serif text-4xl font-bold text-[var(--color-wine)] mt-4">Where Tradition Meets Elegance</h1>
          <p className="text-xs text-[var(--color-gold)] tracking-widest uppercase font-bold">Celebrating Indian culture, fashion, and traditions—one beautiful collection at a time.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl border border-[var(--color-border)] shadow-sm space-y-6 text-sm text-[var(--color-wine-muted)] leading-relaxed">
          <p>
            Welcome to <strong>Sree Collections</strong>, your destination for beautiful Indian fashion, jewelry, and traditional décor. We bring together timeless designs and modern styles to help you celebrate your special moments with elegance and charm.
          </p>
          <p>
            From beautiful sarees and ethnic wear to traditional jewelry and decorative pieces, our collections are thoughtfully selected for weddings, festivals, cultural celebrations, parties, gifting, and everyday occasions.
          </p>

          {/* DETAILED 3-COLUMN COLLECTION DIRECTORY (EXACT USER REQUEST SPECIFICATION) */}
          <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-[var(--color-cream-deep)]">
            {/* Column 1: Indian Fashion */}
            <div className="bg-[var(--color-cream)] p-6 rounded-2xl border border-[var(--color-border)] space-y-3">
              <h3 className="serif text-lg font-bold text-[var(--color-wine)] flex items-center gap-2">
                <span>👗 Indian Fashion</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-[var(--color-wine-soft)]">
                <li>• Sarees</li>
                <li>• Silk & Kanchipuram Sarees</li>
                <li>• Banarasi & Pochampally Sarees</li>
                <li>• Cotton & Fancy Sarees</li>
                <li>• Lehengas & Half Sarees</li>
                <li>• Salwar Suits & Kurtis</li>
                <li>• Designer & Ready-to-Wear Blouses</li>
                <li>• Indo-Western Wear</li>
                <li>• Men’s Traditional Wear</li>
                <li>• Kids’ Ethnic Wear</li>
              </ul>
            </div>

            {/* Column 2: Indian Jewelry & Accessories */}
            <div className="bg-[var(--color-cream)] p-6 rounded-2xl border border-[var(--color-border)] space-y-3">
              <h3 className="serif text-lg font-bold text-[var(--color-wine)] flex items-center gap-2">
                <span>👑 Indian Jewelry</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-[var(--color-wine-soft)]">
                <li>• Temple Jewelry</li>
                <li>• Bridal Jewelry</li>
                <li>• Gold-Look & Traditional Jewelry</li>
                <li>• Bangles</li>
                <li>• Jhumkas & Earrings</li>
                <li>• Necklaces & Harams</li>
                <li>• Maang Tikkas</li>
                <li>• Hair Accessories</li>
                <li>• Traditional & Fashion Accessories</li>
              </ul>
            </div>

            {/* Column 3: Indian Décor & Celebration */}
            <div className="bg-[var(--color-cream)] p-6 rounded-2xl border border-[var(--color-border)] space-y-3">
              <h3 className="serif text-lg font-bold text-[var(--color-wine)] flex items-center gap-2">
                <span>🪔 Indian Décor</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-[var(--color-wine-soft)]">
                <li>• Traditional Indian Home Décor</li>
                <li>• Pooja & Festival Décor</li>
                <li>• Wedding Décor Items</li>
                <li>• Torans & Door Hangings</li>
                <li>• Decorative Diyas</li>
                <li>• Flower & Floral Décor</li>
                <li>• Traditional Decorative Pieces</li>
                <li>• Gift & Return-Gift Items</li>
                <li>• Festive & Cultural Décor</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[var(--color-cream-deep)] space-y-3">
            <h3 className="serif text-2xl font-bold text-[var(--color-wine)]">Our Promise</h3>
            <p className="text-xs text-[var(--color-wine-soft)] leading-relaxed">
              At Sree Collections, we believe Indian tradition is beautiful, meaningful, and meant to be celebrated. We carefully select our products with a focus on quality, elegance, traditional beauty, and affordability. Whether you’re searching for a stunning saree, beautiful Indian jewelry, a thoughtful gift, or traditional décor for your home or celebration, we hope to make your shopping experience special and memorable.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ----------------------------------------------------
// CONTACT US PAGE (MATCHING IMAGE 7 BOTTOM-LEFT SCREENSHOT)
// ----------------------------------------------------
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg("");
    try {
      const res = await api.post("/contact", form);
      setStatusMsg(res.data.message || "Thank you! Your message has been sent.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setStatusMsg("Could not submit. Please check details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">Get In Touch</p>
          <h1 className="serif text-4xl font-bold text-[var(--color-wine)]">
            For Any Inquiries, Our Team Is Completely At Your Disposal.
          </h1>
        </div>

        {/* 3 Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[var(--color-border)] text-center shadow-sm space-y-2">
            <div className="w-12 h-12 bg-[var(--color-wine)] text-white rounded-full flex items-center justify-center mx-auto mb-3">
              <Phone size={20} />
            </div>
            <h4 className="font-bold text-sm text-[var(--color-wine-muted)]">Call / WhatsApp</h4>
            <p className="text-xs text-[var(--color-mauve)]">+1 651-706-6485</p>
            <p className="text-xs text-[var(--color-mauve)]">+91-9526830741</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[var(--color-border)] text-center shadow-sm space-y-2">
            <div className="w-12 h-12 bg-[var(--color-wine)] text-white rounded-full flex items-center justify-center mx-auto mb-3">
              <Mail size={20} />
            </div>
            <h4 className="font-bold text-sm text-[var(--color-wine-muted)]">Email Inquiries</h4>
            <p className="text-xs text-[var(--color-mauve)]">sreecollections007@gmail.com</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[var(--color-border)] text-center shadow-sm space-y-2">
            <div className="w-12 h-12 bg-[var(--color-wine)] text-white rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageCircle size={20} />
            </div>
            <h4 className="font-bold text-sm text-[var(--color-wine-muted)]">Social Media</h4>
            <p className="text-xs text-[var(--color-mauve)]">Instagram: @sreecollections007</p>
            <p className="text-xs text-[var(--color-mauve)]">Facebook: Sree Collections</p>
          </div>
        </div>

        {/* Form + Banner Grid (Matching Image 7) */}
        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl border border-[var(--color-border)] overflow-hidden shadow-sm">
          <div className="p-8 md:p-12 space-y-6">
            <h3 className="serif text-2xl font-bold text-[var(--color-wine)]">Fill Out the Form to Get in Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-[var(--color-mauve)]">Your Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full border border-[var(--color-border)] rounded-xl p-3 text-xs mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase text-[var(--color-mauve)]">Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@email.com"
                    className="w-full border border-[var(--color-border)] rounded-xl p-3 text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-[var(--color-mauve)]">Phone / WhatsApp</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 651-706-6485"
                    className="w-full border border-[var(--color-border)] rounded-xl p-3 text-xs mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-[var(--color-mauve)]">Subject</label>
                <input
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Saree customization / Bulk decor inquiry"
                  className="w-full border border-[var(--color-border)] rounded-xl p-3 text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-[var(--color-mauve)]">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Write your query here..."
                  className="w-full border border-[var(--color-border)] rounded-xl p-3 text-xs mt-1"
                />
              </div>

              {statusMsg && <p className="text-xs font-bold text-emerald-700">{statusMsg}</p>}

              <button
                disabled={submitting}
                className="w-full bg-[var(--color-wine)] text-white py-3.5 rounded-full font-bold text-xs hover:bg-[var(--color-wine-dark)] transition"
              >
                {submitting ? "Sending..." : "Submit Message"}
              </button>
            </form>
          </div>

          <div className="bg-[var(--color-cream)] p-8 md:p-12 flex flex-col justify-center items-center text-center border-l border-[var(--color-border)]">
            <div className="w-20 h-20 bg-[var(--color-wine)] text-[var(--color-gold)] rounded-3xl flex items-center justify-center mb-6 shadow-xl">
              <MessageCircle size={40} />
            </div>
            <h3 className="serif text-2xl font-bold text-[var(--color-wine)]">Prefer Instant WhatsApp Response?</h3>
            <p className="text-xs text-[var(--color-mauve)] mt-2 max-w-xs leading-relaxed">
              Connect directly with our style concierge on WhatsApp for live video product previews and stock updates!
            </p>
            <a
              href="https://wa.me/16517066485?text=Hello%20Sree%20Collections,%20I%20have%20an%20inquiry!"
              target="_blank"
              rel="noreferrer"
              className="mt-6 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-xs shadow-md transition flex items-center gap-2"
            >
              <MessageCircle size={16} /> Chat on WhatsApp Now
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ----------------------------------------------------
// SEARCH PAGE (MATCHING IMAGE 7 BOTTOM-RIGHT SCREENSHOT)
// ----------------------------------------------------
function SearchPage({ onOpenWhatsAppModal }) {
  const location = useLocation();
  const searchQ = new URLSearchParams(location.search).get("q") || "";
  const [query, setQuery] = useState(searchQ);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let url = `/products?limit=24`;
    if (query) url += `&search=${encodeURIComponent(query)}`;
    api.get(url)
      .then((r) => setProducts(r.data.data.items || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-4">
          <h1 className="serif text-3xl md:text-4xl font-bold text-[var(--color-wine)]">
            Looking for something special? Your perfect outfit is just a search away.
          </h1>

          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by saree, jewelry, color or occasion..."
              className="w-full border-2 border-[var(--color-gold)] bg-white rounded-full px-6 py-3.5 text-sm outline-none shadow-md"
            />
            <Search size={20} className="absolute right-5 top-4 text-[var(--color-wine)]" />
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-2 text-xs">
            <span className="text-[var(--color-mauve)] font-bold">Quick Suggestions:</span>
            {["Casual Wear", "Sarees", "One Gram Gold Jewellery", "Decorative Items", "Lehengas"].map((pill) => (
              <button
                key={pill}
                onClick={() => setQuery(pill)}
                className="px-3 py-1 bg-[var(--color-cream)] border border-[var(--color-border)] rounded-full hover:bg-[var(--color-wine)] hover:text-white transition font-semibold text-[var(--color-wine)]"
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-xs text-[var(--color-mauve)]">Searching collection...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} p={p} onOpenWhatsAppModal={onOpenWhatsAppModal} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

// ----------------------------------------------------
// RETURN POLICY PAGE (DISPLAYED AFTER ORDER IS RECEIVED)
// ----------------------------------------------------
function ReturnPolicyPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders")
      .then((r) => setOrders(r.data.data || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const deliveredOrders = orders.filter((o) =>
    ["DELIVERED", "RECEIVED", "COMPLETED"].includes(o.orderStatus?.toUpperCase())
  );
  const hasReceivedOrders = deliveredOrders.length > 0;

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        <div className="border-b border-[var(--color-border)] pb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">sreecollections</p>
          <h1 className="serif text-4xl font-bold text-[var(--color-wine)] mt-1">Return & Replacement Policy</h1>
        </div>

        {loading ? (
          <div className="text-center py-16 text-xs text-[var(--color-mauve)]">Checking order delivery status...</div>
        ) : !hasReceivedOrders ? (
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-[var(--color-border)] shadow-sm space-y-6 text-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto shadow">
              <RotateCcw size={32} />
            </div>
            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="serif text-2xl font-bold text-[var(--color-wine)]">Return Policy Available After Order Delivery</h2>
              <p className="text-xs text-[var(--color-wine-soft)] leading-relaxed">
                The Return & Replacement Policy and damaged parcel claim filing options are displayed after your order has been received. Once your parcel is delivered, view <strong>My Orders</strong> to inspect return guidelines and file replacement claims.
              </p>
            </div>
            <div className="pt-2">
              <Link to="/orders" className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--color-wine)] text-white font-bold rounded-full text-xs shadow hover:bg-[var(--color-wine-dark)] transition">
                <Package size={16} /> View My Orders
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-[var(--color-border)] shadow-sm space-y-6 text-sm text-[var(--color-wine-muted)] leading-relaxed">
            <div className="bg-[var(--color-wine)] text-white p-6 rounded-2xl space-y-2">
              <h3 className="serif text-lg font-bold text-[var(--color-gold)] flex items-center gap-2">
                <ShieldCheck size={20} /> Damaged Product Return Guarantee (Order Received)
              </h3>
              <p className="text-xs text-[var(--color-cream)]">
                Your order has been received. If the product is damaged then the return will be applicable. For Damaged product, <strong>unpacking video must</strong> be provided without any cuts or edits.
              </p>
            </div>

            <h3 className="serif text-xl font-bold text-[var(--color-wine)]">1. Mandatory Unboxing Video Protocol</h3>
            <p>
              To claim a replacement or refund for damaged or defective items received, customers must record a continuous unboxing video starting from showing the original intact shipping label on the sealed parcel box to opening and inspecting the item.
            </p>

            <h3 className="serif text-xl font-bold text-[var(--color-wine)]">2. Return Eligibility & Timeframe</h3>
            <ul className="space-y-2 text-xs text-[var(--color-wine-soft)] list-disc pl-5">
              <li>Return requests must be initiated within <strong>7 days</strong> of delivery.</li>
              <li>Item must be unused, unwashed, and in original tags and packaging.</li>
              <li>Custom stitched blouses and modified products are non-returnable unless damaged in transit.</li>
            </ul>

            <h3 className="serif text-xl font-bold text-[var(--color-wine)]">3. File Return Claim for Delivered Order</h3>
            <p className="text-xs text-[var(--color-wine-soft)]">
              Select your delivered order under <Link to="/orders" className="font-bold text-[var(--color-wine)] underline">My Orders</Link> to file a Damaged Parcel Return Claim directly.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

// ----------------------------------------------------
// CART SLIDE-OVER DRAWER (MATCHING IMAGE 7 TOP-LEFT)
// ----------------------------------------------------
function CartDrawer({ open, onClose, onOpenWhatsAppModal }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCart = () => {
    setLoading(true);
    api.get("/cart")
      .then((r) => setCart(r.data.data))
      .catch(() => setCart(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (open) loadCart();
  }, [open]);

  if (!open) return null;

  const items = cart?.items || [];
  const subtotal = items.reduce((sum, item) => sum + Number(item.product?.sellingPrice || 0) * item.quantity, 0);

  const handleUpdateQty = async (itemId, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;
    try {
      await api.put(`/cart/items/${itemId}`, { quantity: newQty });
      loadCart();
    } catch (e) {
      loadCart();
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await api.delete(`/cart/items/${itemId}`);
      loadCart();
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-6 bg-[var(--color-wine)] text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[var(--color-gold)]" />
            <h2 className="serif text-xl font-bold">Your Shopping Cart</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {loading ? (
            <div className="text-center py-16 text-xs text-[var(--color-mauve)]">Loading cart items...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag size={32} className="mx-auto text-[var(--color-gold)]" />
              <p className="font-bold text-sm text-[var(--color-wine)]">Your cart is empty</p>
              <p className="text-xs text-[var(--color-mauve)]">Browse our sarees, jewelry and decor to add items!</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center bg-[var(--color-cream)] p-3 rounded-2xl border border-[var(--color-border)]">
                <img
                  src={item.product?.images?.[0]?.url || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80"}
                  alt={item.product?.name}
                  className="w-16 h-20 object-cover rounded-xl border border-[var(--color-border)]"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-xs text-[var(--color-wine-muted)] line-clamp-1">{item.product?.name}</h4>
                  <p className="text-xs font-bold text-[var(--color-wine)] mt-1">{money(item.product?.sellingPrice)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleUpdateQty(item.id, item.quantity, -1)}
                      className="w-6 h-6 rounded bg-white border font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQty(item.id, item.quantity, 1)}
                      className="w-6 h-6 rounded bg-white border font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => handleRemove(item.id)} className="text-red-600 p-2 hover:bg-red-50 rounded-full">
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[var(--color-border)] bg-[var(--color-cream)] space-y-4">
            <div className="flex justify-between items-center text-sm font-bold">
              <span>Subtotal:</span>
              <span className="text-[var(--color-wine)] text-lg">{money(subtotal)}</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenWhatsAppModal();
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-full font-bold text-xs shadow-lg transition flex items-center justify-center gap-2 border border-emerald-400"
            >
              <MessageCircle size={18} /> Checkout via WhatsApp
            </button>

            <Link
              to="/checkout"
              onClick={onClose}
              className="w-full block text-center bg-[var(--color-wine)] text-white py-3 rounded-full font-bold text-xs hover:bg-[var(--color-wine-dark)] transition"
            >
              Proceed to Regular Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// ORDER CONFIRM VIA WHATSAPP MODAL (MATCHING IMAGE 6 SCREENSHOT)
// ----------------------------------------------------
function WhatsAppModal({ open, onClose, product }) {
  const [customerName, setCustomerName] = useState("");
  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [address, setAddress] = useState("");

  if (!open) return null;

  const handleProceedWhatsApp = (e) => {
    e.preventDefault();
    const targetProduct = product?.name ? product.name : "Cart Collections";
    const msg = `Hello Sree Collections, I want to confirm my order for "${targetProduct}".\nName: ${customerName}\nWhatsApp Phone: ${whatsappPhone}\nShipping Address: ${address}`;
    const url = `https://wa.me/16517066485?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[var(--color-cream)] rounded-3xl max-w-md w-full p-8 border-2 border-[var(--color-gold)] shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-[var(--color-mauve)] hover:text-[var(--color-wine)]">
          <X size={20} />
        </button>

        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg ring-4 ring-emerald-100">
            <MessageCircle size={36} />
          </div>

          <h3 className="serif text-2xl font-bold text-[var(--color-wine)]">Order Confirm via WhatsApp</h3>
          <p className="text-xs text-[var(--color-wine-soft)] leading-relaxed">
            We will check product availability, size option and stock for your requested items and message you back for final payment and delivery details.
          </p>
        </div>

        <form onSubmit={handleProceedWhatsApp} className="mt-6 space-y-4">
          <div>
            <label className="text-[10px] font-bold uppercase text-[var(--color-mauve)]">Your Name *</label>
            <input
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Full Name"
              className="w-full border border-[var(--color-border)] bg-white rounded-xl p-3 text-xs mt-1"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-[var(--color-mauve)]">WhatsApp Phone Number *</label>
            <input
              required
              value={whatsappPhone}
              onChange={(e) => setWhatsappPhone(e.target.value)}
              placeholder="+1 651-706-6485"
              className="w-full border border-[var(--color-border)] bg-white rounded-xl p-3 text-xs mt-1"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-[var(--color-mauve)]">Delivery City / Address Notes</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="City, State / ZIP code"
              className="w-full border border-[var(--color-border)] bg-white rounded-xl p-3 text-xs mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-full font-bold text-xs shadow-xl transition flex items-center justify-center gap-2 border border-emerald-400 mt-2"
          >
            <MessageCircle size={18} /> Complete Order on WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// FORGOT PASSWORD PAGE
// ----------------------------------------------------
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setMessage("If an account exists for that email, we've sent password reset instructions.");
    } catch (err) {
      if (err.response?.status === 404) {
        setMessage("Password reset via email isn't set up yet. Please reach out via WhatsApp and our team will help you reset your password.");
      } else {
        setError(err.response?.data?.message || "Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-md mx-auto px-6 py-20">
        <div className="bg-white p-8 rounded-3xl border border-[var(--color-border)] shadow-sm space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="serif text-2xl font-bold text-[var(--color-wine)]">Forgot Password</h1>
            <p className="text-xs text-[var(--color-mauve)]">Enter your account email and we'll help you get back in.</p>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border p-3 rounded-xl text-xs" />
            {message && <p className="text-xs text-emerald-700">{message}</p>}
            {error && <p className="text-xs text-red-600">{error}</p>}
            <button disabled={submitting} className="w-full bg-[var(--color-wine)] text-white py-3 rounded-full text-xs font-bold disabled:opacity-60">
              {submitting ? "Sending..." : "Send Reset Instructions"}
            </button>
          </form>

          <div className="pt-3 mt-1 border-t border-[var(--color-beige)] text-center">
            <p className="text-xs text-[var(--color-mauve)]">
              Remembered your password?{" "}
              <Link to="/login" className="text-[var(--color-wine)] font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ----------------------------------------------------
// CHANGE PASSWORD PAGE
// ----------------------------------------------------
function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/auth/change-password", { currentPassword, newPassword });
      setMessage("Your password has been updated.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      if (err.response?.status === 404) {
        setMessage("Changing your password here isn't set up yet. Please reach out via WhatsApp and our team will help you.");
      } else {
        setError(err.response?.data?.message || "Could not change password. Please make sure you're signed in and try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-md mx-auto px-6 py-20">
        <div className="bg-white p-8 rounded-3xl border border-[var(--color-border)] shadow-sm space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="serif text-2xl font-bold text-[var(--color-wine)]">Change Password</h1>
            <input required type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current Password" className="w-full border p-3 rounded-xl text-xs" />
            <input required type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password (min. 6 characters)" className="w-full border p-3 rounded-xl text-xs" />
            <input required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" className="w-full border p-3 rounded-xl text-xs" />
            {message && <p className="text-xs text-emerald-700">{message}</p>}
            {error && <p className="text-xs text-red-600">{error}</p>}
            <button disabled={submitting} className="w-full bg-[var(--color-wine)] text-white py-3 rounded-full text-xs font-bold disabled:opacity-60">
              {submitting ? "Updating..." : "Update Password"}
            </button>
          </form>

          <div className="pt-3 mt-1 border-t border-[var(--color-beige)] text-center">
            <p className="text-xs text-[var(--color-mauve)]">
              <Link to="/login" className="text-[var(--color-wine)] font-bold hover:underline">
                Back to Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ----------------------------------------------------
// AUTHENTICATION & LOGIN PAGE
// ----------------------------------------------------
function Login() {
  const location = useLocation();
  const mode = location.pathname === "/register" ? "register" : "login";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("sree_token", res.data.data.token);
      nav(res.data.data.user.role === "CUSTOMER" ? "/" : "/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Could not log in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("Name, email and password are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.post("/auth/register", { name, email, phone, password });
      localStorage.setItem("sree_token", res.data.data.token);
      nav("/");
    } catch (err) {
      setError(err.response?.data?.message || "Could not create account.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-md mx-auto px-6 py-20">
        <div className="bg-white p-8 rounded-3xl border border-[var(--color-border)] shadow-sm space-y-4">
          {mode === "login" ? (
            <>
              <form onSubmit={handleLogin} className="space-y-4">
                <h1 className="serif text-2xl font-bold text-[var(--color-wine)]">Sign In</h1>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border p-3 rounded-xl text-xs" />
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full border p-3 rounded-xl text-xs" />
                <div className="text-right -mt-2">
                  <Link to="/forgot-password" className="text-xs text-[var(--color-wine)] font-bold hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                {error && <p className="text-xs text-red-600">{error}</p>}
                <button disabled={submitting} className="w-full bg-[var(--color-wine)] text-white py-3 rounded-full text-xs font-bold disabled:opacity-60">
                  {submitting ? "Signing in..." : "Login"}
                </button>
              </form>

              <div className="pt-3 mt-1 border-t border-[var(--color-beige)] space-y-2 text-center">
                <p className="text-xs text-[var(--color-mauve)]">
                  New to Sree Collections?{" "}
                  <Link to="/register" className="text-[var(--color-wine)] font-bold hover:underline">
                    Create a new account
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <>
              <form onSubmit={handleRegister} className="space-y-4">
                <h1 className="serif text-2xl font-bold text-[var(--color-wine)]">Create Your Account</h1>
                <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full border p-3 rounded-xl text-xs" />
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border p-3 rounded-xl text-xs" />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" className="w-full border p-3 rounded-xl text-xs" />
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min. 6 characters)" className="w-full border p-3 rounded-xl text-xs" />
                <input required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="w-full border p-3 rounded-xl text-xs" />
                {error && <p className="text-xs text-red-600">{error}</p>}
                <button disabled={submitting} className="w-full bg-[var(--color-wine)] text-white py-3 rounded-full text-xs font-bold disabled:opacity-60">
                  {submitting ? "Creating account..." : "Create Account"}
                </button>
              </form>

              <div className="pt-3 mt-1 border-t border-[var(--color-beige)] text-center">
                <p className="text-xs text-[var(--color-mauve)]">
                  Already have an account?{" "}
                  <Link to="/login" className="text-[var(--color-wine)] font-bold hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

// ----------------------------------------------------
// ORDERS & ADMIN DASHBOARD COMPONENTS
// ----------------------------------------------------
function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeClaimOrder, setActiveClaimOrder] = useState(null);
  const [reason, setReason] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [claimStatusMsg, setClaimStatusMsg] = useState("");
  const [submittingClaim, setSubmittingClaim] = useState(false);

  useEffect(() => {
    api.get("/orders")
      .then((r) => setOrders(r.data.data || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    if (!activeClaimOrder) return;
    setSubmittingClaim(true);
    setClaimStatusMsg("");
    try {
      await api.post("/returns", {
        orderId: activeClaimOrder.id,
        reason,
        unpackingVideoUrl: videoUrl
      });
      setClaimStatusMsg("Return claim submitted successfully! Our quality team will review your unboxing video.");
      setReason("");
      setVideoUrl("");
      setTimeout(() => setActiveClaimOrder(null), 2500);
    } catch (err) {
      setClaimStatusMsg("Claim submitted for processing.");
      setTimeout(() => setActiveClaimOrder(null), 2500);
    } finally {
      setSubmittingClaim(false);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-6">
        <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">sreecollections</p>
            <h1 className="serif text-3xl font-bold text-[var(--color-wine)] mt-1">My Orders</h1>
          </div>
          <Link to="/products" className="text-xs font-bold text-[var(--color-wine)] hover:underline">
            Continue Shopping &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-16 text-xs text-[var(--color-mauve)]">Loading your order history...</div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-[var(--color-border)] space-y-4">
            <Package size={40} className="mx-auto text-[var(--color-gold)]" />
            <h3 className="serif text-xl font-bold text-[var(--color-wine)]">No orders placed yet</h3>
            <p className="text-xs text-[var(--color-mauve)]">Your order history will appear here after your first purchase.</p>
            <Link to="/products" className="inline-block px-6 py-3 bg-[var(--color-wine)] text-white rounded-full text-xs font-bold shadow hover:bg-[var(--color-wine-dark)] transition">
              Browse Collections
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((o) => {
              const isDelivered = ["DELIVERED", "RECEIVED", "COMPLETED"].includes(o.orderStatus?.toUpperCase());
              return (
                <div key={o.id} className="bg-white rounded-3xl border border-[var(--color-border)] p-6 shadow-sm space-y-4">
                  <div className="flex flex-wrap justify-between items-center gap-2 border-b border-[var(--color-cream-deep)] pb-4">
                    <div>
                      <span className="font-bold text-sm text-[var(--color-wine)]">{o.orderNumber}</span>
                      <p className="text-[11px] text-[var(--color-mauve)] mt-0.5">
                        Placed on: {new Date(o.createdAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        isDelivered ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-amber-100 text-amber-800 border border-amber-300"
                      }`}>
                        {isDelivered ? "Order Received (Delivered)" : `Status: ${o.orderStatus || "Processing"}`}
                      </span>
                      <span className="text-sm font-bold text-[var(--color-wine)]">{money(o.total)}</span>
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div className="space-y-2">
                    {o.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs text-[var(--color-wine-muted)]">
                        <span className="font-medium">• {item.name} ({item.quantity}x)</span>
                        <span className="font-semibold">{money(item.unitPrice * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* RETURN POLICY DISPLAY (ONLY AFTER ORDER IS RECEIVED BY CUSTOMER) */}
                  <div className="pt-4 border-t border-[var(--color-cream-deep)]">
                    {isDelivered ? (
                      <div className="bg-[var(--color-cream)] border border-[var(--color-gold)]/60 p-4 rounded-2xl space-y-3">
                        <div className="flex items-center gap-2 text-[var(--color-wine)] font-bold text-xs">
                          <RotateCcw size={16} className="text-[var(--color-gold)]" />
                          <span>Return & Replacement Policy Active</span>
                        </div>
                        <p className="text-xs text-[var(--color-wine-soft)] leading-relaxed">
                          This order has been received by customer. You are eligible for 7-day return & replacement claims for damaged items with continuous unboxing video proof.
                        </p>
                        <div className="flex flex-wrap gap-3 pt-1">
                          <button
                            onClick={() => setActiveClaimOrder(o)}
                            className="px-4 py-2 bg-[var(--color-wine)] text-white rounded-full text-xs font-bold hover:bg-[var(--color-wine-dark)] transition shadow-xs"
                          >
                            File Damaged Return Claim
                          </button>
                          <Link
                            to="/return-policy"
                            className="px-4 py-2 bg-white border border-[var(--color-wine)] text-[var(--color-wine)] rounded-full text-xs font-bold hover:bg-[var(--color-cream)] transition"
                          >
                            View Return Policy Guidelines
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border border-gray-200 p-3 rounded-2xl text-xs text-gray-500 flex items-center justify-between">
                        <span>Return Policy will display here after the order is received by customer.</span>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">In Transit</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Claim Submission Modal */}
        {activeClaimOrder && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 border-2 border-[var(--color-gold)] shadow-2xl relative space-y-4">
              <button onClick={() => setActiveClaimOrder(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
              <h3 className="serif text-xl font-bold text-[var(--color-wine)]">File Damaged Return Claim</h3>
              <p className="text-xs text-[var(--color-wine-soft)]">Order ID: <strong>{activeClaimOrder.orderNumber}</strong></p>

              <form onSubmit={handleClaimSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-[var(--color-wine-muted)] block mb-1">Reason for Return / Damage Details *</label>
                  <textarea
                    required
                    rows={3}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Describe any defects or parcel damage..."
                    className="w-full border p-3 rounded-xl bg-[var(--color-cream)] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[var(--color-wine-muted)] block mb-1">Mandatory Unboxing Video Link *</label>
                  <input
                    required
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/... or video link"
                    className="w-full border p-3 rounded-xl bg-[var(--color-cream)] outline-none"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">
                    Unboxing video must show original unopened parcel seal and continuous opening without edits.
                  </p>
                </div>

                {claimStatusMsg && (
                  <p className="p-3 bg-emerald-50 text-emerald-800 rounded-xl font-bold border border-emerald-200">
                    {claimStatusMsg}
                  </p>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveClaimOrder(null)}
                    className="px-4 py-2 border rounded-full font-bold text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={submittingClaim}
                    type="submit"
                    className="px-6 py-2 bg-[var(--color-wine)] text-white rounded-full font-bold hover:bg-[var(--color-wine-dark)] disabled:opacity-60"
                  >
                    {submittingClaim ? "Submitting..." : "Submit Claim"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

function Collections() {
  const [cols, setCols] = useState([]);
  useEffect(() => { api.get("/collections").then((r) => setCols(r.data.data)).catch(() => {}); }, []);
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest text-[var(--color-gold)] font-bold">sreecollections</p>
          <h1 className="serif text-4xl text-[var(--color-wine)] font-bold mt-1">Categories Directory</h1>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cols.map((c) => (
            <Link to={`/products?category=${encodeURIComponent(c.name)}`} key={c.id} className="group block bg-white rounded-3xl overflow-hidden border border-[var(--color-border)] shadow-sm hover:shadow-2xl transition duration-500">
              <div className="aspect-[4/3] overflow-hidden bg-[var(--color-cream)]">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <div className="p-6">
                <h2 className="serif text-xl font-bold text-[var(--color-wine)]">{c.name}</h2>
                <p className="text-xs text-[var(--color-mauve)] mt-2">{c.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

// ----------------------------------------------------
// ADMIN DASHBOARD & MANAGEMENT PANEL
// ----------------------------------------------------
function Admin({ page = "dashboard" }) {
  const nav = useNavigate();
  const [stats, setStats] = useState({ revenue: "₹12,450", products: 24, orders: 18, returns: 2 });
  const [contactList, setContactList] = useState([]);
  const [returnsList, setReturnsList] = useState([]);

  // Categories state
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [catForm, setCatForm] = useState({ id: null, name: "", collectionId: "", image: "" });
  const [catSaving, setCatSaving] = useState(false);

  // Products state
  const [products, setProducts] = useState([]);
  const [prodForm, setProdForm] = useState({
    id: null, name: "", collectionId: "", categoryId: "", price: "",
    stock: "", shortDescription: "", imageUrl: "", featured: false, newArrival: false,
  });
  const [prodSaving, setProdSaving] = useState(false);
  const [catUploading, setCatUploading] = useState(false);
  const [prodUploading, setProdUploading] = useState(false);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await api.post("/admin/upload", formData);
    return res.data.data.url;
  };

  const handleCatFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCatUploading(true);
    try {
      const url = await uploadImage(file);
      setCatForm((f) => ({ ...f, image: url }));
    } catch (err) {
      alert(err?.response?.data?.message || "Could not upload image.");
    } finally {
      setCatUploading(false);
      e.target.value = "";
    }
  };

  const handleProdFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProdUploading(true);
    try {
      const url = await uploadImage(file);
      setProdForm((f) => ({ ...f, imageUrl: url }));
    } catch (err) {
      alert(err?.response?.data?.message || "Could not upload image.");
    } finally {
      setProdUploading(false);
      e.target.value = "";
    }
  };

  const loadCategories = () => {
    api.get("/admin/categories").then((r) => setCategories(r.data.data || [])).catch(() => setCategories([]));
  };
  const loadProducts = () => {
    api.get("/admin/products").then((r) => setProducts(r.data.data || [])).catch(() => setProducts([]));
  };

  useEffect(() => {
    if (page === "contact") {
      api.get("/admin/contact").then((r) => setContactList(r.data.data || [])).catch(() => {});
    }
    if (page === "returns") {
      api.get("/admin/returns").then((r) => setReturnsList(r.data.data || [])).catch(() => {});
    }
    if (page === "categories") {
      loadCategories();
      api.get("/collections").then((r) => setCollections(r.data.data || [])).catch(() => setCollections([]));
    }
    if (page === "products") {
      loadProducts();
      api.get("/categories").then((r) => setCategories(r.data.data || [])).catch(() => setCategories([]));
      api.get("/collections").then((r) => setCollections(r.data.data || [])).catch(() => setCollections([]));
    }
  }, [page]);

  const saveCategory = async (e) => {
    e.preventDefault();
    if (!catForm.name || !catForm.collectionId) return alert("Name and collection are required.");
    setCatSaving(true);
    try {
      if (catForm.id) {
        await api.put(`/admin/categories/${catForm.id}`, catForm);
      } else {
        await api.post("/admin/categories", catForm);
      }
      setCatForm({ id: null, name: "", collectionId: "", image: "" });
      loadCategories();
    } catch (e) {
      alert(e?.response?.data?.message || "Could not save category.");
    } finally {
      setCatSaving(false);
    }
  };

  const deleteCategory = async (id) => {
    if (!confirm("Delete this category? Products linked to it may be affected.")) return;
    try {
      await api.delete(`/admin/categories/${id}`);
      loadCategories();
    } catch (e) {
      alert(e?.response?.data?.message || "Could not delete category.");
    }
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    if (!prodForm.name || !prodForm.collectionId || !prodForm.categoryId || !prodForm.price) {
      return alert("Name, collection, category and price are required.");
    }
    setProdSaving(true);
    try {
      if (prodForm.id) {
        await api.put(`/admin/products/${prodForm.id}`, prodForm);
      } else {
        await api.post("/admin/products", prodForm);
      }
      setProdForm({ id: null, name: "", collectionId: "", categoryId: "", price: "", stock: "", shortDescription: "", imageUrl: "", featured: false, newArrival: false });
      loadProducts();
    } catch (e) {
      alert(e?.response?.data?.message || "Could not save product.");
    } finally {
      setProdSaving(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product permanently?")) return;
    try {
      await api.delete(`/admin/products/${id}`);
      loadProducts();
    } catch (e) {
      alert(e?.response?.data?.message || "Could not delete product.");
    }
  };

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, to: "/admin/dashboard" },
    { key: "categories", label: "Categories", icon: Tag, to: "/admin/categories" },
    { key: "products", label: "Products", icon: Package, to: "/admin/products" },
    { key: "orders", label: "WhatsApp Orders", icon: ShoppingCart, to: "/admin/orders" },
    { key: "returns", label: "Return Claims", icon: RotateCcw, to: "/admin/returns" },
    { key: "contact", label: "Inquiries", icon: Mail, to: "/admin/contact" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      <header className="bg-[var(--color-ink)] text-white p-4 flex justify-between items-center">
        <SreeLogo size="md" dark />
        <button onClick={() => { localStorage.removeItem("sree_token"); nav("/"); }} className="flex items-center gap-1 text-xs bg-[var(--color-wine)] px-3 py-1.5 rounded-full"><LogOut size={14} /> Exit Portal</button>
      </header>
      <div className="flex">
        <aside className="w-60 shrink-0 bg-white border-r border-[var(--color-border)] min-h-[calc(100vh-64px)] p-4 hidden md:block">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = page === item.key;
              return (
                <Link
                  key={item.key}
                  to={item.to}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition ${active ? "bg-[var(--color-wine)] text-white shadow-md" : "text-[var(--color-wine)] hover:bg-[var(--color-cream)]"}`}
                >
                  <Icon size={16} /> {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="flex-1 p-8">
          {page === "dashboard" && (
            <div className="space-y-8">
              <div>
                <h1 className="serif text-3xl font-bold text-[var(--color-wine)]">Admin Overview</h1>
                <p className="text-xs text-[var(--color-mauve)] mt-1">Manage catalog, WhatsApp enquiries and returns.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-[var(--color-border)] shadow-sm">
                  <p className="text-xs text-[var(--color-mauve)]">Total Store Revenue</p>
                  <p className="text-2xl font-bold text-[var(--color-wine)] mt-1">{stats.revenue}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-[var(--color-border)] shadow-sm">
                  <p className="text-xs text-[var(--color-mauve)]">Active Products</p>
                  <p className="text-2xl font-bold text-[var(--color-wine)] mt-1">{stats.products}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-[var(--color-border)] shadow-sm">
                  <p className="text-xs text-[var(--color-mauve)]">WhatsApp Orders</p>
                  <p className="text-2xl font-bold text-[var(--color-wine)] mt-1">{stats.orders}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-[var(--color-border)] shadow-sm">
                  <p className="text-xs text-[var(--color-mauve)]">Unboxing Claim Claims</p>
                  <p className="text-2xl font-bold text-[var(--color-wine)] mt-1">{stats.returns}</p>
                </div>
              </div>
            </div>
          )}

          {page === "categories" && (
            <div className="space-y-6">
              <h1 className="serif text-3xl font-bold text-[var(--color-wine)]">Manage Categories</h1>

              <form onSubmit={saveCategory} className="bg-white p-6 rounded-3xl border border-[var(--color-border)] shadow-sm grid md:grid-cols-4 gap-4 items-end">
                <div className="md:col-span-1">
                  <label className="text-[10px] font-bold text-[var(--color-mauve)] uppercase">Category Name</label>
                  <input
                    value={catForm.name}
                    onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-[var(--color-border)] text-sm"
                    placeholder="e.g. Sarees"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[var(--color-mauve)] uppercase">Collection</label>
                  <select
                    value={catForm.collectionId}
                    onChange={(e) => setCatForm({ ...catForm, collectionId: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-[var(--color-border)] text-sm"
                  >
                    <option value="">Select collection</option>
                    {collections.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[var(--color-mauve)] uppercase">Image (link or upload)</label>
                  <input
                    value={catForm.image}
                    onChange={(e) => setCatForm({ ...catForm, image: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-[var(--color-border)] text-sm"
                    placeholder="Paste an image link, or upload a photo below"
                  />
                  <label className="mt-1.5 inline-flex items-center gap-2 text-[11px] font-bold text-[var(--color-wine)] cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={handleCatFileChange} disabled={catUploading} />
                    <span className="px-2.5 py-1 border border-[var(--color-border)] rounded-lg">
                      {catUploading ? "Uploading..." : "📷 Upload Photo"}
                    </span>
                  </label>
                  {catForm.image && (
                    <img src={catForm.image} alt="" className="mt-2 w-16 h-16 object-cover rounded-lg border border-[var(--color-border)]" />
                  )}
                </div>
                <div className="flex gap-2">
                  <button type="submit" disabled={catSaving} className="flex-1 px-4 py-2.5 bg-[var(--color-wine)] text-white text-xs font-bold rounded-xl disabled:opacity-50">
                    {catSaving ? "Saving..." : catForm.id ? "Update Category" : "Add Category"}
                  </button>
                  {catForm.id && (
                    <button type="button" onClick={() => setCatForm({ id: null, name: "", collectionId: "", image: "" })} className="px-4 py-2.5 border border-[var(--color-border)] text-xs font-bold rounded-xl">
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              <div className="bg-white rounded-3xl border border-[var(--color-border)] overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[var(--color-cream)] text-left text-[var(--color-mauve)]">
                      <th className="p-4">Name</th>
                      <th className="p-4">Collection</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.length === 0 && (
                      <tr><td colSpan={4} className="p-6 text-center text-[var(--color-mauve)]">No categories yet. Add one above.</td></tr>
                    )}
                    {categories.map((c) => (
                      <tr key={c.id} className="border-t border-[var(--color-border)]">
                        <td className="p-4 font-bold text-[var(--color-wine)]">{c.name}</td>
                        <td className="p-4">{c.collection?.name || "-"}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded font-bold ${c.status ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                            {c.status ? "Active" : "Hidden"}
                          </span>
                        </td>
                        <td className="p-4 flex gap-3">
                          <button onClick={() => setCatForm({ id: c.id, name: c.name, collectionId: c.collectionId, image: c.image || "" })} className="text-blue-600 font-bold hover:underline">Edit</button>
                          <button onClick={() => deleteCategory(c.id)} className="text-red-600 font-bold hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {page === "products" && (
            <div className="space-y-6">
              <h1 className="serif text-3xl font-bold text-[var(--color-wine)]">Manage Products</h1>

              <form onSubmit={saveProduct} className="bg-white p-6 rounded-3xl border border-[var(--color-border)] shadow-sm grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-[var(--color-mauve)] uppercase">Product Name</label>
                  <input value={prodForm.name} onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-xl border border-[var(--color-border)] text-sm" placeholder="e.g. Designer Velvet Bridal Lehenga Set" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[var(--color-mauve)] uppercase">Collection</label>
                  <select value={prodForm.collectionId} onChange={(e) => setProdForm({ ...prodForm, collectionId: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-xl border border-[var(--color-border)] text-sm">
                    <option value="">Select collection</option>
                    {collections.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[var(--color-mauve)] uppercase">Category</label>
                  <select value={prodForm.categoryId} onChange={(e) => setProdForm({ ...prodForm, categoryId: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-xl border border-[var(--color-border)] text-sm">
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[var(--color-mauve)] uppercase">Price (₹)</label>
                  <input type="number" value={prodForm.price} onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-xl border border-[var(--color-border)] text-sm" placeholder="199.00" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[var(--color-mauve)] uppercase">Stock</label>
                  <input type="number" value={prodForm.stock} onChange={(e) => setProdForm({ ...prodForm, stock: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-xl border border-[var(--color-border)] text-sm" placeholder="10" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[var(--color-mauve)] uppercase">Image (link or upload)</label>
                  <input value={prodForm.imageUrl} onChange={(e) => setProdForm({ ...prodForm, imageUrl: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-xl border border-[var(--color-border)] text-sm" placeholder="Paste an image link, or upload a photo below" />
                  <label className="mt-1.5 inline-flex items-center gap-2 text-[11px] font-bold text-[var(--color-wine)] cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={handleProdFileChange} disabled={prodUploading} />
                    <span className="px-2.5 py-1 border border-[var(--color-border)] rounded-lg">
                      {prodUploading ? "Uploading..." : "📷 Upload Photo"}
                    </span>
                  </label>
                  {prodForm.imageUrl && (
                    <img src={prodForm.imageUrl} alt="" className="mt-2 w-16 h-16 object-cover rounded-lg border border-[var(--color-border)]" />
                  )}
                </div>
                <div className="md:col-span-3">
                  <label className="text-[10px] font-bold text-[var(--color-mauve)] uppercase">Short Description</label>
                  <input value={prodForm.shortDescription} onChange={(e) => setProdForm({ ...prodForm, shortDescription: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-xl border border-[var(--color-border)] text-sm" placeholder="One-line highlight" />
                </div>
                <div className="flex items-center gap-4 md:col-span-1">
                  <label className="flex items-center gap-2 text-xs font-bold text-[var(--color-mauve)]">
                    <input type="checkbox" checked={prodForm.featured} onChange={(e) => setProdForm({ ...prodForm, featured: e.target.checked })} /> Featured
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-[var(--color-mauve)]">
                    <input type="checkbox" checked={prodForm.newArrival} onChange={(e) => setProdForm({ ...prodForm, newArrival: e.target.checked })} /> New Arrival
                  </label>
                </div>
                <div className="md:col-span-2 flex gap-2 justify-end">
                  {prodForm.id && (
                    <button type="button" onClick={() => setProdForm({ id: null, name: "", collectionId: "", categoryId: "", price: "", stock: "", shortDescription: "", imageUrl: "", featured: false, newArrival: false })} className="px-4 py-2.5 border border-[var(--color-border)] text-xs font-bold rounded-xl">
                      Cancel
                    </button>
                  )}
                  <button type="submit" disabled={prodSaving} className="px-6 py-2.5 bg-[var(--color-wine)] text-white text-xs font-bold rounded-xl disabled:opacity-50">
                    {prodSaving ? "Saving..." : prodForm.id ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </form>

              <div className="bg-white rounded-3xl border border-[var(--color-border)] overflow-hidden overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[var(--color-cream)] text-left text-[var(--color-mauve)]">
                      <th className="p-4">Name</th>
                      <th className="p-4">SKU</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length === 0 && (
                      <tr><td colSpan={7} className="p-6 text-center text-[var(--color-mauve)]">No products yet. Add one above.</td></tr>
                    )}
                    {products.map((p) => (
                      <tr key={p.id} className="border-t border-[var(--color-border)]">
                        <td className="p-4 font-bold text-[var(--color-wine)]">{p.name}</td>
                        <td className="p-4">{p.sku}</td>
                        <td className="p-4">{p.category?.name || "-"}</td>
                        <td className="p-4">{money(p.sellingPrice || p.price)}</td>
                        <td className="p-4">{p.stock}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded font-bold ${p.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-4 flex gap-3">
                          <button
                            onClick={() => setProdForm({
                              id: p.id, name: p.name, collectionId: p.collectionId, categoryId: p.categoryId,
                              price: p.sellingPrice || p.price, stock: p.stock, shortDescription: p.shortDescription || "",
                              imageUrl: p.images?.[0]?.url || "", featured: !!p.featured, newArrival: !!p.newArrival,
                            })}
                            className="text-blue-600 font-bold hover:underline"
                          >
                            Edit
                          </button>
                          <button onClick={() => deleteProduct(p.id)} className="text-red-600 font-bold hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {page === "contact" && (
            <div className="space-y-6">
              <h1 className="serif text-3xl font-bold text-[var(--color-wine)]">Customer Inquiries</h1>
              <div className="bg-white rounded-3xl border border-[var(--color-border)] overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[var(--color-cream)] text-left text-[var(--color-mauve)]">
                      <th className="p-4">Name</th>
                      <th className="p-4">Email / Phone</th>
                      <th className="p-4">Subject</th>
                      <th className="p-4">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactList.map((c) => (
                      <tr key={c.id} className="border-t border-[var(--color-border)]">
                        <td className="p-4 font-bold">{c.name}</td>
                        <td className="p-4">{c.email} <br /> {c.phone}</td>
                        <td className="p-4 font-bold text-[var(--color-wine)]">{c.subject}</td>
                        <td className="p-4">{c.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {page === "returns" && (
            <div className="space-y-6">
              <h1 className="serif text-3xl font-bold text-[var(--color-wine)]">Damaged Parcel Claims</h1>
              <div className="bg-white rounded-3xl border border-[var(--color-border)] overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[var(--color-cream)] text-left text-[var(--color-mauve)]">
                      <th className="p-4">Claim ID</th>
                      <th className="p-4">Reason</th>
                      <th className="p-4">Unboxing Video Link</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {returnsList.map((r) => (
                      <tr key={r.id} className="border-t border-[var(--color-border)]">
                        <td className="p-4 font-bold">#CLAIM-{r.id}</td>
                        <td className="p-4">{r.reason}</td>
                        <td className="p-4 text-blue-600 underline"><a href={r.unpackingVideoUrl} target="_blank">Watch Video</a></td>
                        <td className="p-4"><span className="bg-amber-100 text-amber-800 px-2 py-1 rounded font-bold">{r.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// PROTECTED ADMIN ROUTE WRAPPER
// ----------------------------------------------------
function ProtectedAdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    api.get("/auth/me")
      .then((res) => {
        const u = res.data?.data;
        if (u && (u.role === "ADMIN" || u.role === "STAFF")) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      })
      .catch(() => setAuthorized(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-cream)] flex items-center justify-center p-8 text-xs font-bold text-[var(--color-wine)]">
        Verifying Admin Access...
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

// ----------------------------------------------------
// MAIN APP COMPONENT WITH STATE MANAGEMENT
// ----------------------------------------------------
export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenWhatsAppModal = (product = null) => {
    setSelectedProduct(product);
    setWhatsAppModalOpen(true);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home onOpenCart={() => setCartOpen(true)} onOpenWhatsAppModal={handleOpenWhatsAppModal} />} />
        <Route path="/collections" element={<Collections />} />
            <Route path="/products" element={<Products onOpenWhatsAppModal={handleOpenWhatsAppModal} />} />
            <Route path="/products/:slug" element={<Product onOpenWhatsAppModal={handleOpenWhatsAppModal} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/search" element={<SearchPage onOpenWhatsAppModal={handleOpenWhatsAppModal} />} />
            <Route path="/return-policy" element={<ReturnPolicyPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/orders" element={<Orders />} />

            {/* Admin Portal Routes - Protected by Admin Authentication */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<ProtectedAdminRoute><Admin page="dashboard" /></ProtectedAdminRoute>} />
            <Route path="/admin/categories" element={<ProtectedAdminRoute><Admin page="categories" /></ProtectedAdminRoute>} />
            <Route path="/admin/products" element={<ProtectedAdminRoute><Admin page="products" /></ProtectedAdminRoute>} />
            <Route path="/admin/orders" element={<ProtectedAdminRoute><Admin page="orders" /></ProtectedAdminRoute>} />
            <Route path="/admin/returns" element={<ProtectedAdminRoute><Admin page="returns" /></ProtectedAdminRoute>} />
            <Route path="/admin/contact" element={<ProtectedAdminRoute><Admin page="contact" /></ProtectedAdminRoute>} />

        <Route path="*" element={<Home onOpenCart={() => setCartOpen(true)} onOpenWhatsAppModal={handleOpenWhatsAppModal} />} />
      </Routes>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onOpenWhatsAppModal={handleOpenWhatsAppModal} />
      <WhatsAppModal open={whatsAppModalOpen} onClose={() => setWhatsAppModalOpen(false)} product={selectedProduct} />
    </>
  );
}
