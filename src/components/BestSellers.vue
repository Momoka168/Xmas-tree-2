<template>
  <section class="bestsellers">
    <h2>Coups de coeur</h2>
    <p class="subtitle">HO HO HO XMASTORE : BOUTIQUE EN LIGNE DE SAPINS DE NOËL</p>
    
    <div class="products-grid">
      <div v-for="product in bestsellers" 
           :key="product.id" 
           class="product-card">
        <div class="product-image">
          <img :src="product.image" :alt="product.name">
        </div>
        <div class="product-info">
          <div class="product-info-content">
            <h4>{{ product.name }}</h4>
            <p class="price">
              {{ product.prices.small }}€ - {{ product.prices.large }}€
            </p>
          </div>
          <button class="add-to-cart" @click="goToProductDetails(product.id)">
            CHOIX DE LA TAILLE
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const bestsellers = ref([
  {
    id: 1,
    name: 'Sapin de Noël Italien',
    prices: {
      small: 251.10,
      medium: 351.10,
      large: 451.10
    },
    image: '/src/assets/images/Sapins/Sapin4.jpg',
    description: 'Sapin artificiel premium avec branches ultra-réalistes'
  },
  {
    id: 2, 
    name: 'Sapin de Noël Espagnol',
    prices: {
      small: 299.90,
      medium: 399.90,
      large: 499.90
    },
    image: '/src/assets/images/Sapins/Sapin8.jpg',
    description: 'Sapin haut de gamme au feuillage dense'
  },
  {
    id: 3,
    name: 'Sapin de Noël Hongrois', 
    prices: {
      small: 278.10,
      medium: 378.10,
      large: 478.10
    },
    image: '/src/assets/images/Sapins/Sapin12.jpg',
    description: 'Sapin élégant au style traditionnel'
  },
  {
    id: 4,
    name: 'Sapin de Noël Viennois',
    prices: {
      small: 278.10,
      medium: 378.10,
      large: 494.10  
    },
    image: '/src/assets/images/Sapins/Sapin3GABI.jpg',
    description: 'Sapin majestueux au design épuré'
  }
])

const goToProductDetails = (productId) => {
  router.push(`/product/${productId}`)
}
</script>

<style scoped>
.bestsellers {
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

h2 {
  font-family: 'Font2', sans-serif;
  font-size: 4rem;
  color: #0B3B24;
  text-align: center;
  margin-bottom: 0.5rem;
}

.subtitle {
  text-align: center;
  color: #c41e3a;
  margin-bottom: 3rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.product-card {
  background: #0B3B24;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.product-image {
  position: relative;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #fff;
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  background: white;
}

.product-info-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product-info h4 {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  color: #333;
}

.price {
  font-weight: bold;
  font-size: 1.1rem;
  color: #000000;
  margin: 0.5rem 0 1rem;
}

.add-to-cart {
  width: 100%;
  padding: 0.8rem;
  background: #0B3B24;
  color: white;
  border: 2px solid #c41e3a;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.9rem;
}

.add-to-cart:hover {
  background: #c41e3a;
  color: white;
  border: 2px solid #0B3B24;
}

@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  h2 {
    font-size: 3.5rem;
  }
}

@media (max-width: 992px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .product-image {
    height: 220px;
  }

  h2 {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .bestsellers {
    padding: 2rem 1rem;
  }
  
  h2 {
    font-size: 2.5rem;
  }

  .product-image {
    height: 200px;
  }

  .add-to-cart {
    padding: 0.6rem;
    font-size: 0.9rem;
  }

  .product-info {
    padding: 1rem;
  }
}

@media (max-width: 576px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  h2 {
    font-size: 2rem;
  }

  .product-card {
    max-width: 350px;
    margin: 0 auto;
  }
}
</style>