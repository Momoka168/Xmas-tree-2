<template>
  <div class="hero-banner">
    <div class="slides-container">
      <div v-for="(slide, index) in slides"
          :key="slide.id"
          class="slide"
          :class="{ active: index === currentSlide }"
          :style="{ backgroundImage: `url(${slide.image})` }"
      ></div>
    </div>

    <!-- Points de navigation -->
    <div class="dots">
      <span v-for="(slide, index) in slides"
            :key="slide.id"
            class="dot"
            :class="{ active: index === currentSlide }">
      </span>
    </div>

    <div class="content">
      <h1>Ho ho ho</h1>
      <p>Retrouvez toute la magie de Noël sur notre site web !</p>
      <router-link to="/catalog" class="cta-button">
        DÉCOUVRIR
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const slides = ref([
  { id: 1, image: '/src/assets/images/home/Home1.webp' },
  { id: 2, image: '/src/assets/images/home/Home2.webp' },
  { id: 3, image: '/src/assets/images/home/Home3.jpg' },
  { id: 4, image: '/src/assets/images/home/Home4.webp' },
  { id: 5, image: '/src/assets/images/home/Home5.webp' },
  { id: 6, image: '/src/assets/images/home/Home7.webp' },
  { id: 7, image: '/src/assets/images/home/Home8.webp' },
  { id: 8, image: '/src/assets/images/home/Home9.webp' },
  { id: 9, image: '/src/assets/images/home/Home10.webp' }
])

const currentSlide = ref(0)
let intervalId = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

onMounted(() => {
  intervalId = setInterval(nextSlide, 5000)
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
.hero-banner {
  height: 600px;
  position: relative;
  overflow: hidden;
}

.slides-container {
  height: 100%;
  width: 100%;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.slide::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.slide.active {
  opacity: 1;
}

/* Points de navigation */
.dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 2;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.dot.active {
  background: #c41e3a;
  transform: scale(1.2);
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  color: white;
  z-index: 2;
}

h1 {
  font-family: 'Font2', sans-serif;
  color: white;
  font-size: 5rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}
h1:hover {
  color: #c41e3a;
}

p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  background: #c41e3a;
  color: white;
  border: 2px solid #0B3B24 ;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;

}

.cta-button:hover {
  background:#0B3B24;
  color: white;
  border: 2px solid #c41e3a; 
}

@media (max-width: 768px) {
  h1 {
    font-size: 3rem;
  }
  
  p {
    font-size: 1.2rem;
  }
  
  .cta-button {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 2rem;
  }
  
  p {
    font-size: 1rem;
  }
}
</style>