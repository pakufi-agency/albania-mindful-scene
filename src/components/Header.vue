<template>
  <header class="header" :class="{ 'scrolled': isScrolled }">
    <div class="header-container container">
      <div class="logo-container">
        <img 
          src="../assets/Albania_Minful_Scene_logo.jpg" 
          alt="Albania Mindful Scene Logo"
          class="logo-image"
        />
        <div class="logo-text">Albania Mindful Scene</div>
      </div>
      
      <nav class="nav-menu">
        <a href="#events" class="nav-link">Events</a>
        <a href="#about" class="nav-link">About</a>
        <a href="#newsletter" class="nav-link">Newsletter</a>
        <a href="#contact" class="nav-link">Contact</a>
      </nav>
      
      <button class="mobile-menu-button">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isScrolled: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    }
  }
}
</script>

<style scoped>
@import './Header.css';
</style>
