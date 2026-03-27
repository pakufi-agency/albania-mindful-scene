<template>
  <section class="relative flex items-center justify-center text-white overflow-hidden hero-bg">
    <!-- Gradient overlay -->
    <div class="absolute inset-0 hero-gradient"></div>
    
    <!-- Background pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0 bg-black"></div>
      <div class="absolute inset-0" :style="{ backgroundImage: `url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;4&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')` }"></div>
    </div>
    
    <div class="relative container text-center">
      <h1 class="title-hero animate-fade-in">
        Find Your Center<br>
        <span style="color: var(--color-secondary)">in the Heart of Albania</span>
      </h1>
      
      <p class="text-body mb-6 max-w-2xl mx-auto opacity-90 animate-fade-in-delay subtitle">
        Discover a curated collection of meditation sessions, yoga retreats, medicine music and mindfulness workshops across Albania built by Albanian community.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
        <a href="#events" class="btn-primary">
          Explore Events
        </a>
        <!-- <button class="btn-primary-inverted">
          Learn More
        </button> -->
      </div>
    </div>
    
    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero'
}
</script>

<style scoped>
@import './Hero.css';
</style>

