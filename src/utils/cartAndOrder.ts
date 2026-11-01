import {
  EXTRA_TOPPING_PRICE,
  MenuItem,
  WHATSAPP_PHONE,
} from '../data/menuData';

export interface CartItem {
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartTotals {
  itemCount: number;
  itemsSubtotal: number;
  extraToppingsCost: number;
  total: number;
}

export function filterMenuItems(
  items: MenuItem[],
  category: string,
  searchQuery = ''
): MenuItem[] {
  const normalizedCategory = category.trim().toLowerCase();
  const normalizedSearch = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory =
      normalizedCategory === 'all' ||
      item.category.toLowerCase().includes(normalizedCategory);
    if (!matchesCategory) return false;

    if (!normalizedSearch) return true;
    return (
      item.name.toLowerCase().includes(normalizedSearch) ||
      item.desc.toLowerCase().includes(normalizedSearch) ||
      item.category.toLowerCase().includes(normalizedSearch)
    );
  });
}

export function addItemToCart(
  cart: CartItem[],
  item: { name: string; price: number; image: string }
): CartItem[] {
  const existingIndex = cart.findIndex((c) => c.name === item.name);
  if (existingIndex > -1) {
    return cart.map((c, idx) =>
      idx === existingIndex ? { ...c, quantity: c.quantity + 1 } : c
    );
  }
  return [
    ...cart,
    {
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    },
  ];
}

export function adjustItemQuantity(
  cart: CartItem[],
  name: string,
  delta: number
): CartItem[] {
  return cart
    .map((item) =>
      item.name === name ? { ...item, quantity: item.quantity + delta } : item
    )
    .filter((item) => item.quantity > 0);
}

export function removeItemFromCart(cart: CartItem[], name: string): CartItem[] {
  return cart.filter((item) => item.name !== name);
}

export function calculateCartTotals(
  cart: CartItem[],
  includeExtraToppings: boolean
): CartTotals {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const itemsSubtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const extraToppingsCost =
    itemCount > 0 && includeExtraToppings ? EXTRA_TOPPING_PRICE : 0;
  return {
    itemCount,
    itemsSubtotal,
    extraToppingsCost,
    total: itemsSubtotal + extraToppingsCost,
  };
}

export function buildSingleOrderWhatsAppMessage(
  productName: string,
  price: number,
  flavourNote?: string
): string {
  const productLine = flavourNote
    ? `${productName} (${flavourNote})`
    : productName;
  return `Assalam-o-Alaikum! I would like to order:\nProduct: ${productLine}\nPrice: Rs. ${price}\nQuantity: 1\nPlease confirm my order.`;
}

export function buildCartWhatsAppMessage(
  cart: CartItem[],
  includeExtraToppings: boolean,
  customerNotes?: string
): string {
  if (cart.length === 0) return '';
  const totals = calculateCartTotals(cart, includeExtraToppings);
  let itemsText = cart
    .map(
      (i) => `- ${i.name} (Qty: ${i.quantity}, Price: Rs. ${i.price * i.quantity})`
    )
    .join('\n');

  if (includeExtraToppings) {
    itemsText += `\n- Extra Toppings (+Rs. ${EXTRA_TOPPING_PRICE})`;
  }

  const notesLine =
    customerNotes && customerNotes.trim()
      ? `\nNotes: ${customerNotes.trim()}`
      : '';

  return `Assalam-o-Alaikum! I would like to order:\n${itemsText}${notesLine}\nTotal: Rs. ${totals.total}\nPlease confirm my order.`;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
