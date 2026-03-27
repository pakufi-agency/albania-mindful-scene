<template>
  <section id="newsletter" class="newsletter-section">
    <div class="container">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="title-section mb-4">
          Join our thriving community
        </h2>
        <p class="subtitle">
          Subscribe to our newsletter to find out where and when can you meet fellow colleagues and be inspired by the professionals in the field.
        </p>
        
        <div class="newsletter-form">
          <form @submit.prevent="handleSubmit" class="newsletter-form-inner">
            <div class="email-input-group">
              <input 
                v-model="form.email"
                type="email" 
                placeholder="Enter your email"
                class="form-input"
                required
              >
              <button 
                type="submit"
                class="btn-primary"
                :disabled="loading"
              >
                <span v-if="loading">Subscribing...</span>
                <span v-else>Join Us</span>
              </button>
            </div>
          </form>
          
          <div v-if="submitted" class="success-message">
            <p>Thank you for joining our community!</p>
          </div>
          
          <div v-if="error" class="error-message">
            <p>{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Newsletter',
  data() {
    return {
      form: {
        email: ''
      },
      submitted: false,
      loading: false,
      error: null
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      this.error = null
      
      try {
        const apiKey = import.meta.env.VITE_BEEHIIV_API_KEY
        const publicationId = import.meta.env.VITE_BEEHIIV_PUBLICATION_ID
        
        if (!apiKey || !publicationId) {
          throw new Error('Beehiiv configuration is missing')
        }
        
        const response = await fetch(`/api/v2/publications/${publicationId}/subscriptions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            email: this.form.email
          })
        })
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to subscribe')
        }
        
        this.submitted = true
        this.form = { email: '' }
        
        setTimeout(() => {
          this.submitted = false
        }, 5000)
        
      } catch (error) {
        if (error.message === 'Failed to fetch') {
          this.error = 'Unable to connect to Beehiiv API.'
        } else {
          this.error = error.message || 'Failed to subscribe to newsletter'
        }
        console.error('Newsletter subscription error:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
@import './Newsletter.css';
</style>
