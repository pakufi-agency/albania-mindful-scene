<template>
  <section id="events" class="section">
    <div class="container">
      <div class="text-center mb-16">
        <h2 class="title-section">
          Upcoming Events
        </h2>
        <p class="text-body max-w-2xl mx-auto">
          Join our community for transformative experiences in beautiful locations across Albania
        </p>
      </div>
      
      <div class="event-grid">
        <EventCard 
          v-for="event in events" 
          :key="event.id"
          :event="event"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mockEvents } from '../data/mockData.js'
import EventCard from './EventCard.vue'

export default {
  name: 'EventGrid',
  components: {
    EventCard
  },
  data() {
    return {
      events: mockEvents
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { month: 'short', day: 'numeric', year: 'numeric' }
      return new Date(dateString).toLocaleDateString('en-US', options)
    }
  }
}
</script>

<style scoped>
@import './EventGrid.css';
</style>
