// Packaged food products discount coupons and special promotional offers
export const coupons = [
  {
    code: 'PICKLE10',
    discountPercent: 10,
    title: '10% OFF on Pickles',
    description: 'Enjoy 10% off on all jars of authentic sun-cured homemade pickles.',
    minOrder: 299,
    badge: 'Pickle Special',
    expiresInDays: 30
  },
  {
    code: 'SNACK15',
    discountPercent: 15,
    title: '15% OFF on Karam Snacks',
    description: 'Get flat 15% off on crisp Murukku, Ribbon Pakoda, Kara Sev, and Thattai.',
    minOrder: 399,
    badge: 'Snack Fest',
    expiresInDays: 14
  },
  {
    code: 'SPICE20',
    discountPercent: 20,
    title: '20% OFF on Spice Powder Combo',
    description: 'Stock up your home kitchen with pure stone-ground spice and masala powders.',
    minOrder: 499,
    badge: 'Spice Saver',
    expiresInDays: 20
  },
  {
    code: 'SWEETBOX15',
    discountPercent: 15,
    title: '15% OFF on Festival Sweet Boxes',
    description: 'Celebrate special occasions with pure desi ghee Mysore Pak, Laddus, and Kaju Katli.',
    minOrder: 599,
    badge: 'Sweet Offer',
    expiresInDays: 15
  },
  {
    code: 'COMBO25',
    discountPercent: 25,
    title: 'Flat 25% OFF on Family Snack Combos',
    description: 'Wholesome savings on family-size value boxes of snacks, pickles, and sweets.',
    minOrder: 799,
    badge: 'Combo Deal',
    expiresInDays: 7
  }
];

export const specialPromos = [
  {
    id: 'promo-1',
    title: 'Artisanal Spice & Pickle Festival',
    tagline: 'Buy Any 2 Pickle Jars & Get 15% OFF on Spice Powders',
    discountText: 'FLAT 15% OFF',
    code: 'SPICE20',
    expiryHours: 36,
    bgGradient: 'from-emerald-900 via-green-800 to-emerald-950',
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80',
    link: '/pickles'
  },
  {
    id: 'promo-2',
    title: 'Traditional Karam Snacks Weekend',
    tagline: 'Freshly Packaged Murukku, Thattai & Coconut Oil Banana Chips',
    discountText: 'UP TO 20% OFF',
    code: 'SNACK15',
    expiryHours: 48,
    bgGradient: 'from-amber-800 via-orange-700 to-amber-900',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
    link: '/karam-snacks'
  }
];
