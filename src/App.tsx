import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  MessageCircle,
  ArrowDown,
  ShieldCheck,
  Snowflake,
  Croissant,
  Clock,
  PlusCircle,
  Search,
  ZoomIn,
  MapPin,
  ArrowRight,
  PartyPopper,
  Menu,
  X,
} from 'lucide-react';
import {
  EXTRA_TOPPING_PRICE,
  GALLERY_ITEMS,
  GalleryItem,
  MENU_CATEGORIES,
  MENU_DATA,
  MenuItem,
  SIGNATURE_ITEMS,
  SLUSH_FLAVOURS,
  STOREFRONT_HERO_IMAGE,
  TESTIMONIALS,
  WHATSAPP_DISPLAY,
  WHATSAPP_PHONE,
} from './data/menuData';
import {
  addItemToCart,
  adjustItemQuantity,
  buildCartWhatsAppMessage,
  buildSingleOrderWhatsAppMessage,
  calculateCartTotals,
  CartItem,
  filterMenuItems,
  removeItemFromCart,
} from './utils/cartAndOrder';
import { ProductImage } from './components/ProductImage';
import { CartDrawer } from './components/CartDrawer';
import {
  OrderPreviewState,
  WhatsAppOrderModal,
} from './components/WhatsAppOrderModal';
import { LightboxModal } from './components/LightboxModal';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [extraToppings, setExtraToppings] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [orderPreview, setOrderPreview] = useState<OrderPreviewState | null>(
    null
  );

  const filteredMenuItems = useMemo(
    () => filterMenuItems(MENU_DATA, selectedCategory, searchQuery),
    [selectedCategory, searchQuery]
  );

  const cartTotals = useMemo(
    () => calculateCartTotals(cart, extraToppings),
    [cart, extraToppings]
  );

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) =>
      addItemToCart(prev, {
        name: item.name,
        price: item.price,
        image: item.image,
      })
    );
    setIsCartOpen(true);
  };

  const handleAdjustQuantity = (name: string, delta: number) => {
    setCart((prev) => adjustItemQuantity(prev, name, delta));
  };

  const handleRemoveItem = (name: string) => {
    setCart((prev) => removeItemFromCart(prev, name));
  };

  const handleSingleDirectOrder = (
    name: string,
    price: number,
    isSlush = false
  ) => {
    setOrderPreview({
      mode: 'single',
      title: `Order ${name}`,
      productName: name,
      price,
      isSlush,
      initialMessage: buildSingleOrderWhatsAppMessage(name, price),
    });
  };

  const handleCartCheckoutWhatsApp = (customerNotes: string) => {
    if (cart.length === 0) return;
    const message = buildCartWhatsAppMessage(
      cart,
      extraToppings,
      customerNotes
    );
    setIsCartOpen(false);
    setOrderPreview({
      mode: 'cart',
      title: 'Confirm Your WhatsApp Order',
      initialMessage: message,
    });
  };

  const handleSelectCategoryAndScroll = (category: string) => {
    setSelectedCategory(category);
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-cream text-choco-dark font-body selection:bg-amber-brand selection:text-white">
      {/* TOP STICKY NAVBAR (3-Zone Contract: Brand | Nav Links | Primary Action Group) */}
      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-cream-border/80">
        <div className="flex justify-between items-center gap-6 w-full px-4 sm:px-8 md:px-12 max-w-7xl mx-auto h-20">
          {/* Zone 1: Brand Name */}
          <a
            href="#home"
            className="font-headline font-bold text-lg md:text-xl text-choco tracking-tight whitespace-nowrap shrink-0 hover:text-amber-brand transition-colors"
          >
            SSS Ice Cream &amp; Snacks
          </a>

          {/* Zone 2: Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-semibold text-choco/80"
          >
            <a
              href="#best-sellers"
              className="hover:text-amber-brand transition-colors whitespace-nowrap shrink-0"
            >
              Best Sellers
            </a>
            <a
              href="#menu"
              className="hover:text-amber-brand transition-colors whitespace-nowrap shrink-0"
            >
              Menu
            </a>
            <a
              href="#about"
              className="hover:text-amber-brand transition-colors whitespace-nowrap shrink-0"
            >
              About
            </a>
            <a
              href="#gallery"
              className="hover:text-amber-brand transition-colors whitespace-nowrap shrink-0"
            >
              Gallery
            </a>
            <a
              href="#contact"
              className="hover:text-amber-brand transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Cart & Primary Order Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              aria-label={`View Shopping Cart (${cartTotals.itemCount} items)`}
              onClick={() => setIsCartOpen(true)}
              className="relative px-3.5 py-2 rounded-xl bg-white border border-cream-border text-choco hover:bg-amber-brand hover:text-white transition-colors shadow-xs flex items-center gap-2 text-xs font-bold whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart</span>
              <span
                id="cartCountBadge"
                data-testid="cart-count-badge"
                className="bg-amber-brand text-white text-[11px] font-bold px-1.5 py-0.5 rounded-md tabular-nums"
              >
                {cartTotals.itemCount}
              </span>
            </button>

            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                'Assalam-o-Alaikum! I would like to order from SSS Ice Cream & Snacks.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-choco text-white text-xs font-bold hover:bg-amber-brand transition-colors shadow-xs whitespace-nowrap shrink-0"
            >
              <span>Order Now</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-xl bg-white border border-cream-border text-choco hover:bg-cream transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="lg:hidden bg-white border-b border-cream-border px-4 py-4 space-y-2"
          >
            {[
              { label: 'Home', href: '#home' },
              { label: 'Best Sellers', href: '#best-sellers' },
              { label: 'Full Menu', href: '#menu' },
              { label: 'About Us', href: '#about' },
              { label: 'Why Choose Us', href: '#why-us' },
              { label: 'Parlour Gallery', href: '#gallery' },
              { label: 'Location & Hours', href: '#contact' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-choco hover:bg-cream hover:text-amber-brand transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-cream-border flex items-center justify-between">
              <span className="text-xs font-semibold text-choco/70">
                Hotline: {WHATSAPP_DISPLAY}
              </span>
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-green-600 text-white text-xs font-bold"
              >
                WhatsApp Chat
              </a>
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* HERO SECTION (Authentic Storefront Background Image) */}
        <section id="home" className="relative overflow-hidden py-4 sm:py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-cream-border/80 min-h-[560px] md:min-h-[620px] flex items-center">
              <img
                src={STOREFRONT_HERO_IMAGE}
                alt="SSS Ice Cream & Snacks Storefront"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              {/* Contrast Gradients for Guaranteed Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-choco/95 via-choco/80 to-choco/30 md:via-choco/75 md:to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-choco/90 via-transparent to-choco/40 pointer-events-none" />

              {/* Hero Content */}
              <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-2xl lg:max-w-3xl space-y-6 text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-brand">
                  Freshly Churned Daily · Artisanal Parlour · {WHATSAPP_DISPLAY}
                </p>

                <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-tight text-balance">
                  Your Sweet Moments Start Here.
                </h1>

                <p className="text-base sm:text-lg text-cream/90 font-normal leading-relaxed max-w-xl">
                  Discover delicious ice cream, refreshing slush, crispy waffles,
                  creamy shakes and more.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#menu"
                    className="px-6 py-3.5 rounded-xl bg-amber-brand text-white text-sm font-bold hover:bg-[#d86111] transition-all duration-200 active:scale-95 shadow-lg flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>Explore Our Menu</span>
                    <ArrowDown className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                      'Assalam-o-Alaikum! I would like to order from SSS Ice Cream & Snacks.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl bg-white/95 backdrop-blur-md text-choco text-sm font-bold hover:bg-white transition-all duration-200 active:scale-95 shadow-md flex items-center gap-2 whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 text-green-600" />
                    <span>Order on WhatsApp</span>
                  </a>
                </div>

                {/* Value Proposition Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-choco/45 backdrop-blur-md border border-white/10">
                    <ShieldCheck className="w-4 h-4 text-pistachio shrink-0" />
                    <span className="text-xs text-cream font-semibold">
                      100% Pure Milk &amp; Cream
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-choco/45 backdrop-blur-md border border-white/10">
                    <Snowflake className="w-4 h-4 text-amber-brand shrink-0" />
                    <span className="text-xs text-cream font-semibold">
                      14 Slush Flavours
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-choco/45 backdrop-blur-md border border-white/10">
                    <Croissant className="w-4 h-4 text-amber-brand shrink-0" />
                    <span className="text-xs text-cream font-semibold">
                      Artisanal Waffles
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-choco/45 backdrop-blur-md border border-white/10">
                    <Clock className="w-4 h-4 text-cream shrink-0" />
                    <span className="text-xs text-cream font-semibold">
                      Open 1:00 PM – 1:00 AM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BEST-SELLING PRODUCTS (Signature Highlights) */}
        <section
          id="best-sellers"
          className="py-16 bg-cream border-y border-cream-border/60"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-amber-brand text-xs font-bold uppercase tracking-wider">
                Parlour Highlights
              </span>
              <h2 className="font-headline text-3xl md:text-4xl text-choco font-bold mt-1 text-balance">
                Our Signature Creations
              </h2>
              <p className="text-sm md:text-base text-choco/75 mt-2">
                Beloved dessert crafts prepared fresh to order with rich dairy
                cream, roasted crunch, and artisanal syrups.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SIGNATURE_ITEMS.map((item) => (
                <article
                  key={item.id}
                  className="product-card bg-white rounded-2xl p-4 md:p-5 border border-cream-border card-shadow card-shadow-hover transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <ProductImage
                      src={item.image}
                      fallbackSrc={item.publicUrl}
                      alt={item.name}
                      badgeText={item.tag}
                    />
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-headline text-lg font-bold text-choco">
                        {item.name}
                      </h3>
                      <span className="font-headline text-lg text-amber-brand font-bold whitespace-nowrap tabular-nums">
                        Rs. {item.price}
                      </span>
                    </div>
                    <p className="text-xs text-choco/70 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-cream-border flex items-center justify-between gap-2">
                    <button
                      type="button"
                      aria-label={`Add ${item.name} to cart`}
                      onClick={() => handleAddToCart(item)}
                      className="px-3.5 py-2 rounded-lg border border-choco text-choco text-xs font-bold hover:bg-cream transition-colors flex items-center gap-1.5 whitespace-nowrap active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      type="button"
                      aria-label={`Order ${item.name} on WhatsApp`}
                      onClick={() =>
                        handleSingleDirectOrder(
                          item.name,
                          item.price,
                          item.category === 'Slush'
                        )
                      }
                      className="px-3.5 py-2 bg-choco text-white rounded-lg text-xs font-bold hover:bg-amber-brand transition-colors flex items-center gap-1.5 whitespace-nowrap active:scale-95"
                    >
                      <span>Order</span>
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FULL INTERACTIVE MENU SECTION */}
        <section
          id="menu"
          className="py-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-12"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-cream-border gap-4">
            <div>
              <span className="text-amber-brand text-xs font-bold uppercase tracking-wider">
                The Complete Parlour Selection
              </span>
              <h2 className="font-headline text-3xl md:text-4xl text-choco font-bold mt-1 text-balance">
                Explore Our Full Menu
              </h2>
              <p className="text-sm text-choco/75 mt-1">
                Filter by category or search for your favorite ice cream,
                waffles, cold coffee, and shakes.
              </p>
            </div>

            {/* Extra Topping Banner Callout */}
            <div className="p-3.5 rounded-xl bg-white border border-cream-border flex items-center gap-3 card-shadow shrink-0">
              <PlusCircle className="w-6 h-6 text-amber-brand shrink-0" />
              <div>
                <span className="text-xs font-bold text-choco block tabular-nums">
                  Extra Topping · Rs. {EXTRA_TOPPING_PRICE}
                </span>
                <span className="text-[11px] text-choco/70">
                  Sprinkles, Fudge, Crushed Nuts, Oreo &amp; Caramel
                </span>
              </div>
            </div>
          </div>

          {/* Filter & Search Toolbar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div
              id="categoryFilterBar"
              role="tablist"
              aria-label="Menu Category Filter"
              className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0"
            >
              {MENU_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 transition-colors ${
                      isActive
                        ? 'bg-choco text-white shadow-xs'
                        : 'bg-white text-choco border border-cream-border hover:bg-cream'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-64 shrink-0">
              <Search className="w-4 h-4 text-choco/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                aria-label="Search menu items"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cones, shakes, cups..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-cream-border text-xs text-choco placeholder:text-choco/45 focus:outline-none focus:border-amber-brand"
              />
            </div>
          </div>

          {/* Dynamic Product Cards Grid */}
          {filteredMenuItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-cream-border">
              <p className="font-headline text-lg font-bold text-choco">
                No menu items match "{searchQuery}"
              </p>
              <p className="text-xs text-choco/60 mt-1">
                Try clearing your search or selecting "All Items".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-choco text-white text-xs font-bold hover:bg-amber-brand transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              id="menuItemsContainer"
              data-testid="menu-items-grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredMenuItems.map((item) => (
                <article
                  key={item.id}
                  className="product-card bg-white rounded-2xl p-4 md:p-5 border border-cream-border card-shadow card-shadow-hover transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <ProductImage
                      src={item.image}
                      fallbackSrc={item.publicUrl}
                      alt={item.name}
                      badgeText={item.category}
                    />
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-headline text-base md:text-lg font-bold text-choco">
                        {item.name}
                      </h3>
                      <span className="font-headline text-base md:text-lg text-amber-brand font-bold whitespace-nowrap tabular-nums">
                        Rs. {item.price}
                      </span>
                    </div>
                    <p className="text-xs text-choco/70 mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-cream-border flex items-center justify-between gap-2">
                    <button
                      type="button"
                      aria-label={`Add ${item.name} to cart`}
                      onClick={() => handleAddToCart(item)}
                      className="px-3.5 py-2 rounded-lg border border-choco text-choco text-xs font-bold hover:bg-cream transition-colors flex items-center gap-1.5 active:scale-95 whitespace-nowrap"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                    <button
                      type="button"
                      aria-label={`Order ${item.name} directly`}
                      onClick={() =>
                        handleSingleDirectOrder(
                          item.name,
                          item.price,
                          item.category === 'Slush'
                        )
                      }
                      className="px-3.5 py-2 bg-choco text-white rounded-lg text-xs font-bold hover:bg-amber-brand transition-colors flex items-center gap-1.5 active:scale-95 whitespace-nowrap"
                    >
                      <span>Order</span>
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* 14 Refreshing Slush Highlight Banner */}
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-brand/15 via-cream to-amber-brand/10 border border-amber-brand/30 shadow-xs">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <span className="text-amber-brand text-xs font-bold uppercase tracking-wider">
                  Sub-Zero Sensation
                </span>
                <h3 className="font-headline text-2xl md:text-3xl text-choco font-bold mt-1">
                  14 Refreshing Slush Flavours
                </h3>
                <p className="text-xs sm:text-sm text-choco/80 max-w-2xl mt-1.5 leading-relaxed">
                  {SLUSH_FLAVOURS.join(' · ')}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleSingleDirectOrder(
                    'Icy Slush (Pick Your Flavour)',
                    180,
                    true
                  )
                }
                className="px-6 py-3 rounded-xl bg-amber-brand text-white text-xs font-bold hover:bg-[#d86111] transition-all whitespace-nowrap shadow-sm flex items-center gap-2 shrink-0"
              >
                <Snowflake className="w-4 h-4" />
                <span>Order Fresh Slush (Rs. 180)</span>
              </button>
            </div>
          </div>
        </section>

        {/* ABOUT SSS SECTION */}
        <section
          id="about"
          className="py-20 bg-white border-y border-cream-border/60"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-amber-brand text-xs font-bold uppercase tracking-wider">
                  The Boutique Story
                </span>
                <h2 className="font-headline text-3xl md:text-4xl text-choco font-bold leading-tight text-balance">
                  More Than Just Ice Cream.
                </h2>
                <p className="text-base text-choco/80 leading-relaxed">
                  At{' '}
                  <strong className="text-choco font-bold">
                    SSS Ice Cream &amp; Snacks
                  </strong>
                  , we bring together delicious desserts, refreshing drinks and
                  sweet moments. From creamy ice creams and freshly made waffles
                  to refreshing slush and shakes, there is something delicious
                  waiting for everyone.
                </p>
                <p className="text-sm text-choco/70 leading-relaxed">
                  Every scoop begins with whole pasteurized dairy and natural
                  confectionery extracts. We bake our waffle cones warm in-house
                  throughout the evening, greeting you with the unforgettable
                  aroma of caramelized vanilla and toasted butter.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-3">
                  <div className="p-4 rounded-xl bg-cream border border-cream-border">
                    <span className="font-headline text-3xl text-amber-brand block font-bold tabular-nums">
                      100%
                    </span>
                    <span className="text-xs font-bold text-choco">
                      Pure Dairy Integrity
                    </span>
                    <p className="text-[11px] text-choco/70 mt-0.5">
                      No artificial vegetable fats or compromises.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-cream border border-cream-border">
                    <span className="font-headline text-3xl text-amber-brand block font-bold tabular-nums">
                      25+
                    </span>
                    <span className="text-xs font-bold text-choco">
                      Dessert Selections
                    </span>
                    <p className="text-[11px] text-choco/70 mt-0.5">
                      From chilled slushies to warm waffles.
                    </p>
                  </div>
                </div>
              </div>

              {/* Authentic Atmosphere Images (All Verified Local Assets) */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-md h-56 bg-cream border border-cream-border">
                    <img
                      src="/images/storefront-hero.png"
                      alt="SSS Evening Atmosphere"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-md h-40 bg-cream border border-cream-border">
                    <img
                      src="/images/cold-coffee-crunch.jpg"
                      alt="Cold Coffee SSS Special"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-6">
                  <div className="rounded-2xl overflow-hidden shadow-md h-40 bg-cream border border-cream-border">
                    <img
                      src="/images/chocolate-brownie-cup.jpg"
                      alt="Warm Fudgy Brownie"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-md h-56 bg-cream border border-cream-border">
                    <img
                      src="/images/waffle-cone.jpg"
                      alt="Freshly Pressed Waffle Cone"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section id="why-us" className="py-16 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-amber-brand text-xs font-bold uppercase tracking-wider">
                Quality First
              </span>
              <h2 className="font-headline text-3xl md:text-4xl text-choco font-bold mt-1 text-balance">
                Why People Love SSS
              </h2>
              <p className="text-sm text-choco/75 mt-2">
                Crafted with wholesome passion, fresh ingredients, and genuine
                care.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-cream-border card-shadow text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-brand/10 text-amber-brand flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-base font-bold text-choco">
                  100% Pure Dairy Milk
                </h3>
                <p className="text-xs text-choco/70 leading-relaxed">
                  Only wholesome dairy and rich cream churned daily with zero
                  cheap substitutes.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-cream-border card-shadow text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-brand/10 text-amber-brand flex items-center justify-center mx-auto">
                  <Croissant className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-base font-bold text-choco">
                  Baked Waffles On-Site
                </h3>
                <p className="text-xs text-choco/70 leading-relaxed">
                  Every cone and waffle is freshly pressed on hot cast irons for
                  supreme crunch.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-cream-border card-shadow text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-brand/10 text-amber-brand flex items-center justify-center mx-auto">
                  <Snowflake className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-base font-bold text-choco">
                  14 Chilled Slush Flavours
                </h3>
                <p className="text-xs text-choco/70 leading-relaxed">
                  From sweet tropical mango to tangy Imli, always iced sub-zero
                  and energizing.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-cream-border card-shadow text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-brand/10 text-amber-brand flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-base font-bold text-choco">
                  Hygienic &amp; Handcrafted
                </h3>
                <p className="text-xs text-choco/70 leading-relaxed">
                  Prepared in an immaculate environment with food-grade sanitary
                  standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ATMOSPHERE & PARLOUR GALLERY */}
        <section
          id="gallery"
          className="py-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-12"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-brand text-xs font-bold uppercase tracking-wider">
              Atmosphere &amp; Delights
            </span>
            <h2 className="font-headline text-3xl md:text-4xl text-choco font-bold mt-1 text-balance">
              Our Parlour Gallery
            </h2>
            <p className="text-sm text-choco/75 mt-2">
              Step inside SSS Ice Cream &amp; Snacks. Enjoy the evening street
              buzz, illuminated parlour, and sweet aromas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {GALLERY_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-label={`View gallery photo: ${item.title}`}
                onClick={() => setLightboxItem(item)}
                className={`relative group rounded-2xl overflow-hidden cursor-pointer card-shadow bg-cream text-left border border-cream-border ${
                  item.featured
                    ? 'md:col-span-2 lg:col-span-2 md:row-span-2 min-h-[300px] md:min-h-[424px]'
                    : 'h-52'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-choco/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white" />
                </div>
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-md text-xs font-bold text-choco shadow-xs">
                  {item.title}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* CUSTOMER TESTIMONIALS */}
        <section className="py-16 bg-white border-y border-cream-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-amber-brand text-xs font-bold uppercase tracking-wider">
                Word On The Street
              </span>
              <h2 className="font-headline text-3xl text-choco font-bold mt-1 text-balance">
                Loved by Dessert Lovers
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="p-6 rounded-2xl bg-cream border border-cream-border card-shadow flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div
                      className="flex text-amber-brand text-sm"
                      aria-label="5 out of 5 stars"
                    >
                      ★★★★★
                    </div>
                    <p className="text-xs text-choco/80 leading-relaxed italic">
                      "{t.quote}"
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-cream-border flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-choco text-white text-xs font-bold flex items-center justify-center">
                      {t.initial}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-choco block">
                        {t.name}
                      </span>
                      <span className="text-[10px] text-choco/60">
                        {t.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOCATION & OPENING HOURS */}
        <section id="contact" className="py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Contact & Timings Info */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-amber-brand text-xs font-bold uppercase tracking-wider">
                  Plan Your Visit
                </span>
                <h2 className="font-headline text-3xl md:text-4xl text-choco font-bold text-balance">
                  Location &amp; Hours
                </h2>
                <p className="text-sm text-choco/75">
                  Stop by for a midnight sweet tooth craving or order swift
                  delivery directly to your doorstep via WhatsApp.
                </p>

                <div className="space-y-4 pt-2">
                  {/* Timings */}
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-cream-border card-shadow">
                    <Clock className="w-6 h-6 text-amber-brand mt-0.5 shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold text-choco">
                        Operating Hours
                      </h3>
                      <p className="text-xs text-choco/75 mt-0.5">
                        Monday – Sunday:{' '}
                        <strong className="text-choco font-bold">
                          1:00 PM – 1:00 AM
                        </strong>
                      </p>
                      <span className="inline-block mt-1 text-[11px] font-bold text-pistachio">
                        Open Daily
                      </span>
                    </div>
                  </div>

                  {/* WhatsApp Hotline */}
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-cream-border card-shadow">
                    <MessageCircle className="w-6 h-6 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold text-choco">
                        Order Hotline &amp; WhatsApp
                      </h3>
                      <a
                        href={`https://wa.me/${WHATSAPP_PHONE}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-amber-brand hover:underline tabular-nums"
                      >
                        {WHATSAPP_DISPLAY}
                      </a>
                      <p className="text-[11px] text-choco/60 mt-0.5">
                        Quick responses for takeaway &amp; delivery
                      </p>
                    </div>
                  </div>

                  {/* Store Address */}
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-cream-border card-shadow">
                    <MapPin className="w-6 h-6 text-amber-brand mt-0.5 shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold text-choco">
                        Parlour Address
                      </h3>
                      <p className="text-xs text-choco/75 mt-0.5">
                        SSS Ice Cream &amp; Snacks, Main Boutique Boulevard /
                        Promenade
                      </p>
                      <p className="text-[11px] text-choco/60 mt-0.5">
                        Outdoor cozy patio seating available
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map & Catering Query Card */}
              <div className="lg:col-span-7 space-y-6">
                <div className="rounded-2xl overflow-hidden border border-cream-border bg-white p-6 card-shadow">
                  <h3 className="font-headline text-lg font-bold text-choco mb-1">
                    Find Us on the Map
                  </h3>
                  <p className="text-xs text-choco/70 mb-4">
                    Easily accessible with convenient parking and pedestrian
                    friendly promenade.
                  </p>

                  <div className="relative h-64 w-full rounded-xl overflow-hidden bg-cream border border-cream-border flex items-center justify-center">
                    <div className="absolute inset-0 opacity-35 bg-[radial-gradient(#F47721_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="relative z-10 text-center p-6 bg-white/95 rounded-2xl shadow-lg border border-cream-border max-w-sm">
                      <MapPin className="w-7 h-7 text-amber-brand mx-auto mb-1.5" />
                      <h4 className="font-headline text-sm font-bold text-choco">
                        SSS Ice Cream &amp; Snacks
                      </h4>
                      <p className="text-xs text-choco/70 mt-1">
                        Main Boutique Boulevard · Open Till 1:00 AM
                      </p>
                      <a
                        href="https://maps.google.com/?q=SSS+Ice+Cream+and+Snacks"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-amber-brand mt-3 hover:underline"
                      >
                        <span>Open in Google Maps</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-cream-border">
                    <span className="text-xs text-choco/70">
                      Custom bulk orders, birthday sundae bars &amp; events?
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setOrderPreview({
                          mode: 'single',
                          title: 'Event Catering Inquiry',
                          initialMessage:
                            'Assalam-o-Alaikum! I am inquiring about event catering and party tasting boxes from SSS Ice Cream & Snacks.',
                        })
                      }
                      className="px-4 py-2 rounded-xl bg-choco text-white text-xs font-bold hover:bg-amber-brand transition-colors flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <PartyPopper className="w-4 h-4" />
                      <span>Event Catering Query</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-choco text-cream border-t border-choco-dark">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 flex flex-col gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Block */}
            <div className="lg:col-span-2 space-y-4">
              <a href="#home" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-brand text-white flex items-center justify-center font-headline text-xl font-bold">
                  S
                </div>
                <span className="font-headline font-bold text-lg text-white">
                  SSS Ice Cream &amp; Snacks
                </span>
              </a>
              <p className="text-xs text-cream/70 max-w-sm leading-relaxed">
                Crafted with pure dairy cream, artisanal syrups, and love.
                Bringing delightful sweetness and frozen bliss to our community
                daily.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  aria-label="Order via WhatsApp"
                  href={`https://wa.me/${WHATSAPP_PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-amber-brand transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  aria-label="Parlour Location"
                  href="#contact"
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-amber-brand transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Navigation */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                Explore
              </h4>
              <ul className="space-y-2 text-xs text-cream/70">
                <li>
                  <a
                    href="#home"
                    className="hover:text-amber-brand transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#best-sellers"
                    className="hover:text-amber-brand transition-colors"
                  >
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a
                    href="#menu"
                    className="hover:text-amber-brand transition-colors"
                  >
                    Our Menu
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-amber-brand transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#gallery"
                    className="hover:text-amber-brand transition-colors"
                  >
                    Parlour Gallery
                  </a>
                </li>
              </ul>
            </div>

            {/* Specialties */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                Specialties
              </h4>
              <ul className="space-y-2 text-xs text-cream/70">
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectCategoryAndScroll('Ice Cream')}
                    className="hover:text-amber-brand transition-colors text-left"
                  >
                    Handmade Cones
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectCategoryAndScroll('Waffles')}
                    className="hover:text-amber-brand transition-colors text-left"
                  >
                    Belgian Waffles
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectCategoryAndScroll('Cold Coffee')}
                    className="hover:text-amber-brand transition-colors text-left"
                  >
                    Cold Coffee Floats
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectCategoryAndScroll('Shakes')}
                    className="hover:text-amber-brand transition-colors text-left"
                  >
                    Thick Milkshakes
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectCategoryAndScroll('Slush')}
                    className="hover:text-amber-brand transition-colors text-left"
                  >
                    14 Slush Flavours
                  </button>
                </li>
              </ul>
            </div>

            {/* Parlour Info */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                Parlour Hours
              </h4>
              <p className="text-xs text-cream/70 leading-relaxed">
                Monday – Sunday
                <br />
                <strong className="text-white font-bold">
                  1:00 PM – 1:00 AM
                </strong>
              </p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <span className="text-[11px] text-cream/50 block">
                  WhatsApp Hotline
                </span>
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-amber-brand hover:underline tabular-nums"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/50 gap-4">
            <p>© {new Date().getFullYear()} SSS Ice Cream &amp; Snacks. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <a
                href="#contact"
                className="hover:text-amber-brand transition-colors"
              >
                Store Hours
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-brand transition-colors"
              >
                WhatsApp Ordering
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* SLIDE-OUT SHOPPING CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        extraToppings={extraToppings}
        onToggleExtraToppings={setExtraToppings}
        onAdjustQuantity={handleAdjustQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToWhatsApp={handleCartCheckoutWhatsApp}
      />

      {/* WHATSAPP ORDER CONFIRMATION MODAL */}
      <WhatsAppOrderModal
        orderState={orderPreview}
        onClose={() => setOrderPreview(null)}
      />

      {/* GALLERY LIGHTBOX MODAL */}
      <LightboxModal
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
      />
    </div>
  );
}
