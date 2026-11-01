import React, { useState, useMemo } from 'react';
import {
  EXTRA_TOPPING_PRICE,
  GALLERY_ITEMS,
  GalleryItem,
  MENU_CATEGORIES,
  MENU_DATA,
  MenuItem,
  SIGNATURE_ITEMS,
  STOREFRONT_HERO_IMAGE,
  WHATSAPP_PHONE,
} from './data/menuData';
import {
  addItemToCart,
  adjustItemQuantity,
  buildCartWhatsAppMessage,
  buildSingleOrderWhatsAppMessage,
  buildWhatsAppUrl,
  calculateCartTotals,
  CartItem,
  filterMenuItems,
  removeItemFromCart,
} from './utils/cartAndOrder';

const SIGNATURE_BADGE_CLASSES: Record<string, string> = {
  Signature: 'bg-amber-brand text-white',
  'Best Seller': 'bg-choco text-white',
  'Freshly Baked': 'bg-pistachio text-white',
  'Chilled Brew': 'bg-amber-brand text-white',
  'Warm & Cold': 'bg-choco text-white',
  'Sub-Zero': 'bg-amber-brand text-white',
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [extraToppings, setExtraToppings] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [emptyCartNotice, setEmptyCartNotice] = useState<boolean>(false);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredMenuItems = useMemo(
    () => filterMenuItems(MENU_DATA, selectedCategory),
    [selectedCategory]
  );

  const cartTotals = useMemo(
    () => calculateCartTotals(cart, extraToppings),
    [cart, extraToppings]
  );

  const handleAddToCart = (item: {
    name: string;
    price: number;
    image: string;
  }) => {
    setCart((prev) => addItemToCart(prev, item));
    setEmptyCartNotice(false);
    setIsCartOpen(true);
  };

  const handleAdjustQuantity = (name: string, delta: number) => {
    setCart((prev) => adjustItemQuantity(prev, name, delta));
  };

  const handleRemoveFromCart = (name: string) => {
    setCart((prev) => removeItemFromCart(prev, name));
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const cartWhatsAppHref = useMemo(() => {
    if (cart.length === 0) return '#';
    return buildWhatsAppUrl(buildCartWhatsAppMessage(cart, extraToppings));
  }, [cart, extraToppings]);

  return (
    <div className="bg-cream text-choco-dark font-body antialiased selection:bg-amber-brand selection:text-white min-h-screen">
      {/* TOP STICKY NAVBAR */}
      <header className="docked full-width top-0 sticky z-40 bg-[#FFF7E9]/95 backdrop-blur-md border-b border-cream-border/60 shadow-xs transition-all duration-200">
        <div className="flex justify-between items-center w-full px-4 sm:px-8 md:px-12 max-w-7xl mx-auto h-20">
          {/* Brand Name / Logo */}
          <a
            className="flex items-center gap-3 active:scale-95 transition-transform"
            href="#home"
          >
            <div className="w-11 h-11 rounded-xl bg-choco text-amber-brand flex items-center justify-center font-headline text-2xl font-bold shadow-sm">
              S
            </div>
            <div>
              <span className="font-headline font-bold text-lg md:text-xl text-choco tracking-tight block leading-tight">
                SSS Ice Cream &amp; Snacks
              </span>
              <span className="text-[11px] font-semibold tracking-wider text-amber-brand uppercase">
                Artisanal Parlour
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-choco/80"
          >
            <a
              className="hover:text-amber-brand transition-colors text-amber-brand"
              href="#home"
            >
              Home
            </a>
            <a
              className="hover:text-amber-brand transition-colors"
              href="#best-sellers"
            >
              Best Sellers
            </a>
            <a
              className="hover:text-amber-brand transition-colors"
              href="#menu"
            >
              Menu
            </a>
            <a
              className="hover:text-amber-brand transition-colors"
              href="#about"
            >
              About
            </a>
            <a
              className="hover:text-amber-brand transition-colors"
              href="#why-us"
            >
              Why Us
            </a>
            <a
              className="hover:text-amber-brand transition-colors"
              href="#gallery"
            >
              Gallery
            </a>
            <a
              className="hover:text-amber-brand transition-colors"
              href="#contact"
            >
              Contact
            </a>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Hotline Link */}
            <a
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-cream-border text-xs font-bold text-choco hover:text-amber-brand transition-colors shadow-xs"
              href={`https://wa.me/${WHATSAPP_PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-green-600 text-base material-symbols-fill">
                chat
              </span>
              <span>+92 321 8822161</span>
            </a>

            {/* Shopping Cart Drawer Trigger Button */}
            <button
              type="button"
              aria-label="View Shopping Cart"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-white border border-cream-border text-choco hover:bg-amber-brand hover:text-white transition-all shadow-xs flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-xl">
                shopping_cart
              </span>
              <span
                id="cartCountBadge"
                data-testid="cart-count-badge"
                className="absolute -top-1.5 -right-1.5 bg-amber-brand text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
              >
                {cartTotals.itemCount}
              </span>
            </button>

            {/* Direct Quick Order CTA */}
            <a
              className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-choco text-white text-xs font-bold hover:bg-amber-brand transition-colors shadow-sm"
              href={`https://wa.me/${WHATSAPP_PHONE}?text=Assalam-o-Alaikum!%20I%20would%20like%20to%20order%20from%20SSS%20Ice%20Cream%20%26%20Snacks.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Order Now</span>
              <span className="material-symbols-outlined text-sm">
                arrow_outward
              </span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION (Authentic Storefront Background Image) */}
        <section className="relative overflow-hidden py-4 sm:py-6 md:py-8" id="home">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-cream-border/80 min-h-[580px] md:min-h-[640px] flex items-center">
              <img
                alt="SSS Ice Cream & Snacks Storefront"
                className="absolute inset-0 w-full h-full object-cover object-center"
                src={STOREFRONT_HERO_IMAGE}
                referrerPolicy="no-referrer"
              />
              {/* Contrast Gradients for Guaranteed Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-choco/95 via-choco/80 to-choco/30 md:via-choco/75 md:to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-choco/90 via-transparent to-choco/40 pointer-events-none" />

              {/* Hero Content */}
              <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-2xl lg:max-w-3xl space-y-6 text-white">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-brand/20 border border-amber-brand/40 text-amber-brand text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-amber-brand animate-pulse" />
                  Freshly Churned Daily • Artisanal Parlour
                </div>

                {/* Headline */}
                <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-tight">
                  Your Sweet Moments Start Here.
                </h1>

                {/* Subheading */}
                <p className="text-base sm:text-lg text-cream/90 font-normal leading-relaxed max-w-xl">
                  Discover delicious ice cream, refreshing slush, crispy waffles,
                  creamy shakes and more.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    className="px-7 py-3.5 rounded-xl bg-amber-brand text-white text-sm font-bold hover:bg-[#d86111] transition-all duration-200 active:scale-95 shadow-lg flex items-center gap-2"
                    href="#menu"
                  >
                    <span>Explore Our Menu</span>
                    <span className="material-symbols-outlined text-base">
                      arrow_downward
                    </span>
                  </a>
                  <a
                    className="px-7 py-3.5 rounded-xl bg-white/95 backdrop-blur-md text-choco text-sm font-bold hover:bg-white transition-all duration-200 active:scale-95 shadow-md flex items-center gap-2"
                    href={`https://wa.me/${WHATSAPP_PHONE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="material-symbols-outlined text-green-600 text-base material-symbols-fill">
                      chat
                    </span>
                    <span>Order on WhatsApp</span>
                  </a>
                </div>

                {/* Value Proposition Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-choco/40 backdrop-blur-md border border-white/10">
                    <span className="material-symbols-outlined text-pistachio text-base material-symbols-fill">
                      verified
                    </span>
                    <span className="text-xs text-cream font-semibold">
                      100% Pure Milk &amp; Cream
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-choco/40 backdrop-blur-md border border-white/10">
                    <span className="material-symbols-outlined text-amber-brand text-base material-symbols-fill">
                      ac_unit
                    </span>
                    <span className="text-xs text-cream font-semibold">
                      14 Slush Flavours
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-choco/40 backdrop-blur-md border border-white/10">
                    <span className="material-symbols-outlined text-amber-brand text-base material-symbols-fill">
                      bakery_dining
                    </span>
                    <span className="text-xs text-cream font-semibold">
                      Artisanal Waffles
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-choco/40 backdrop-blur-md border border-white/10">
                    <span className="material-symbols-outlined text-cream text-base material-symbols-fill">
                      schedule
                    </span>
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
          className="py-16 bg-cream border-y border-cream-border/60"
          id="best-sellers"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-amber-brand text-xs font-bold uppercase tracking-wider">
                Parlour Highlights
              </span>
              <h2 className="font-headline text-3xl md:text-4xl text-choco font-bold mt-1">
                Our Signature Creations
              </h2>
              <p className="text-sm md:text-base text-choco/75 mt-2">
                Beloved dessert crafts prepared fresh to order with rich dairy
                cream, roasted crunch, and artisanal syrups.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SIGNATURE_ITEMS.map((item) => {
                const badgeClass =
                  SIGNATURE_BADGE_CLASSES[item.tag || 'Signature'] ||
                  'bg-amber-brand text-white';
                const displayTitle =
                  item.id === 'sig-waffle-cone'
                    ? 'Special Waffle Cone with Crunch'
                    : item.id === 'sig-cold-coffee'
                      ? 'Cold Coffee SSS Special'
                      : item.id === 'sig-slush'
                        ? 'Sub-Zero Icy Slush'
                        : item.name;
                return (
                  <div
                    key={item.id}
                    className="product-card bg-white rounded-2xl p-4 md:p-5 border border-cream-border card-shadow card-shadow-hover transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="product-image mb-4">
                        <img
                          alt={displayTitle}
                          src={item.image}
                          referrerPolicy="no-referrer"
                        />
                        {item.tag && (
                          <span
                            className={`absolute top-2.5 left-2.5 ${badgeClass} text-[11px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wide`}
                          >
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-headline text-lg font-bold text-choco">
                          {displayTitle}
                        </h3>
                        <span className="font-headline text-lg text-amber-brand font-bold whitespace-nowrap">
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
                        onClick={() =>
                          handleAddToCart({
                            name: item.name,
                            price: item.price,
                            image: item.image,
                          })
                        }
                        className="px-3 py-1.5 rounded-lg border border-choco text-choco text-xs font-bold hover:bg-cream transition-colors flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">
                          add_shopping_cart
                        </span>{' '}
                        Add
                      </button>
                      <a
                        href={buildWhatsAppUrl(
                          buildSingleOrderWhatsAppMessage(item.name, item.price)
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 bg-choco text-white rounded-lg text-xs font-bold hover:bg-amber-brand transition-colors flex items-center gap-1"
                      >
                        <span>Order</span>
                        <span className="material-symbols-outlined text-sm">
                          chat
                        </span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FULL INTERACTIVE MENU SECTION */}
        <section
          className="py-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-12"
          id="menu"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-cream-border">
            <div>
              <span className="text-amber-brand text-xs font-bold uppercase tracking-wider">
                The Complete Parlour Selection
              </span>
              <h2 className="font-headline text-3xl md:text-4xl text-choco font-bold mt-1">
                Explore Our Full Menu
              </h2>
              <p className="text-sm text-choco/75 mt-1">
                Click any category button below to filter items in real time.
              </p>
            </div>
            {/* Extra Topping Banner Callout */}
            <div className="mt-4 md:mt-0 p-3.5 rounded-xl bg-white border border-cream-border flex items-center gap-3 card-shadow">
              <span className="material-symbols-outlined text-amber-brand text-2xl material-symbols-fill">
                add_circle
              </span>
              <div>
                <span className="text-xs font-bold text-choco block">
                  Extra Topping • Rs. {EXTRA_TOPPING_PRICE}
                </span>
                <span className="text-[11px] text-choco/70">
                  Sprinkles, Fudge, Crushed Nuts, Oreo &amp; Caramel
                </span>
              </div>
            </div>
          </div>

          {/* Real-time Filter Buttons */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-4 mb-8"
            id="categoryFilterBar"
            role="tablist"
            aria-label="Menu Category Filter"
          >
            {MENU_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={
                    isActive
                      ? 'menu-filter-btn px-5 py-2.5 rounded-full text-xs font-bold bg-choco text-white whitespace-nowrap transition-colors shadow-xs'
                      : 'menu-filter-btn px-5 py-2.5 rounded-full text-xs font-bold bg-white text-choco border border-cream-border whitespace-nowrap hover:bg-cream transition-colors'
                  }
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Dynamic Product Cards Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            id="menuItemsContainer"
            data-testid="menu-items-grid"
          >
            {filteredMenuItems.map((item: MenuItem) => (
              <article
                key={item.id}
                className="product-card bg-white rounded-2xl p-4 md:p-5 border border-cream-border card-shadow card-shadow-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="product-image mb-3.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-choco text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider shadow-xs">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-headline text-base md:text-lg font-bold text-choco">
                      {item.name}
                    </h4>
                    <span className="font-headline text-base md:text-lg text-amber-brand font-bold whitespace-nowrap">
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
                    onClick={() =>
                      handleAddToCart({
                        name: item.name,
                        price: item.price,
                        image: item.image,
                      })
                    }
                    className="px-3 py-1.5 rounded-lg border border-choco text-choco text-xs font-bold hover:bg-cream transition-colors flex items-center gap-1 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-sm">
                      add_shopping_cart
                    </span>{' '}
                    Add
                  </button>
                  <a
                    href={buildWhatsAppUrl(
                      buildSingleOrderWhatsAppMessage(item.name, item.price)
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-choco text-white rounded-lg text-xs font-bold hover:bg-amber-brand transition-colors flex items-center gap-1 active:scale-95"
                  >
                    <span>Order</span>
                    <span className="material-symbols-outlined text-sm">
                      chat
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* 14 Refreshing Slush Highlight Banner */}
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-brand/15 via-cream to-amber-brand/10 border border-amber-brand/30 shadow-xs">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <span className="px-3 py-1 rounded bg-amber-brand text-white text-[11px] font-bold uppercase tracking-wider">
                  Sub-Zero Sensation
                </span>
                <h3 className="font-headline text-2xl md:text-3xl text-choco font-bold mt-2">
                  14 Refreshing Slush Flavours
                </h3>
                <p className="text-xs sm:text-sm text-choco/80 max-w-2xl mt-1 leading-relaxed">
                  Mango • Black Currant • Orange • Blueberry • Pineapple •
                  Strawberry • Pomegranate • Tamarind (Imli) • Peach • Lychee •
                  Cherry • Lemon • Falsa • Green Apple
                </p>
              </div>
              <a
                href={buildWhatsAppUrl(
                  buildSingleOrderWhatsAppMessage(
                    'Icy Slush (Pick Your Flavour)',
                    180
                  )
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-amber-brand text-white text-xs font-bold hover:bg-[#d86111] transition-all whitespace-nowrap shadow-sm flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">
                  ac_unit
                </span>
                <span>Order Fresh Slush (Rs. 180)</span>
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT SSS SECTION */}
        <section
          className="py-20 bg-white border-y border-cream-border/60"
          id="about"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-amber-brand text-xs font-bold uppercase tracking-wider">
                  The Boutique Story
                </span>
                <h2 className="font-headline text-3xl md:text-4xl text-choco font-bold leading-tight">
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
                    <span className="font-headline text-3xl text-amber-brand block font-bold">
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
                    <span className="font-headline text-3xl text-amber-brand block font-bold">
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

              {/* Authentic Atmosphere Images */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-md h-56 bg-cream">
                    <img
                      alt="SSS Evening Atmosphere"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      src="/images/storefront-hero.png"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-md h-40 bg-cream">
                    <img
                      alt="Cold Coffee SSS Special"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      src="/images/cold-coffee-crunch.jpg"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-6">
                  <div className="rounded-2xl overflow-hidden shadow-md h-40 bg-cream">
                    <img
                      alt="Warm Fudgy Brownie"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      src="/images/chocolate-brownie-cup.jpg"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-md h-56 bg-cream">
                    <img
                      alt="Freshly Pressed Waffle Cone"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      src="/images/waffle-cone.jpg"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-16 bg-cream" id="why-us">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-amber-brand text-xs font-bold uppercase tracking-wider">
                Quality First
              </span>
              <h2 className="font-headline text-3xl md:text-4xl text-choco font-bold mt-1">
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
                  <span className="material-symbols-outlined text-2xl material-symbols-fill">
                    local_drink
                  </span>
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
                  <span className="material-symbols-outlined text-2xl material-symbols-fill">
                    cookie
                  </span>
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
                  <span className="material-symbols-outlined text-2xl material-symbols-fill">
                    ac_unit
                  </span>
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
                  <span className="material-symbols-outlined text-2xl material-symbols-fill">
                    sanitizer
                  </span>
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
          className="py-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-12"
          id="gallery"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-brand text-xs font-bold uppercase tracking-wider">
              Atmosphere &amp; Delights
            </span>
            <h2 className="font-headline text-3xl md:text-4xl text-choco font-bold mt-1">
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
                className={
                  item.featured
                    ? 'md:col-span-2 lg:col-span-2 md:row-span-2 relative group rounded-2xl overflow-hidden cursor-pointer card-shadow bg-cream text-left'
                    : 'relative group rounded-2xl overflow-hidden cursor-pointer card-shadow h-52 bg-cream text-left'
                }
              >
                <img
                  alt={item.title}
                  className={
                    item.featured
                      ? 'w-full h-full min-h-[320px] md:min-h-[440px] object-cover group-hover:scale-105 transition-transform duration-500'
                      : 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                  }
                  src={item.image}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-choco/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span
                    className={`material-symbols-outlined text-white ${
                      item.featured ? 'text-4xl' : 'text-3xl'
                    }`}
                  >
                    zoom_in
                  </span>
                </div>
                <div
                  className={
                    item.featured
                      ? 'absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-choco'
                      : 'absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded text-xs font-semibold text-choco'
                  }
                >
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
              <h2 className="font-headline text-3xl text-choco font-bold mt-1">
                Loved by Dessert Lovers
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-cream border border-cream-border card-shadow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex text-amber-brand text-sm">★★★★★</div>
                  <p className="text-xs text-choco/80 leading-relaxed italic">
                    "The SSS Special cup with peanut crunch is easily the best
                    ice cream in town. Very creamy and generous portions!"
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-cream-border flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-choco text-white text-xs font-bold flex items-center justify-center">
                    H
                  </div>
                  <div>
                    <span className="text-xs font-bold text-choco block">
                      Hamza Tariq
                    </span>
                    <span className="text-[10px] text-choco/60">
                      Regular Customer
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-cream border border-cream-border card-shadow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex text-amber-brand text-sm">★★★★★</div>
                  <p className="text-xs text-choco/80 leading-relaxed italic">
                    "Their Tamarind and Black Currant slush flavours are pure
                    heaven in the evening heat. Fast WhatsApp order response
                    too!"
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-cream-border flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-choco text-white text-xs font-bold flex items-center justify-center">
                    S
                  </div>
                  <div>
                    <span className="text-xs font-bold text-choco block">
                      Sana Sheikh
                    </span>
                    <span className="text-[10px] text-choco/60">
                      Verified Order
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-cream border border-cream-border card-shadow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex text-amber-brand text-sm">★★★★★</div>
                  <p className="text-xs text-choco/80 leading-relaxed italic">
                    "Warm freshly baked waffle cones with chocolate dip and
                    peanuts. You can smell the bakery aroma as soon as you walk
                    up!"
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-cream-border flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-choco text-white text-xs font-bold flex items-center justify-center">
                    A
                  </div>
                  <div>
                    <span className="text-xs font-bold text-choco block">
                      Ali Raza
                    </span>
                    <span className="text-[10px] text-choco/60">Foodie</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOCATION & OPENING HOURS */}
        <section className="py-20 bg-cream" id="contact">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Contact & Timings Info */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-amber-brand text-xs font-bold uppercase tracking-wider">
                  Plan Your Visit
                </span>
                <h2 className="font-headline text-3xl md:text-4xl text-choco font-bold">
                  Location &amp; Hours
                </h2>
                <p className="text-sm text-choco/75">
                  Stop by for a midnight sweet tooth craving or order swift
                  delivery directly to your doorstep via WhatsApp.
                </p>
                <div className="space-y-4 pt-2">
                  {/* Timings */}
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-cream-border card-shadow">
                    <span className="material-symbols-outlined text-amber-brand text-2xl mt-0.5 material-symbols-fill">
                      schedule
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-choco">
                        Operating Hours
                      </h4>
                      <p className="text-xs text-choco/75 mt-0.5">
                        Monday – Sunday:{' '}
                        <strong className="text-choco font-bold">
                          1:00 PM – 1:00 AM
                        </strong>
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800">
                        Open Daily
                      </span>
                    </div>
                  </div>
                  {/* WhatsApp Hotline */}
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-cream-border card-shadow">
                    <span className="material-symbols-outlined text-green-600 text-2xl mt-0.5 material-symbols-fill">
                      chat
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-choco">
                        Order Hotline &amp; WhatsApp
                      </h4>
                      <a
                        className="text-xs font-bold text-amber-brand hover:underline"
                        href={`https://wa.me/${WHATSAPP_PHONE}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +92 321 8822161
                      </a>
                      <p className="text-[11px] text-choco/60 mt-0.5">
                        Quick responses for takeaway &amp; delivery
                      </p>
                    </div>
                  </div>
                  {/* Store Address */}
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-cream-border card-shadow">
                    <span className="material-symbols-outlined text-amber-brand text-2xl mt-0.5 material-symbols-fill">
                      pin_drop
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-choco">
                        Parlour Address
                      </h4>
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
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#F47721_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="relative z-10 text-center p-6 bg-white/95 rounded-2xl shadow-lg border border-cream-border max-w-sm">
                      <span className="material-symbols-outlined text-amber-brand text-3xl material-symbols-fill mb-1">
                        icecream
                      </span>
                      <h4 className="font-headline text-sm font-bold text-choco">
                        SSS Ice Cream &amp; Snacks
                      </h4>
                      <p className="text-xs text-choco/70 mt-1">
                        Main Boutique Boulevard • Open Till 1:00 AM
                      </p>
                      <a
                        className="inline-flex items-center gap-1 text-xs font-bold text-amber-brand mt-3 hover:underline"
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Open in Google Maps</span>
                        <span className="material-symbols-outlined text-xs">
                          arrow_forward
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-cream-border">
                    <span className="text-xs text-choco/70">
                      Custom bulk orders, birthday sundae bars &amp; events?
                    </span>
                    <a
                      className="px-4 py-2 rounded-xl bg-choco text-white text-xs font-bold hover:bg-amber-brand transition-colors flex items-center gap-1.5"
                      href={`https://wa.me/${WHATSAPP_PHONE}?text=Assalam-o-Alaikum!%20I%20am%20inquiring%20about%20event%20catering%20and%20party%20tasting%20boxes.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="material-symbols-outlined text-sm">
                        celebration
                      </span>
                      <span>Event Catering Query</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="docked full-width bg-choco text-cream border-t border-choco-dark">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 flex flex-col gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Block */}
            <div className="lg:col-span-2 space-y-4">
              <a className="flex items-center gap-3" href="#home">
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
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-amber-brand transition-colors"
                  href={`https://wa.me/${WHATSAPP_PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-base">
                    chat
                  </span>
                </a>
                <a
                  aria-label="Location"
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-amber-brand transition-colors"
                  href="#contact"
                >
                  <span className="material-symbols-outlined text-base">
                    location_on
                  </span>
                </a>
                <a
                  aria-label="Menu"
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-amber-brand transition-colors"
                  href="#menu"
                >
                  <span className="material-symbols-outlined text-base">
                    restaurant_menu
                  </span>
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
                    className="hover:text-amber-brand transition-colors"
                    href="#home"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-brand transition-colors"
                    href="#best-sellers"
                  >
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-brand transition-colors"
                    href="#menu"
                  >
                    Our Menu
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-brand transition-colors"
                    href="#about"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-brand transition-colors"
                    href="#gallery"
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
                  <a
                    className="hover:text-amber-brand transition-colors"
                    href="#menu"
                    onClick={() => handleSelectCategory('Ice Cream')}
                  >
                    Handmade Cones
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-brand transition-colors"
                    href="#menu"
                    onClick={() => handleSelectCategory('Waffles')}
                  >
                    Belgian Waffles
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-brand transition-colors"
                    href="#menu"
                    onClick={() => handleSelectCategory('Cold Coffee')}
                  >
                    Cold Coffee Floats
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-brand transition-colors"
                    href="#menu"
                    onClick={() => handleSelectCategory('Shakes')}
                  >
                    Thick Milkshakes
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-brand transition-colors"
                    href="#menu"
                    onClick={() => handleSelectCategory('Slush')}
                  >
                    14 Slush Flavours
                  </a>
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
                  className="text-xs font-bold text-amber-brand hover:underline"
                  href={`https://wa.me/${WHATSAPP_PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +92 321 8822161
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/50 gap-4">
            <p>© 2024 SSS Ice Cream &amp; Snacks. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <a
                className="hover:text-amber-brand transition-colors"
                href="#contact"
              >
                Store Hours
              </a>
              <a
                className="hover:text-amber-brand transition-colors"
                href={`https://wa.me/${WHATSAPP_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Ordering
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* SLIDE-OUT SHOPPING CART DRAWER */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-choco/60 backdrop-blur-xs z-50 transition-opacity"
          id="cartOverlay"
          onClick={() => setIsCartOpen(false)}
        />
      )}
      <div
        id="cartDrawer"
        aria-label="Your Order Cart"
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 transform transition-transform duration-300 shadow-2xl flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-cream-border flex items-center justify-between bg-cream">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-brand text-2xl">
              shopping_cart
            </span>
            <h3 className="font-headline text-lg font-bold text-choco">
              Your Order Cart
            </h3>
          </div>
          <button
            type="button"
            aria-label="Close cart"
            onClick={() => setIsCartOpen(false)}
            className="p-1 rounded-lg hover:bg-white text-choco transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Cart Items Container */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4" id="cartItemsList">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-choco/60">
              <span className="material-symbols-outlined text-4xl mb-2 text-choco/30">
                remove_shopping_cart
              </span>
              <p className="text-xs font-semibold">
                Your cart is currently empty.
              </p>
              <p className="text-[11px] mt-1 text-choco/50">
                Explore our menu and add your favorite treats!
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 p-3 rounded-xl bg-cream border border-cream-border"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-lg object-cover bg-white"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-choco truncate">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-amber-brand font-semibold">
                    Rs. {item.price}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() => handleAdjustQuantity(item.name, -1)}
                      className="w-6 h-6 rounded bg-white text-choco font-bold text-xs flex items-center justify-center hover:bg-amber-brand hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-choco">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() => handleAdjustQuantity(item.name, 1)}
                      className="w-6 h-6 rounded bg-white text-choco font-bold text-xs flex items-center justify-center hover:bg-amber-brand hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-choco block">
                    Rs. {item.price * item.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name} from cart`}
                    onClick={() => handleRemoveFromCart(item.name)}
                    className="text-red-500 hover:text-red-700 text-xs mt-2"
                    title="Remove item"
                  >
                    <span className="material-symbols-outlined text-base">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer / Checkout */}
        <div className="p-5 border-t border-cream-border bg-cream space-y-4">
          {emptyCartNotice && cart.length === 0 && (
            <p className="text-xs font-semibold text-red-600 text-center">
              Your cart is empty. Please add items first.
            </p>
          )}
          {/* Extra Topping Option */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-choco font-semibold">
              <input
                id="cartExtraToppings"
                type="checkbox"
                checked={extraToppings}
                onChange={(e) => setExtraToppings(e.target.checked)}
                className="rounded border-cream-border text-amber-brand focus:ring-amber-brand"
              />
              <span>Add Toppings to Order (+Rs. 20)</span>
            </label>
          </div>
          {/* Subtotal */}
          <div className="flex items-center justify-between pt-2 border-t border-cream-border">
            <span className="text-xs text-choco/70">Estimated Subtotal</span>
            <span
              className="font-headline text-xl font-bold text-choco"
              id="cartTotalPrice"
              data-testid="cart-total-price"
            >
              Rs. {cartTotals.total}
            </span>
          </div>
          {/* WhatsApp Checkout Trigger Button */}
          {cart.length > 0 ? (
            <a
              href={cartWhatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-choco text-white text-xs font-bold hover:bg-amber-brand transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              <span className="material-symbols-outlined text-green-400 text-lg material-symbols-fill">
                chat
              </span>
              <span>Checkout via WhatsApp</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={() => setEmptyCartNotice(true)}
              className="w-full py-3.5 rounded-xl bg-choco text-white text-xs font-bold hover:bg-amber-brand transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              <span className="material-symbols-outlined text-green-400 text-lg material-symbols-fill">
                chat
              </span>
              <span>Checkout via WhatsApp</span>
            </button>
          )}
          <p className="text-[11px] text-center text-choco/60">
            Transmitted directly to hotline:{' '}
            <span className="font-bold text-choco">+92 321 8822161</span>
          </p>
        </div>
      </div>

      {/* FLOATING QUICK WHATSAPP FAB BUTTON */}
      <aside aria-label="Quick Actions" className="fixed bottom-6 right-6 z-40">
        <a
          aria-label="Chat on WhatsApp"
          className="w-14 h-14 rounded-full bg-green-600 text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-white focus:outline-none"
          href={`https://wa.me/${WHATSAPP_PHONE}?text=Assalam-o-Alaikum!%20I%20would%20like%20to%20order%20from%20SSS%20Ice%20Cream%20%26%20Snacks.`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="material-symbols-outlined text-3xl material-symbols-fill">
            chat
          </span>
        </a>
      </aside>

      {/* LIGHTBOX MODAL */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-choco/90 backdrop-blur-md flex items-center justify-center p-4"
          id="lightboxModal"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close lightbox"
              className="absolute -top-12 right-0 text-white hover:text-amber-brand transition-colors"
              onClick={() => setLightboxItem(null)}
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            <img
              alt={lightboxItem.caption}
              className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl border-2 border-white/20"
              id="lightboxImg"
              src={lightboxItem.image}
              referrerPolicy="no-referrer"
            />
            <p
              className="text-white text-sm font-semibold mt-3 text-center"
              id="lightboxCaption"
            >
              {lightboxItem.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
