<template>
  <section class="inspiration">
    <h2>Idées Déco</h2>
    <p class="subtitle">INSPIREZ-VOUS DE NOS PLUS BELLES DÉCORATIONS DE SAPINS</p>
    <div class="inspiration-grid">
      <div v-for="(image, index) in inspirationImages" :key="index" class="inspiration-card">
        <img :src="image.src" :alt="image.alt">
        <div class="inspiration-overlay">
          <p class="inspiration-text">{{ image.description }}</p>
        </div>
      </div>
    </div>
  </section>
 </template>
 
 <script setup>
 const inspirationImages = [
  {
    src: '/images/idea/idea1.webp',
    alt: 'Sapin traditionnel avec casse-noisettes',
    description: 'Traditionnel & Casse-noisettes'
  },
  {
    src: '/images/idea/idea2.webp',
    alt: 'Sapin élégant blanc et or',
    description: 'Élégance Monochrome'
  },
  {
    src: '/images/idea/idea3.webp',
    alt: 'Sapin pastel avec ornements blancs',
    description: 'Douceur Givrée'
  },
  {
    src: '/images/idea/idea5.webp',
    alt: 'Sapin scandinave minimaliste',
    description: 'Charme Scandinave'
  }
 ]
 </script>
 
 <style scoped>
 .inspiration {
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
 }
 
 h2 {
  font-family: 'Font2', sans-serif;
  text-align: center;
  font-size: 4rem;
  margin-bottom: 0.5rem;
  color: #0B3B24;
 }
 
 .subtitle {
  text-align: center;
  color: #c41e3a;
  margin-bottom: 3rem;
 }
 
 .inspiration-grid {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem 0;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  margin: 0 -1rem;
  padding: 1rem;
  align-items: center; 
  justify-content: center;
 }
 
 .inspiration-card {
  flex: 0 0 auto;
  width: 300px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 1;
  scroll-snap-align: start;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  display: flex; 
  justify-content: center; 
  align-items: center;
 }
 
 .inspiration-grid::-webkit-scrollbar {
  display: none;
 }
 
 .inspiration-grid {
  -ms-overflow-style: none;
  scrollbar-width: none;
 }
 
 .inspiration-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  display: block;
  margin: auto; 
 }
 
 .inspiration-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
 }
 
 .inspiration-card:hover {
  transform: translateY(-5px);
 }
 
 .inspiration-card:hover img {
  transform: scale(1.05);
 }
 
 .inspiration-card:hover .inspiration-overlay {
  transform: translateY(0);
 }
 
 .inspiration-text {
  text-align: center;
  font-size: 1.2rem;
  margin: 0;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
 }
 
 @media (max-width: 992px) {
  h2 {
    font-size: 3rem;
  }
 
  .inspiration-card {
    width: 250px;
  }
 }
 
 @media (max-width: 768px) {
  .inspiration {
    padding: 2rem 1rem;
  }
 
  h2 {
    font-size: 2.5rem;
  }
 
  .inspiration-card {
    width: 220px;
  }
 }
 
 @media (max-width: 576px) {
  h2 {
    font-size: 2rem;
  }
 
  .inspiration-card {
    width: 200px;
  }
 
  .inspiration-text {
    font-size: 1rem;
  }
 }
 </style>