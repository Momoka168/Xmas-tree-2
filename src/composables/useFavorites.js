import { useStore } from 'vuex'
import { computed } from 'vue'

export function useFavorites() {
  const store = useStore()
  
  const favorites = computed(() => store.state.favorites)
  const favoriteProducts = computed(() => store.getters.favoriteProducts)

  const favoritesCount = computed(() => {
    return store.state.favorites.length
  })

  const isInFavorites = (productId) => {
    return store.state.favorites.some(f => f.productId === productId)
  }

  const toggleFavorite = (productId, size, silent = false) => {
    store.dispatch('toggleFavoriteWithSize', {
      productId: productId,
      size: size || 'Moyen',
      silent: silent
    })

    if (!silent) {
      showMessage(isInFavorites(productId))
    }
  }

  const showMessage = (isAdding) => {
    const oldMessage = document.querySelector('.toast-message')
    if (oldMessage) {
      oldMessage.remove()
    }

    if (!document.getElementById('toast-styles')) {
      const styles = document.createElement('style')
      styles.id = 'toast-styles'
      styles.textContent = `
        .toast-message {
          position: fixed;
          top: 20px;
          right: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          padding: 16px 24px;
          transform: translateY(-100%);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 300px;
        }
        
        .toast-message.show {
          transform: translateY(0);
          opacity: 1;
        }
        
        .toast-icon {
          font-size: 20px;
          color: #c41e3a;
        }
        
        .toast-content {
          flex: 1;
        }
        
        .toast-title {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }
        
        .toast-text {
          margin: 4px 0 0 0;
          font-size: 14px;
          color: #666;
        }
      `
      document.head.appendChild(styles)
    }

    const messageElement = document.createElement('div')
    messageElement.classList.add('toast-message')
    
    const icon = isAdding ? 'fa-heart' : 'fa-heart-broken'
    const title = isAdding ? 'Ajouté aux favoris' : 'Retiré des favoris'
    const text = isAdding 
      ? 'L\'article a été ajouté à votre liste de favoris'
      : 'L\'article a été retiré de votre liste de favoris'

    messageElement.innerHTML = `
      <i class="fas ${icon} toast-icon"></i>
      <div class="toast-content">
        <h4 class="toast-title">${title}</h4>
        <p class="toast-text">${text}</p>
      </div>
    `

    document.body.appendChild(messageElement)

    requestAnimationFrame(() => {
      messageElement.classList.add('show')
    })

    setTimeout(() => {
      messageElement.classList.remove('show')
      setTimeout(() => {
        if (document.body.contains(messageElement)) {
          document.body.removeChild(messageElement)
        }
      }, 400)
    }, 2000)
  }

  return {
    favorites: favoriteProducts,
    favoritesCount,
    isInFavorites,
    toggleFavorite
  }
}