<template>
  <div class="event-card">
    <!-- Event Image -->
    <div class="event-image-container">
      <img 
        :src="event.image" 
        :alt="event.title"
        class="w-full h-full object-cover"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      <div class="event-image-overlay">
        <h2 class="event-title">{{ event.title }}</h2>
      </div>
    </div>
    
    <!-- Event Content -->
    <div class="p-4">
      <h3 class="event-time">{{ event.date }} {{ event.time }}</h3>
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <span>Here the description{{ event.description }}</span>
      </div>

      <div class="event-meta">
        <div class="flex items-center gap-2 text-gray-600">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span>{{ event.location }}</span>
        </div>

        <div class="flex items-center gap-2 text-gray-600">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
          <span>Organized by: <a :href="event.organiserLink" target="_blank">{{ event.organiser }}</a></span>
        </div>

        <div class="flex items-center gap-2 text-gray-600">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
          <span>Original post: <a :href="event.post_url" target="_blank">{{ event.post_url }}</a></span>
        </div>
      </div>
      
      <!-- <div class="event-actions">
        <a 
          :href="event.sourceLink" 
          target="_blank"
          class="flex-1 px-4 py-2 text-white text-center rounded-sm transition-all text-sm font-medium"
          style="background-color: var(--color-primary)"
        >
          See original post
        </a>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
@import './EventCard.css';
</style>
