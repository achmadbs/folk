const ACCORDION_DATA = [
  {
    name: 'Origin',
    data: [
      { name: 'Aceh', value: 8 },
      { name: 'Semarang', value: 2 },
      { name: 'Bandung', value: 7 },
      { name: 'Jawa', value: 5 },
      { name: 'Amerika Latin', value: 6 },
      { name: 'Lain - Lain', value: 8 },
    ],
  },
  {
    name: 'Species',
    data: [
      { name: 'Arabika', value: 128 },
      { name: 'Robusta', value: 23 },
      { name: 'Blend', value: 9 },
    ],
  },
  {
    name: 'Roast Level',
    data: [
      { name: 'Light Roast', value: 8 },
      { name: 'Medium Roast', value: 2 },
      { name: 'Dark Roast', value: 7 },
      { name: 'Ligh to Medium Roast', value: 5 },
    ],
  },
  {
    name: 'Tasted',
    data: [
      { name: 'Sweet', value: 18 },
      { name: 'Floral', value: 21 },
      { name: 'Fruity', value: 17 },
      { name: 'Nutty', value: 5 },
      { name: 'Cocoa', value: 21 },
      { name: 'Spices', value: 18 },
    ],
  },
  {
    name: 'Processing',
    data: [
      { name: 'Honey White', value: 8 },
      { name: 'Natural', value: 2 },
      { name: 'Honey Gold', value: 7 },
      { name: 'Honey Yellow', value: 5 },
    ],
  },
];

const PAGE_SIZE_OPTIONS = ['12', '24', '36'];

const SORT_OPTIONS = [
  { label: 'Nama Produk', value: 'product_name' },
  { label: 'Harga Produk', value: 'price' },
  { label: 'Tanggal Dibuat', value: 'date' },
];

export { ACCORDION_DATA, PAGE_SIZE_OPTIONS, SORT_OPTIONS };
