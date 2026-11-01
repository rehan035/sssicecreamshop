export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'Ice Cream' | 'Waffles' | 'Cold Coffee' | 'Shakes' | 'Sundaes' | 'Slush';
  desc: string;
  image: string;
  publicUrl: string;
  tag?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  featured?: boolean;
}

export interface TestimonialItem {
  id: string;
  initial: string;
  name: string;
  role: string;
  quote: string;
}

export const WHATSAPP_PHONE = '923218822161';
export const WHATSAPP_DISPLAY = '+92 321 8822161';
export const EXTRA_TOPPING_PRICE = 20;

export const SLUSH_FLAVOURS: string[] = [
  'Mango',
  'Black Currant',
  'Orange',
  'Blueberry',
  'Pineapple',
  'Strawberry',
  'Pomegranate',
  'Tamarind (Imli)',
  'Peach',
  'Lychee',
  'Cherry',
  'Lemon',
  'Falsa',
  'Green Apple',
];

export const MENU_CATEGORIES = [
  { id: 'All', label: 'All Items' },
  { id: 'Ice Cream', label: 'Ice Cream' },
  { id: 'Waffles', label: 'Waffles & Warm' },
  { id: 'Cold Coffee', label: 'Cold Coffee' },
  { id: 'Shakes', label: 'Shakes' },
  { id: 'Sundaes', label: 'Sundae Cups' },
  { id: 'Slush', label: '14 Slush Flavours' },
] as const;

export const STOREFRONT_HERO_IMAGE = '/images/storefront-hero.png';

export const SIGNATURE_ITEMS: MenuItem[] = [
  {
    id: 'sig-sss-special',
    name: 'SSS Special Ice Cream',
    price: 350,
    category: 'Ice Cream',
    tag: 'Signature',
    desc: 'Our crown jewel: triple handcrafted scoops loaded with cashew pralines, roasted peanuts, and house drizzle.',
    image: '/images/ice-cream-cup-large.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGG62I2aZDGfQ-_ofbpYQtEQxEVF3-JXMySesMRvSiHb9a_6gdkvrg7CLAS-l62Rc6NDaDKAhGT13RP4HiqNYYKjrMH5kBWZPpkmOQPcyblWU_Ju4SIP9lL225uE3wiuavW-DiQLgBiPlmPfbKgKrmXp0D1LcAzco9NgldXY7-0XcjfyW1PYAOhYum9hnsjTALjs4qouRrYKKjlefxxtdjiG4uKH317EMFjkZkEvM',
  },
  {
    id: 'sig-oreo-shake',
    name: 'Oreo Shake',
    price: 380,
    category: 'Shakes',
    tag: 'Best Seller',
    desc: 'Ultra-thick churned shake blended with crunchy Oreo cookies, pure whole cream, and chocolate lace.',
    image: '/images/oreo-shake.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXt0SuYbJ0CLNsMEKZAY5i9xEIp_8xKvWqX4Dw1RyXutGxB6XfqgIFzEl0M1Az3oroKyBxGuN2y-wgH1cJtJZ6r7MOiBgL-dPelPApmTwiQS339PvwXIOisZt0wP9_LVZXRNX8X-jybrxs8csESb7ZlUee-ZAuyrtbDUNW0F2TNaES3NfE1OwTPSe0AIRystUotQPSkGQwR1Eatuj3Njfn53iSFuDNBFq5oLOY4Po',
  },
  {
    id: 'sig-waffle-cone',
    name: 'Special Waffle Cone with Crunch & Peanuts',
    price: 200,
    category: 'Waffles',
    tag: 'Freshly Baked',
    desc: 'Crisp waffle cone pressed on-site dipped in chocolate, rolled with roasted peanuts and filled with dairy gelato.',
    image: '/images/waffle-cone.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByvud1gG4RZiMmfENnxsDk-LMCRItuckBOTnAxwDKbqvMi3x9yxS5BjWVgu-vlnfqLZJNWeNIzJNcHn1At0mBGUCuXyNtR3mHj-TTz0-bSpVrtFXjA7MQ2prwlDuYzbOMOegk28w-ANY7GfY869xfPvzcs-OYqU2Yls6B4B5k2aCMqqoyfj99FwUcGDPKnLnPmcRJVKsWUuqEOPg2pwLK8jfBlo2rodr4aoZWTjho',
  },
  {
    id: 'sig-cold-coffee',
    name: 'Cold Coffee SSS Special with Crunch & Peanuts',
    price: 400,
    category: 'Cold Coffee',
    tag: 'Chilled Brew',
    desc: 'Double scoop artisanal float, thick caramel swirl, whipped cream and roasted peanut crunch topping.',
    image: '/images/cold-coffee-crunch.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRPZP33YTM2v70QB2wz26SyPRPO9zDRXxS5dWn8ALky7rpR6wltVvj5vuwjigIcM3PSunIi6smMSfTNxKPWJKNCu6O2llvuUjrhNXwQ2rRirzfmDbr7wR7oXpYteRXsuioH3k_Lfr10hq4BY9xcrLqKW8bp2u6i-lBAl8JfqmJ3dKMqfRSDxy4UyhH1fTd2KRZSrkzIT3pBzn4uIjQwudZd-F2BA9Ie4fOA2XmKrY',
  },
  {
    id: 'sig-brownie-ice-cream',
    name: 'Brownie with Ice Cream',
    price: 350,
    category: 'Waffles',
    tag: 'Warm & Cold',
    desc: 'Warm gooey dark chocolate brownie served with a melting scoop of pure Madagascar vanilla cream and hot fudge.',
    image: '/images/chocolate-brownie-cup.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP7_7HTk4NQmBjPhCilMkT5_BSQdf7snayDrFJnhVlscbT-gI2Djks9beqO56nudkokw7PCZ9XzBEoAo8RLOAEaRUHym996yCLVyhA4jLVujwcmeOKTn_XLWXlKuI2Ta6PrQ1l4wWA_GCHViTbYJQkgczt_lnGx2D3_PmlXhR-J1m6uynLAazNIx2JBWqLg2-iU-MQEP2FchJG9r3H_X4U7SwRgoz3gmwkrZjI0P4',
  },
  {
    id: 'sig-slush',
    name: 'Slush – 14 Flavours',
    price: 180,
    category: 'Slush',
    tag: 'Sub-Zero',
    desc: '14 vibrant refreshing fruit flavours including Mango, Peach, Tamarind (Imli), Blue Berry, Lychee, and Black Currant.',
    image: '/images/strawberry-cup.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlvpfeDkRl1arL0UlOBBW8hSUVoXzmUiK1q4kHw0mqAV54kOqYVQbpZ5b-F8uFkOLmmbbst-ZU5ut1XBb6Au3d1B0h_9cNWFyzClp_Bmb0U-a3KeLE-0tDhPIJsBy0BNuEpjqnJPLvHWO-T5zLxr0o9Kq1U8j1VFv3jzSWhciaIAY-q6BtBVb36keHFHIGIp0PzeWOL3M1bDsZs97qe3SL1dDln5EJFiGTiv8x__A',
  },
];

export const MENU_DATA: MenuItem[] = [
  // 1. ICE CREAM
  {
    id: 'cone-ice-cream',
    name: 'Cone Ice Cream',
    price: 120,
    category: 'Ice Cream',
    desc: 'Classic crisp wafer cone filled with our freshly churned creamy scoop.',
    image: '/images/waffle-cone.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByvud1gG4RZiMmfENnxsDk-LMCRItuckBOTnAxwDKbqvMi3x9yxS5BjWVgu-vlnfqLZJNWeNIzJNcHn1At0mBGUCuXyNtR3mHj-TTz0-bSpVrtFXjA7MQ2prwlDuYzbOMOegk28w-ANY7GfY869xfPvzcs-OYqU2Yls6B4B5k2aCMqqoyfj99FwUcGDPKnLnPmcRJVKsWUuqEOPg2pwLK8jfBlo2rodr4aoZWTjho',
  },
  {
    id: 'oreo-cone',
    name: 'Oreo Cone',
    price: 200,
    category: 'Ice Cream',
    desc: 'Chocolate cookie wafer cone crowned with cookies & cream churned gelato.',
    image: '/images/ice-cream-cup-medium.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtPZ3aTLtb4p8z1tFK3AWXy5BN3QaqVltca-A8ImzJTW-XeVgczPS3gYoeCdBSi4tKrAwaIaR7LptMbmA94aInPoKOx07ItgMnWGcsqU4OWoYkw-viKkOvKQiF0TD4EtWTntlgW30V1OtnfBVsZ17tUHvtskcMQpNmsemi2mKkQe5-Fq8Z4ujKfxATvl18wTWBYsmnIMPylhMVN75E0fiD27Fk58LgSUizj5ON5Tk',
  },
  {
    id: 'dip-cone',
    name: 'Dip Cone',
    price: 120,
    category: 'Ice Cream',
    desc: 'Silky soft-serve cone immersed in hardening warm chocolate shell.',
    image: '/images/waffle-cone.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByvud1gG4RZiMmfENnxsDk-LMCRItuckBOTnAxwDKbqvMi3x9yxS5BjWVgu-vlnfqLZJNWeNIzJNcHn1At0mBGUCuXyNtR3mHj-TTz0-bSpVrtFXjA7MQ2prwlDuYzbOMOegk28w-ANY7GfY869xfPvzcs-OYqU2Yls6B4B5k2aCMqqoyfj99FwUcGDPKnLnPmcRJVKsWUuqEOPg2pwLK8jfBlo2rodr4aoZWTjho',
  },
  {
    id: 'ice-cream-cup-kids',
    name: 'Ice Cream Cup – Kids',
    price: 120,
    category: 'Ice Cream',
    desc: 'Kid-sized portion of fresh wholesome cream ice cream with rainbow sprinkles.',
    image: '/images/ice-cream-cup-small.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvCwBHVRLqlaLYIbKqJ33D9wxJUJ2WBl17AwRonoIPUc1EaT_bORaPa6noe4fnkwMx4iRmJTi63SINr-4aRVmuiaslnQAKNppmgUMOwNFPtOVj9rwqw2p6fQONEl0GAs6Zb9H_GcElBfd_MwuT2P0vob6IqicJAJnA1dZGTDEKe_mPDYuRfhN0OnD5KRW7Id945bU5KHzJPnCguPdo3PI-nKymYdzvoWM_8Jvvqys',
  },
  {
    id: 'ice-cream-cup-small',
    name: 'Ice Cream Cup – Small',
    price: 150,
    category: 'Ice Cream',
    desc: 'Single satisfying scoop of pure churned dairy ice cream in cup.',
    image: '/images/ice-cream-cup-small.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvCwBHVRLqlaLYIbKqJ33D9wxJUJ2WBl17AwRonoIPUc1EaT_bORaPa6noe4fnkwMx4iRmJTi63SINr-4aRVmuiaslnQAKNppmgUMOwNFPtOVj9rwqw2p6fQONEl0GAs6Zb9H_GcElBfd_MwuT2P0vob6IqicJAJnA1dZGTDEKe_mPDYuRfhN0OnD5KRW7Id945bU5KHzJPnCguPdo3PI-nKymYdzvoWM_8Jvvqys',
  },
  {
    id: 'ice-cream-cup-medium',
    name: 'Ice Cream Cup – Medium',
    price: 200,
    category: 'Ice Cream',
    desc: 'Generous twin scoops with complimentary drizzle and crunchy wafer stick.',
    image: '/images/ice-cream-cup-medium.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtPZ3aTLtb4p8z1tFK3AWXy5BN3QaqVltca-A8ImzJTW-XeVgczPS3gYoeCdBSi4tKrAwaIaR7LptMbmA94aInPoKOx07ItgMnWGcsqU4OWoYkw-viKkOvKQiF0TD4EtWTntlgW30V1OtnfBVsZ17tUHvtskcMQpNmsemi2mKkQe5-Fq8Z4ujKfxATvl18wTWBYsmnIMPylhMVN75E0fiD27Fk58LgSUizj5ON5Tk',
  },
  {
    id: 'ice-cream-cup-large',
    name: 'Ice Cream Cup – Large',
    price: 330,
    category: 'Ice Cream',
    desc: 'Trio of creamy scoops with rich dessert syrup drizzle of choice.',
    image: '/images/ice-cream-cup-large.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGG62I2aZDGfQ-_ofbpYQtEQxEVF3-JXMySesMRvSiHb9a_6gdkvrg7CLAS-l62Rc6NDaDKAhGT13RP4HiqNYYKjrMH5kBWZPpkmOQPcyblWU_Ju4SIP9lL225uE3wiuavW-DiQLgBiPlmPfbKgKrmXp0D1LcAzco9NgldXY7-0XcjfyW1PYAOhYum9hnsjTALjs4qouRrYKKjlefxxtdjiG4uKH317EMFjkZkEvM',
  },
  {
    id: 'ice-cream-cup-crunch',
    name: 'Ice Cream Cup with Crunch & Peanuts',
    price: 350,
    category: 'Ice Cream',
    desc: 'Velvety scoops coated generously in roasted caramelized peanuts & toffee crunch.',
    image: '/images/caramel-cup.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoWvYn8FKkuisqWgoFs1W0BcUyIkfh_dWr4c09ImSuKNR3LjrU2BXlf5FuUlB3IKcYmaHiCd8czptNf-7dyf7CrWYyyKpISOmw-2TKG16-0DYxTnV4dRl9Un-Oe1TS7oBe3pSJtDhtdiU74Y8vRPSfB1z2FoU9UqccTTWtDWs4gsd1oN6OHpitWucolOtpa8i2GQZdBuwrQMNjYsM2ZwWpMKvnOyDB4l9Zw79f3mw',
  },
  {
    id: 'ice-cream-cup-sss-special',
    name: 'Ice Cream Cup – SSS Special',
    price: 350,
    category: 'Ice Cream',
    desc: 'House signature combination: premium scoops, assorted pralines, fudge & nuts.',
    image: '/images/ice-cream-cup-large.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGG62I2aZDGfQ-_ofbpYQtEQxEVF3-JXMySesMRvSiHb9a_6gdkvrg7CLAS-l62Rc6NDaDKAhGT13RP4HiqNYYKjrMH5kBWZPpkmOQPcyblWU_Ju4SIP9lL225uE3wiuavW-DiQLgBiPlmPfbKgKrmXp0D1LcAzco9NgldXY7-0XcjfyW1PYAOhYum9hnsjTALjs4qouRrYKKjlefxxtdjiG4uKH317EMFjkZkEvM',
  },

  // 2. WAFFLES & WARM
  {
    id: 'waffle-cone',
    name: 'Waffle Cone',
    price: 150,
    category: 'Waffles',
    desc: 'Crispy freshly pressed artisanal waffle cone with delicate caramelized butter flavor.',
    image: '/images/waffle-cone.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByvud1gG4RZiMmfENnxsDk-LMCRItuckBOTnAxwDKbqvMi3x9yxS5BjWVgu-vlnfqLZJNWeNIzJNcHn1At0mBGUCuXyNtR3mHj-TTz0-bSpVrtFXjA7MQ2prwlDuYzbOMOegk28w-ANY7GfY869xfPvzcs-OYqU2Yls6B4B5k2aCMqqoyfj99FwUcGDPKnLnPmcRJVKsWUuqEOPg2pwLK8jfBlo2rodr4aoZWTjho',
  },
  {
    id: 'special-waffle-cone-crunch',
    name: 'Special Waffle Cone with Crunch & Peanuts',
    price: 200,
    category: 'Waffles',
    desc: 'Our famous baked waffle cone dipped in chocolate and rolled in toasted peanuts.',
    image: '/images/waffle-cone.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByvud1gG4RZiMmfENnxsDk-LMCRItuckBOTnAxwDKbqvMi3x9yxS5BjWVgu-vlnfqLZJNWeNIzJNcHn1At0mBGUCuXyNtR3mHj-TTz0-bSpVrtFXjA7MQ2prwlDuYzbOMOegk28w-ANY7GfY869xfPvzcs-OYqU2Yls6B4B5k2aCMqqoyfj99FwUcGDPKnLnPmcRJVKsWUuqEOPg2pwLK8jfBlo2rodr4aoZWTjho',
  },
  {
    id: 'brownie-with-ice-cream',
    name: 'Brownie with Ice Cream',
    price: 350,
    category: 'Waffles',
    desc: 'Warm gooey dark chocolate brownie served alongside a scoop of pure vanilla cream.',
    image: '/images/chocolate-brownie-cup.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP7_7HTk4NQmBjPhCilMkT5_BSQdf7snayDrFJnhVlscbT-gI2Djks9beqO56nudkokw7PCZ9XzBEoAo8RLOAEaRUHym996yCLVyhA4jLVujwcmeOKTn_XLWXlKuI2Ta6PrQ1l4wWA_GCHViTbYJQkgczt_lnGx2D3_PmlXhR-J1m6uynLAazNIx2JBWqLg2-iU-MQEP2FchJG9r3H_X4U7SwRgoz3gmwkrZjI0P4',
  },

  // 3. COLD COFFEE
  {
    id: 'cold-coffee-ice-cream',
    name: 'Cold Coffee with Ice Cream',
    price: 360,
    category: 'Cold Coffee',
    desc: 'Chilled espresso concentrate poured over velvety hand-churned vanilla scoop.',
    image: '/images/cold-coffee-ice-cream.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLJNEL0WWRoAFKtzYWLyipAEqtbnFGhrhpsI69iFnZdAASQzm61z9DL-gK1-KA5pe5fDG_YMBSSRMf70P1LjnxxcAPiTDjiulya0qQdKPMIT1lxtoLFSRerG7wPSGa7h8vLeIovcScczLO4rwUTOYUgKfZVmgWuDZ7vJBWY76pMUz8ZdiKQ_CZGLEHkV5P9FLW-rgPSeZo5LyDWXyXFWaOCX2Uw6_L-uVeEfEAdsQ',
  },
  {
    id: 'cold-coffee-crunch',
    name: 'Cold Coffee with Crunch & Peanuts',
    price: 390,
    category: 'Cold Coffee',
    desc: 'Blended iced coffee topped with whipped cream, chocolate syrup, and toasted nut crunch.',
    image: '/images/cold-coffee-crunch.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRPZP33YTM2v70QB2wz26SyPRPO9zDRXxS5dWn8ALky7rpR6wltVvj5vuwjigIcM3PSunIi6smMSfTNxKPWJKNCu6O2llvuUjrhNXwQ2rRirzfmDbr7wR7oXpYteRXsuioH3k_Lfr10hq4BY9xcrLqKW8bp2u6i-lBAl8JfqmJ3dKMqfRSDxy4UyhH1fTd2KRZSrkzIT3pBzn4uIjQwudZd-F2BA9Ie4fOA2XmKrY',
  },
  {
    id: 'cold-coffee-sss-special',
    name: 'Cold Coffee SSS Special with Crunch & Peanuts',
    price: 400,
    category: 'Cold Coffee',
    desc: 'Ultimate cold coffee creation: double scoop float, thick caramel, and heavy crunch topping.',
    image: '/images/cold-coffee-crunch.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRPZP33YTM2v70QB2wz26SyPRPO9zDRXxS5dWn8ALky7rpR6wltVvj5vuwjigIcM3PSunIi6smMSfTNxKPWJKNCu6O2llvuUjrhNXwQ2rRirzfmDbr7wR7oXpYteRXsuioH3k_Lfr10hq4BY9xcrLqKW8bp2u6i-lBAl8JfqmJ3dKMqfRSDxy4UyhH1fTd2KRZSrkzIT3pBzn4uIjQwudZd-F2BA9Ie4fOA2XmKrY',
  },

  // 4. SHAKES
  {
    id: 'oreo-shake',
    name: 'Oreo Shake',
    price: 380,
    category: 'Shakes',
    desc: 'Thick hand-spun shake infused with real crunchy Oreos and whole farm milk.',
    image: '/images/oreo-shake.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXt0SuYbJ0CLNsMEKZAY5i9xEIp_8xKvWqX4Dw1RyXutGxB6XfqgIFzEl0M1Az3oroKyBxGuN2y-wgH1cJtJZ6r7MOiBgL-dPelPApmTwiQS339PvwXIOisZt0wP9_LVZXRNX8X-jybrxs8csESb7ZlUee-ZAuyrtbDUNW0F2TNaES3NfE1OwTPSe0AIRystUotQPSkGQwR1Eatuj3Njfn53iSFuDNBFq5oLOY4Po',
  },
  {
    id: 'vanilla-shake',
    name: 'Vanilla Shake',
    price: 350,
    category: 'Shakes',
    desc: 'Fragrant Madagascar vanilla bean infused creamy thickshake.',
    image: '/images/cold-coffee-ice-cream.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLJNEL0WWRoAFKtzYWLyipAEqtbnFGhrhpsI69iFnZdAASQzm61z9DL-gK1-KA5pe5fDG_YMBSSRMf70P1LjnxxcAPiTDjiulya0qQdKPMIT1lxtoLFSRerG7wPSGa7h8vLeIovcScczLO4rwUTOYUgKfZVmgWuDZ7vJBWY76pMUz8ZdiKQ_CZGLEHkV5P9FLW-rgPSeZo5LyDWXyXFWaOCX2Uw6_L-uVeEfEAdsQ',
  },
  {
    id: 'chocolate-shake',
    name: 'Chocolate Shake',
    price: 350,
    category: 'Shakes',
    desc: 'Indulgent Dutch chocolate milkshake blended with melted cocoa curls.',
    image: '/images/chocolate-shake.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7DszWrG6jLc43Uiildl68d11FP49v96mj65aR1u-s22-kgBg1Q7KyoIMF6qCxFgAo25QX8515UJZzJCHQGuANmIORWURt20idneBndhInFkDIIs8jd0G0TfDErQR4ANXwNBwR36kBCMA89dBiNUVyStyXM1O4yA2rwvz3KcMYwlxPoltqrpRH4eW4vrasoizNLPBjtlcmpt34U_cdc8jDNLQ_t84etqYI5bAfYYg',
  },

  // 5. SUNDAE CUPS
  {
    id: 'strawberry-cup',
    name: 'Strawberry Cup',
    price: 350,
    category: 'Sundaes',
    desc: 'Sun-ripened strawberry coulis layered over whipped cream and ice cream.',
    image: '/images/strawberry-cup.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlvpfeDkRl1arL0UlOBBW8hSUVoXzmUiK1q4kHw0mqAV54kOqYVQbpZ5b-F8uFkOLmmbbst-ZU5ut1XBb6Au3d1B0h_9cNWFyzClp_Bmb0U-a3KeLE-0tDhPIJsBy0BNuEpjqnJPLvHWO-T5zLxr0o9Kq1U8j1VFv3jzSWhciaIAY-q6BtBVb36keHFHIGIp0PzeWOL3M1bDsZs97qe3SL1dDln5EJFiGTiv8x__A',
  },
  {
    id: 'mango-cup',
    name: 'Mango Cup',
    price: 350,
    category: 'Sundaes',
    desc: 'Tropical sweet chaunsa mango puree swirled into rich clotted cream scoops.',
    image: '/images/caramel-cup.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoWvYn8FKkuisqWgoFs1W0BcUyIkfh_dWr4c09ImSuKNR3LjrU2BXlf5FuUlB3IKcYmaHiCd8czptNf-7dyf7CrWYyyKpISOmw-2TKG16-0DYxTnV4dRl9Un-Oe1TS7oBe3pSJtDhtdiU74Y8vRPSfB1z2FoU9UqccTTWtDWs4gsd1oN6OHpitWucolOtpa8i2GQZdBuwrQMNjYsM2ZwWpMKvnOyDB4l9Zw79f3mw',
  },
  {
    id: 'caramel-cup',
    name: 'Caramel Cup',
    price: 350,
    category: 'Sundaes',
    desc: 'Salted butter caramel drizzle layered with buttery crunch and vanilla cream.',
    image: '/images/caramel-cup.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoWvYn8FKkuisqWgoFs1W0BcUyIkfh_dWr4c09ImSuKNR3LjrU2BXlf5FuUlB3IKcYmaHiCd8czptNf-7dyf7CrWYyyKpISOmw-2TKG16-0DYxTnV4dRl9Un-Oe1TS7oBe3pSJtDhtdiU74Y8vRPSfB1z2FoU9UqccTTWtDWs4gsd1oN6OHpitWucolOtpa8i2GQZdBuwrQMNjYsM2ZwWpMKvnOyDB4l9Zw79f3mw',
  },
  {
    id: 'chocolate-cup',
    name: 'Chocolate Cup',
    price: 350,
    category: 'Sundaes',
    desc: 'Layers of hot cocoa fudge, chocolate sponge crumbs, and dark chocolate ice cream.',
    image: '/images/chocolate-brownie-cup.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP7_7HTk4NQmBjPhCilMkT5_BSQdf7snayDrFJnhVlscbT-gI2Djks9beqO56nudkokw7PCZ9XzBEoAo8RLOAEaRUHym996yCLVyhA4jLVujwcmeOKTn_XLWXlKuI2Ta6PrQ1l4wWA_GCHViTbYJQkgczt_lnGx2D3_PmlXhR-J1m6uynLAazNIx2JBWqLg2-iU-MQEP2FchJG9r3H_X4U7SwRgoz3gmwkrZjI0P4',
  },
  {
    id: 'blueberry-cup',
    name: 'Blueberry Cup',
    price: 350,
    category: 'Sundaes',
    desc: 'Wild blueberry compote folded into creamy churned dairy with shortbread crunch.',
    image: '/images/blueberry-cup.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDimgbouXV8tp5RJD8CwtmP2e3j4VGfACrwI0O0Hkq_cvUKwyBIWuKB54a8Iy7kh0w18CF1rzkLarw-bC01jnhM1tHsZtJau36MMjb6_yqL8hQUXLQ6RpmPgzWHcqm4plROcUKq-OChp0f_5dfSsqFo6v0rLzC22ch7cixRrfD-ZE7IUumr38jkdiNcMqhw_z_7DcqO3b7axYsRmGamj8Ibeg8liqbnlqRsFoT_59Q',
  },

  // 6. 14 SLUSH FLAVOURS
  {
    id: 'slush-14-flavours',
    name: 'Slush – 14 Flavours',
    price: 180,
    category: 'Slush',
    desc: 'Mango, Black Currant, Orange, Blueberry, Pineapple, Strawberry, Pomegranate, Tamarind, Peach, Lychee, Cherry & more.',
    image: '/images/strawberry-cup.jpg',
    publicUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlvpfeDkRl1arL0UlOBBW8hSUVoXzmUiK1q4kHw0mqAV54kOqYVQbpZ5b-F8uFkOLmmbbst-ZU5ut1XBb6Au3d1B0h_9cNWFyzClp_Bmb0U-a3KeLE-0tDhPIJsBy0BNuEpjqnJPLvHWO-T5zLxr0o9Kq1U8j1VFv3jzSWhciaIAY-q6BtBVb36keHFHIGIp0PzeWOL3M1bDsZs97qe3SL1dDln5EJFiGTiv8x__A',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-storefront',
    title: 'Boutique Evening Storefront',
    caption: 'SSS Evening Storefront & Outdoor Seating',
    image: '/images/storefront-hero.png',
    featured: true,
  },
  {
    id: 'gal-counters',
    title: 'Waffles & Slush Counter',
    caption: 'SSS Storefront Counters & Waffle Station',
    image: '/images/ice-cream-cup-medium.jpg',
  },
  {
    id: 'gal-cold-coffee',
    title: 'Cold Coffee Floats',
    caption: 'Handcrafted Cold Coffee Special',
    image: '/images/cold-coffee-ice-cream.jpg',
  },
  {
    id: 'gal-brownie',
    title: 'Fudge Brownie Sundae',
    caption: 'Sizzling Warm Brownie with Ice Cream',
    image: '/images/chocolate-brownie-cup.jpg',
  },
  {
    id: 'gal-waffle-cones',
    title: 'Crisp Waffle Cones',
    caption: 'Freshly Baked Belgian Waffle Cones',
    image: '/images/waffle-cone.jpg',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    initial: 'H',
    name: 'Hamza Tariq',
    role: 'Regular Customer',
    quote:
      'The SSS Special cup with peanut crunch is easily the best ice cream in town. Very creamy and generous portions!',
  },
  {
    id: 'test-2',
    initial: 'S',
    name: 'Sana Sheikh',
    role: 'Verified Order',
    quote:
      'Their Tamarind and Black Currant slush flavours are pure heaven in the evening heat. Fast WhatsApp order response too!',
  },
  {
    id: 'test-3',
    initial: 'A',
    name: 'Ali Raza',
    role: 'Foodie',
    quote:
      'Warm freshly baked waffle cones with chocolate dip and peanuts. You can smell the bakery aroma as soon as you walk up!',
  },
];
