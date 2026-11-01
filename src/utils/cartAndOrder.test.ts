import test from 'node:test';
import assert from 'node:assert/strict';
import { MENU_DATA, SIGNATURE_ITEMS } from '../data/menuData';
import {
  addItemToCart,
  adjustItemQuantity,
  buildCartWhatsAppMessage,
  buildSingleOrderWhatsAppMessage,
  calculateCartTotals,
  filterMenuItems,
  removeItemFromCart,
} from './cartAndOrder';

test('menu dataset contains all 24 parlour items and 6 signature items with valid image paths', () => {
  assert.equal(MENU_DATA.length, 24);
  assert.equal(SIGNATURE_ITEMS.length, 6);
  for (const item of [...SIGNATURE_ITEMS, ...MENU_DATA]) {
    assert.ok(item.image.startsWith('/images/'), `Expected local image path for ${item.name}`);
    assert.ok(item.publicUrl.includes('aida-public'), `Expected public fallback URL for ${item.name}`);
    assert.ok(item.price > 0, `Expected positive price for ${item.name}`);
  }
});

test('filterMenuItems filters accurately by category and search query', () => {
  const all = filterMenuItems(MENU_DATA, 'All');
  assert.equal(all.length, 24);

  const waffles = filterMenuItems(MENU_DATA, 'Waffles');
  assert.equal(waffles.length, 3);

  const coldCoffee = filterMenuItems(MENU_DATA, 'Cold Coffee');
  assert.equal(coldCoffee.length, 3);

  const shakes = filterMenuItems(MENU_DATA, 'Shakes');
  assert.equal(shakes.length, 3);

  const sundaes = filterMenuItems(MENU_DATA, 'Sundaes');
  assert.equal(sundaes.length, 5);

  const slush = filterMenuItems(MENU_DATA, 'Slush');
  assert.equal(slush.length, 1);

  const searchOreo = filterMenuItems(MENU_DATA, 'All', 'Oreo');
  assert.equal(searchOreo.length, 2); // Oreo Cone + Oreo Shake
});

test('cart state additions, quantity adjustments, removals, and extra toppings math work', () => {
  let cart = addItemToCart([], {
    name: 'SSS Special Ice Cream',
    price: 350,
    image: '/images/ice-cream-cup-large.jpg',
  });
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 1);

  cart = addItemToCart(cart, {
    name: 'SSS Special Ice Cream',
    price: 350,
    image: '/images/ice-cream-cup-large.jpg',
  });
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 2);

  cart = addItemToCart(cart, {
    name: 'Oreo Shake',
    price: 380,
    image: '/images/oreo-shake.jpg',
  });
  assert.equal(cart.length, 2);

  const totalsWithoutToppings = calculateCartTotals(cart, false);
  assert.equal(totalsWithoutToppings.itemCount, 3);
  assert.equal(totalsWithoutToppings.itemsSubtotal, 1080);
  assert.equal(totalsWithoutToppings.total, 1080);

  const totalsWithToppings = calculateCartTotals(cart, true);
  assert.equal(totalsWithToppings.extraToppingsCost, 20);
  assert.equal(totalsWithToppings.total, 1100);

  cart = adjustItemQuantity(cart, 'SSS Special Ice Cream', -1);
  assert.equal(cart[0].quantity, 1);

  cart = removeItemFromCart(cart, 'Oreo Shake');
  assert.equal(cart.length, 1);
});

test('WhatsApp order formatting matches parlour specification', () => {
  const singleMsg = buildSingleOrderWhatsAppMessage('Oreo Shake', 380);
  assert.ok(singleMsg.includes('Product: Oreo Shake'));
  assert.ok(singleMsg.includes('Price: Rs. 380'));
  assert.ok(singleMsg.includes('Quantity: 1'));

  const cartMsg = buildCartWhatsAppMessage(
    [{ name: 'Brownie with Ice Cream', price: 350, image: '/images/chocolate-brownie-cup.jpg', quantity: 2 }],
    true
  );
  assert.ok(cartMsg.includes('- Brownie with Ice Cream (Qty: 2, Price: Rs. 700)'));
  assert.ok(cartMsg.includes('- Extra Toppings (+Rs. 20)'));
  assert.ok(cartMsg.includes('Total: Rs. 720'));
});
