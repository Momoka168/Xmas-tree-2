<template>
  <header class="header">
    <div class="header-content">
      <!-- Logo -->
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/images/logo/Logo1.jpg" alt="HOHOHO Xmastore" />
        </router-link>
      </div>

      <!-- Navigation Links -->
      <nav class="navbar">
        <ul class="nav-links">
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/catalog">Sapins</router-link></li>
          <li>
            <router-link to="/favorites" class="favorites-link">
              <i class="far fa-heart"></i>
              <span v-if="favoritesCount > 0" class="favorites-count">{{ favoritesCount }}</span>
              Favoris
            </router-link>
          </li>
          <li>
            <a href="#" @click.prevent="openCart" class="cart-link">
              <i class="fas fa-shopping-cart"></i>
              <span v-if="cartItemsCount > 0" class="cart-count">{{ cartItemsCount }}</span>
              Panier
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { computed } from 'vue';
import { useFavorites } from '@/composables/useFavorites';
import { useCart } from '@/composables/useCart';

export default {
  name: 'TheNavbar',
  emits: ['open-cart'],
  setup(props, { emit }) {
    const { favorites } = useFavorites();
    const { cart } = useCart();

    const openCart = () => {
      emit('open-cart');
    };

    const favoritesCount = computed(() => favorites.value.length);
    const cartItemsCount = computed(() => {
      return cart.value.reduce((total, item) => total + item.quantity, 0);
    });

    return {
      openCart,
      favoritesCount,
      cartItemsCount,
    };
  },
};
</script>

<style scoped>
.header {
  background-color: #f1f1f1;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.logo img {
  height: 100px;
  width: auto;
}

.navbar {
  display: flex;
  align-items: center;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  gap: 20px;
}

.nav-links a {
  text-decoration: none;
  color: #0B3B24;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
}

.favorites-link, .cart-link {
  display: flex;
  align-items: center;
  gap: 4px;
}

.favorites-count, .cart-count {
  font-size: 0.8rem;
  color: #c41e3a;
  font-weight: 600;
  margin-left: 2px;
}

.favorites-link i, .cart-link i {
  font-size: 1.1rem;
  transition: transform 0.2s ease;
}

.nav-links a:hover {
  color: #c41e3a;
}

.favorites-link:hover i, .cart-link:hover i {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    padding: 1rem;
  }

  .nav-links {
    gap: 15px;
  }

  .favorites-link i, .cart-link i {
    font-size: 1rem;
  }

  .favorites-count, .cart-count {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .nav-links {
    gap: 10px;
  }

  .nav-links a {
    font-size: 0.9rem;
  }

  .logo img {
    height: 80px;
  }
}
</style>