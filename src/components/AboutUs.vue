<template>
  <section class="about">
    <div class="about-container">
      <h2>À Propos</h2>
      <p class="subtitle">DÉCOUVREZ NOS SAPINS DE NOËL ARTIFICIELS</p>
      
      <div class="about-content">
        <div class="about-image">
          <img src="@/assets/images/home/Home8.webp" alt="Sapin de Noël Xmastore">
        </div>
        
        <div class="about-text">
          <div class="text-section">
            <h3>Notre Histoire</h3>
            <p>
              HO HO HO Xmastore est votre spécialiste des sapins de Noël artificiels.
              Nous nous engageons à transformer votre intérieur en véritable conte de Noël
              avec nos sapins soigneusement sélectionnés.
            </p>
          </div>
 
          <div class="text-section">
            <h3>Notre Engagement</h3>
            <p>
              Nous sélectionnons méticuleusement chaque sapin pour vous offrir :
            </p>
            <ul>
              <li>Des sapins artificiels ultra-réalistes</li>
              <li>Une qualité premium garantie</li>
              <li>Des modèles variés et élégants</li>
              <li>Un service client dévoué</li>
            </ul>
          </div>
 
          <div class="text-section">
            <h3>Notre Vision</h3>
            <p>
              Notre mission est de rendre la magie de Noël accessible à tous en proposant
              une sélection exclusive de sapins artificiels qui traverseront les années.
              Chaque sapin est choisi pour sa qualité exceptionnelle et son authenticité.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
 </template>
 
 <script setup>
 const aboutContent = {
  title: "Notre Histoire",
  subtitle: "La magie de Noël depuis 2020",
  description: `HO HO HO Xmastore est né d'une passion pour la magie de Noël et l'envie de la partager.
   Notre boutique en ligne spécialisée propose une sélection soignée de décorations de Noël, mettant l'accent
   sur trois catégories essentielles : des sapins artificiels de haute qualité, des ornements uniques et des
   illuminations féeriques.`,
  vision: `Notre vision est de rendre chaque Noël mémorable en offrant des produits de qualité qui créent
   une atmosphère magique dans chaque foyer. Nous sélectionnons méticuleusement chaque article pour garantir
   la meilleure expérience à nos clients.`,
  engagement: `Nous nous engageons à :
  • Proposer des produits durables et respectueux de l'environnement
  • Offrir un service client exceptionnel
  • Assurer une livraison rapide et soignée
  • Garantir la satisfaction de nos clients`
 }
 </script>
 
 <style scoped>
 .about {
  width: 100%;
  background-color: #f1f1f1;
  padding: 4rem 0;
  position: relative;
 }
 
 .about-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
 }
 
 h2 {
  font-family: 'Font2', sans-serif;
  text-align: center;
  font-size: 4rem;
  margin-bottom: 2rem;
  color: #0B3B24;
 }
 
 .subtitle {
  text-align: center;
  color: #c41e3a;
  margin-bottom: 3rem;
 }
 
 .about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
 }
 
 .about-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
 }
 
 .text-section {
  margin-bottom: 2rem;
 }
 
 h3 {
  font-family: 'Font2', sans-serif;
  color: #c41e3a;
  font-size: 1.8rem;
  margin-bottom: 1rem;
 }
 
 p {
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #333;
 }
 
 ul {
  list-style: none;
  padding: 0;
 }
 
 li {
  padding-left: 1.5rem;
  position: relative;
  margin-bottom: 0.5rem;
  line-height: 1.6;
 }
 
 li::before {
  content: "★";
  color: #c41e3a;
  position: absolute;
  left: 0;
 }
 
 @media (max-width: 1200px) {
  h2 {
    font-size: 3.5rem;
  }
 }
 
 @media (max-width: 992px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  h2 {
    font-size: 3rem;
  }
  
  h3 {
    font-size: 1.5rem;
  }
 }
 
 @media (max-width: 768px) {
  .about-container {
    padding: 0 1rem;
  }
  
  h2 {
    font-size: 2.5rem;
  }
 
  .about {
    padding: 2rem 0;
  }
 }
 
 @media (max-width: 576px) {
  h2 {
    font-size: 2rem;
  }
  
  .about-content {
    gap: 1.5rem;
  }
 }
 </style>