<template>
  <section id="events" class="section">
    <div class="container">
      <div class="text-center mb-16">
        <h2 class="title-section">
          Upcoming Events
        </h2>
        <!-- <p class="text-body max-w-2xl mx-auto">
          Join our community for transformative experiences in beautiful locations across Albania
        </p> -->
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-16">
        <div class="max-w-md mx-auto">
          <div class="inline-flex items-center justify-center w-16 h-16 mb-6">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-2 border-gray-900"></div>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Loading Events</h3>
          <p class="text-gray-600 mb-8">Fetching the latest mindful events from Albania...</p>
          
          <!-- Skeleton Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="i in 3" :key="i" class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="h-48 bg-gray-200 animate-pulse"></div>
              <div class="p-4 space-y-3">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <div class="max-w-md mx-auto">
          <div class="inline-flex items-center justify-center w-16 h-16 mb-6 bg-red-100 rounded-full">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
          <p class="text-gray-600 mb-6">{{ error }}</p>
          <div class="space-y-3">
            <button 
              @click="retryFetch" 
              class="btn-primary"
            >
              Try Again
            </button>
            <p class="text-sm text-gray-500">
              If the problem persists, please check your connection or contact support.
            </p>
          </div>
        </div>
      </div>
      
      <!-- No Events State -->
      <div v-else-if="events.length === 0" class="text-center py-16">
        <div class="max-w-md mx-auto">
          <div class="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gray-100 rounded-full">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">No Events Available</h3>
          <p class="text-gray-600 mb-4">There are currently no events scheduled. Check back soon for upcoming mindful experiences!</p>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="text-sm text-blue-800">
              <strong>Stay connected:</strong> Follow our social media for the latest event announcements.
            </p>
          </div>
        </div>
      </div>
      
      <!-- Events Grid -->
      <div v-else>
        <div class="event-grid">
          <EventCard 
            v-for="(event, index) in visibleEvents" 
            :key="event.id"
            :event="event"
            ref="eventCardRefs"
          />
        </div>
        
        <!-- Load More Button -->
        <div v-if="hasMoreEvents" class="flex justify-center mt-8">
          <button 
            @click="loadMore" 
            :disabled="loadingMore"
            class="btn-primary"
          >
            <span v-if="!loadingMore">Load More Events</span>
            <span v-else>Loading...</span>
          </button>
        </div>
        
        <!-- Loading More Indicator -->
        <div v-if="loadingMore" class="text-center mt-6">
          <div class="inline-flex items-center justify-center w-12 h-12">
            <div class="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-2 border-gray-900"></div>
          </div>
          <p class="mt-2 text-sm text-gray-600">Loading more events...</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { fetchEventsFromAirtable } from '../services/airtable.js'
import EventCard from './EventCard.vue'

export default {
  name: 'EventGrid',
  components: {
    EventCard
  },
  data() {
    return {
      events: [],
      visibleEvents: [],
      loading: true,
      loadingMore: false,
      error: null,
      eventsPerPage: 20,
      currentPage: 1,
      eventCardRefs: []
    }
  },
  computed: {
    hasMoreEvents() {
      return this.visibleEvents.length < this.events.length
    }
  },
  async created() {
    await this.loadEvents()
  },
  mounted() {
    this.setupIntersectionObserver()
  },
  methods: {
    async loadEvents() {
      try {
        this.loading = true
        this.error = null
        
        const events = await fetchEventsFromAirtable()
        this.events = events
        
        // Show initial batch of events
        this.visibleEvents = events.slice(0, this.eventsPerPage)
        
      } catch (error) {
        console.error('Error loading events:', error)
        this.error = error.message || 'There was an error. Please try to reload again.'
        this.events = []
        this.visibleEvents = []
      } finally {
        this.loading = false
      }
    },
    
    loadMore() {
      if (this.loadingMore || !this.hasMoreEvents) return
      
      this.loadingMore = true
      
      // Simulate network delay for better UX
      setTimeout(() => {
        const startIndex = this.visibleEvents.length
        const endIndex = Math.min(startIndex + this.eventsPerPage, this.events.length)
        
        this.visibleEvents = [
          ...this.visibleEvents,
          ...this.events.slice(startIndex, endIndex)
        ]
        
        this.loadingMore = false
      }, 500)
    },
    
    setupIntersectionObserver() {
      // Optional: Auto-load more when user scrolls near bottom
      const options = {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
      }
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && this.hasMoreEvents && !this.loadingMore) {
            this.loadMore()
          }
        })
      }, options)
      
      // Observe the last visible event card
      this.$nextTick(() => {
        if (this.eventCardRefs && this.eventCardRefs.length > 0) {
          const lastCard = this.eventCardRefs[this.eventCardRefs.length - 1]
          if (lastCard) {
            observer.observe(lastCard.$el || lastCard)
          }
        }
      })
    },
    
    async retryFetch() {
      await this.loadEvents()
    },
    
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
