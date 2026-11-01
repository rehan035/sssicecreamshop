import React, { useState } from 'react';
import {
  ShoppingBag,
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  AlertCircle,
} from 'lucide-react';
import {
  CartItem,
  calculateCartTotals,
} from '../utils/cartAndOrder';
import { EXTRA_TOPPING_PRICE, WHATSAPP_DISPLAY } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  extraToppings: boolean;
  onToggleExtraToppings: (checked: boolean) => void;
  onAdjustQuantity: (name: string, delta: number) => void;
  onRemoveItem: (name: string) => void;
  onProceedToWhatsApp: (customerNotes: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  extraToppings,
  onToggleExtraToppings,
  onAdjustQuantity,
  onRemoveItem,
  onProceedToWhatsApp,
}) => {
  const [customerNotes, setCustomerNotes] = useState('');
  const [emptyError, setEmptyError] = useState(false);

  const totals = calculateCartTotals(cart, extraToppings);

  const handleCheckoutClick = () => {
    if (cart.length === 0) {
      setEmptyError(true);
      return;
    }
    setEmptyError(false);
    onProceedToWhatsApp(customerNotes);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-choco/60 backdrop-blur-xs z-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        aria-label="Shopping Cart Drawer"
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col border-l border-cream-border"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-cream-border flex items-center justify-between bg-cream">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-amber-brand" />
            <h3 className="font-headline text-lg font-bold text-choco">
              Your Order Cart
            </h3>
            <span className="text-xs text-choco/70 tabular-nums">
              ({totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'})
            </span>
          </div>
          <button
            type="button"
            aria-label="Close cart"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white text-choco transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items Container */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-choco/60">
              <ShoppingBag className="w-10 h-10 mx-auto mb-3 text-choco/25" />
              <p className="text-sm font-semibold text-choco">
                Your cart is currently empty.
              </p>
              <p className="text-xs mt-1 text-choco/60">
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
                  className="w-14 h-14 rounded-lg object-cover bg-white shrink-0 border border-cream-border/60"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-choco truncate">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-amber-brand font-semibold tabular-nums">
                    Rs. {item.price}
                  </span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() => onAdjustQuantity(item.name, -1)}
                      className="w-6 h-6 rounded bg-white border border-cream-border text-choco font-bold text-xs flex items-center justify-center hover:bg-amber-brand hover:text-white transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span
                      className="text-xs font-bold text-choco tabular-nums min-w-4 text-center"
                      data-testid={`cart-qty-${item.name}`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() => onAdjustQuantity(item.name, 1)}
                      className="w-6 h-6 rounded bg-white border border-cream-border text-choco font-bold text-xs flex items-center justify-center hover:bg-amber-brand hover:text-white transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-choco block tabular-nums">
                    Rs. {item.price * item.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name} from cart`}
                    onClick={() => onRemoveItem(item.name)}
                    className="text-red-600 hover:text-red-800 text-xs mt-2 p-1 rounded hover:bg-red-50 transition-colors inline-flex items-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer / Checkout */}
        <div className="p-5 border-t border-cream-border bg-cream space-y-4">
          {emptyError && cart.length === 0 && (
            <div
              role="alert"
              className="flex items-center gap-2 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs font-medium"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Please add at least one item to your cart before checking out.</span>
            </div>
          )}

          {/* Extra Topping Option */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-choco font-semibold select-none">
              <input
                type="checkbox"
                checked={extraToppings}
                onChange={(e) => onToggleExtraToppings(e.target.checked)}
                className="rounded border-cream-border text-amber-brand focus:ring-amber-brand w-4 h-4"
              />
              <span>Add Toppings to Order (+Rs. {EXTRA_TOPPING_PRICE})</span>
            </label>
          </div>

          {/* Optional Flavour / Delivery Notes */}
          {cart.length > 0 && (
            <div>
              <label
                htmlFor="cart-customer-notes"
                className="block text-[11px] font-semibold text-choco/75 mb-1"
              >
                Flavour Preference or Delivery Notes (Optional)
              </label>
              <input
                id="cart-customer-notes"
                type="text"
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder="e.g., Mango slush, extra chocolate fudge..."
                className="w-full px-3 py-2 rounded-lg bg-white border border-cream-border text-xs text-choco placeholder:text-choco/40 focus:outline-none focus:border-amber-brand"
              />
            </div>
          )}

          {/* Subtotal */}
          <div className="flex items-center justify-between pt-2 border-t border-cream-border">
            <span className="text-xs text-choco/75 font-medium">
              Estimated Subtotal
            </span>
            <span
              className="font-headline text-xl font-bold text-choco tabular-nums"
              data-testid="cart-total-price"
            >
              Rs. {totals.total}
            </span>
          </div>

          {/* WhatsApp Checkout Trigger Button */}
          <button
            type="button"
            onClick={handleCheckoutClick}
            className="w-full py-3.5 px-4 rounded-xl bg-choco text-white text-xs font-bold hover:bg-amber-brand transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 text-green-400" />
            <span>Checkout via WhatsApp</span>
          </button>
          <p className="text-[11px] text-center text-choco/60">
            Transmitted directly to hotline:{' '}
            <span className="font-bold text-choco">{WHATSAPP_DISPLAY}</span>
          </p>
        </div>
      </aside>
    </>
  );
};
