import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    products: [
      {
        id: 1,
        name: 'Sapin de Noël Arkansas Classic',
        description: 'Sapin artificiel premium avec branches ultra-réalistes',
        prices: {
          'Petit': 251.10,
          'Moyen': 351.10,
          'Grand': 451.10
        },
        sizes: {
          'Petit': '100-150cm',
          'Moyen': '150-200cm',
          'Grand': '200-250cm'
        },
        image: '/src/assets/images/Sapins/Sapin1LOLA.jpg',
        discount: '-10%',
        inStock: true,
        category: 'Premium'
      },
      {
        id: 2,
        name: 'Sapin Roxy Deluxe',
        description: 'Sapin artificiel haut de gamme au feuillage dense',
        prices: {
          'Petit': 299.90,
          'Moyen': 399.90,
          'Grand': 499.90
        },
        sizes: {
          'Petit': '100-150cm',
          'Moyen': '150-200cm',
          'Grand': '200-250cm'
        },
        image: '/src/assets/images/Sapins/Sapin2RUDOLPHE.jpg',
        inStock: true,
        category: 'Premium'
      },
      {
        id: 3,
        name: 'Sapin Gabi Nordic',
        description: 'Sapin nordique au style épuré et élégant',
        prices: {
          'Petit': 278.10,
          'Moyen': 378.10,
          'Grand': 494.10
        },
        sizes: {
          'Petit': '100-150cm',
          'Moyen': '150-200cm',
          'Grand': '200-250cm'
        },
        image: '/src/assets/images/Sapins/Sapin3GABI.jpg',
        inStock: true,
        category: 'Nordic'
      },
      {
        id: 4,
        name: 'Sapin Classique Vert',
        description: 'Sapin traditionnel au vert profond',
        prices: {
          'Petit': 199.90,
          'Moyen': 299.90,
          'Grand': 399.90
        },
        sizes: {
          'Petit': '100-150cm',
          'Moyen': '150-200cm',
          'Grand': '200-250cm'
        },
        image: '/src/assets/images/Sapins/Sapin4.jpg',
        inStock: true,
        category: 'Classique'
      },
      {
        id: 5,
        name: 'Sapin Lutin Enneigé',
        description: 'Sapin enneigé pour une ambiance féerique',
        prices: {
          'Petit': 259.90,
          'Moyen': 359.90,
          'Grand': 459.90
        },
        sizes: {
          'Petit': '100-150cm',
          'Moyen': '150-200cm',
          'Grand': '200-250cm'
        },
        image: '/src/assets/images/Sapins/Sapin4LUTIN.jpg',
        inStock: true,
        category: 'Enneigé'
      },
      {
        id: 6,
        name: 'Sapin Royal Gold',
        description: 'Sapin luxueux aux finitions dorées',
        prices: {
          'Petit': 329.90,
          'Moyen': 429.90,
          'Grand': 529.90
        },
        sizes: {
          'Petit': '100-150cm',
          'Moyen': '150-200cm',
          'Grand': '200-250cm'
        },
        image: '/src/assets/images/Sapins/Sapin6.jpg',
        inStock: true,
        category: 'Premium'
      },
      {
        id: 7,
        name: 'Sapin Naturel Plus',
        description: 'Sapin au rendu ultra naturel',
        prices: {
          'Petit': 289.90,
          'Moyen': 389.90,
          'Grand': 489.90
        },
        sizes: {
          'Petit': '100-150cm',
          'Moyen': '150-200cm',
          'Grand': '200-250cm'
        },
        image: '/src/assets/images/Sapins/Sapin7.jpg',
        inStock: true,
        category: 'Naturel'
      },
      {
        id: 8,
        name: 'Sapin Scandinave White',
        description: 'Sapin blanc au style scandinave épuré',
        prices: {
          'Petit': 309.90,
          'Moyen': 409.90,
          'Grand': 509.90
        },
        sizes: {
          'Petit': '100-150cm',
          'Moyen': '150-200cm',
          'Grand': '200-250cm'
        },
        image: '/src/assets/images/Sapins/Sapin8.jpg',
        inStock: true,
        category: 'Nordic'
      },
      {
        id: 9,
        name: 'Sapin Glacé Premium',
        description: 'Sapin givré aux finitions glacées',
        prices: {
          'Petit': 339.90,
          'Moyen': 439.90,
          'Grand': 539.90
        },
        sizes: {
          'Petit': '100-150cm',
          'Moyen': '150-200cm',
          'Grand': '200-250cm'
        },
        image: '/src/assets/images/Sapins/Sapin9.webp',
        inStock: true,
        category: 'Premium'
      },
      {
        id: 10,
        name: 'Sapin Majestic Deluxe',
        description: 'Sapin majestueux au feuillage luxuriant',
        prices: {
          'Petit': 379.90,
          'Moyen': 479.90,
          'Grand': 579.90
        },
        sizes: {
          'Petit': '100-150cm',
          'Moyen': '150-200cm',
          'Grand': '200-250cm'
        },
        image: '/src/assets/images/Sapins/Sapin10.jpg',
        inStock: true,
        category: 'Premium'
      }
    ],
    filters: {
      price: null,
      size: null,
      category: null,
      sort: null
    }
  },

  getters: {
    cartTotal: (state) => {
      return parseFloat(state.cart.reduce((total, item) => {
        return total + (item.prices[item.selectedSize] * item.quantity)
      }, 0)).toFixed(2)
    },

    cartCount: (state) => {
      return state.cart.reduce((count, item) => count + item.quantity, 0)
    },

    cartItems: (state) => {
      return state.cart.map(item => ({
        ...item,
        subtotal: (parseFloat(item.prices[item.selectedSize] * item.quantity)).toFixed(2),
        formattedPrice: parseFloat(item.prices[item.selectedSize]).toFixed(2)
      }))
    },

    favorites: (state) => {
      return state.favorites
    },

    favoriteProducts: (state) => {
      return state.favorites.map(favorite => {
        const product = state.products.find(p => p.id === favorite.productId)
        if (!product) return null
        
        return {
          ...product,
          id: favorite.productId,
          selectedSize: favorite.size,
          displayName: `${product.name} - ${product.sizes[favorite.size]}`,
          currentPrice: parseFloat(product.prices[favorite.size]).toFixed(2)
        }
      }).filter(Boolean)
    },

    filteredProducts: (state) => {
      let result = [...state.products]

      if (state.filters.category) {
        result = result.filter(product => 
          product.category === state.filters.category
        )
      }

      if (state.filters.price) {
        result = result.filter(product => {
          const avgPrice = Object.values(product.prices)
            .reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / 3
          return avgPrice <= parseFloat(state.filters.price)
        })
      }

      if (state.filters.sort) {
        result.sort((a, b) => {
          const avgPriceA = Object.values(a.prices)
            .reduce((x, y) => parseFloat(x) + parseFloat(y), 0) / 3
          const avgPriceB = Object.values(b.prices)
            .reduce((x, y) => parseFloat(x) + parseFloat(y), 0) / 3
          return state.filters.sort === 'asc' ? avgPriceA - avgPriceB : avgPriceB - avgPriceA
        })
      }

      return result
    }
  },

  mutations: {
    ADD_TO_CART(state, { product, selectedSize, quantity }) {
      const existingItem = state.cart.find(item => 
        item.id === product.id && item.selectedSize === selectedSize
      )

      if (existingItem) {
        existingItem.quantity = parseInt(existingItem.quantity) + parseInt(quantity)
      } else {
        state.cart.push({
          ...product,
          selectedSize,
          quantity: parseInt(quantity),
          priceAtPurchase: parseFloat(product.prices[selectedSize])
        })
      }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    REMOVE_FROM_CART(state, { id, selectedSize }) {
      state.cart = state.cart.filter(item => 
        !(item.id === id && item.selectedSize === selectedSize)
      )
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    UPDATE_CART_QUANTITY(state, { id, selectedSize, quantity }) {
      const item = state.cart.find(item => 
        item.id === id && item.selectedSize === selectedSize
      )
      if (item) {
        const newQuantity = parseInt(quantity)
        if (newQuantity > 0) {
          item.quantity = newQuantity
        } else {
          state.cart = state.cart.filter(cartItem => 
            !(cartItem.id === id && cartItem.selectedSize === selectedSize)
          )
        }
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    },

    TOGGLE_FAVORITE_WITH_SIZE(state, favorite) {
      const existingIndex = state.favorites.findIndex(
        f => f.productId === favorite.productId
      )

      if (existingIndex === -1) {
        state.favorites.push(favorite)
      } else {
        state.favorites.splice(existingIndex, 1)
      }

      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },

    UPDATE_FILTERS(state, filters) {
      state.filters = { ...state.filters, ...filters }
    },

    CLEAR_CART(state) {
      state.cart = []
      localStorage.removeItem('cart')
    }
  },

  actions: {
    addToCart({ commit }, payload) {
      commit('ADD_TO_CART', payload)
    },

    removeFromCart({ commit }, payload) {
      commit('REMOVE_FROM_CART', payload)
    },

    updateCartQuantity({ commit }, payload) {
      commit('UPDATE_CART_QUANTITY', payload)
    },

    toggleFavoriteWithSize({ commit }, favorite) {
      commit('TOGGLE_FAVORITE_WITH_SIZE', favorite)
    },

    updateFilters({ commit }, filters) {
      commit('UPDATE_FILTERS', filters)
    },

    clearCart({ commit }) {
      commit('CLEAR_CART')
    }
  }
})