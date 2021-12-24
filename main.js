let app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    description: 'The product above is cheapy',
    image: './assets/vmSocks-green.jpg',
    inStock: true,
    details: ['80% cotton', '20% polyester', 'Gender-neutral'],
    variants: [
      {
        variantId: 2234,
        variantColor: 'green'
      },
      {
        variantId: 2235,
        variantColor: 'blue'
      }
    ],
    sizes: ['P', 'M', 'G']
  }
})