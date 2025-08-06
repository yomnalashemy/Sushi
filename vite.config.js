import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        cart: 'public/cart.html',
        checkout: 'public/checkout.html',
        'learn-more': 'public/learn-more.html',
        menu: 'public/menu.html',
        success: 'public/success.html'
      }
    }
  },
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
  },
  base: './'
}) 