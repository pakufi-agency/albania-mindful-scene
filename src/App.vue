<template>
  <div id="app" class="min-h-screen" style="background-color: var(--color-background)">
    <Header />
    <Hero />
    <EventGrid />
    <Newsletter />
    <Contact />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import EventGrid from './components/EventGrid.vue'
import Newsletter from './components/Newsletter.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Hero,
    EventGrid,
    Newsletter,
    Contact,
    Footer
  }
}
</script>
