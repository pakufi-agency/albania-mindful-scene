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
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.form.email
          })
        })
        
        if (!response.ok) {
          let errorMessage = 'Failed to subscribe to newsletter'
          try {
            const errorData = await response.json()
            errorMessage = errorData.message || errorMessage
          } catch (jsonError) {
            // Handle cases where response is not valid JSON
            errorMessage = `Subscription failed (${response.status}): Please try again later`
          }
          throw new Error(errorMessage)
        }
        
        // Try to parse successful response, but don't fail if it's not JSON
        try {
          await response.json()
        } catch (jsonError) {
          // Ignore JSON parsing errors for successful responses
        }
        
        this.submitted = true
        this.form = { email: '' }
        
        setTimeout(() => {
          this.submitted = false
        }, 5000)
        
      } catch (error) {
        if (error.message === 'Failed to fetch') {
          this.error = 'Unable to connect to the newsletter service. Please check your internet connection and try again.'
        } else if (error.message.includes('Subscription failed')) {
          this.error = error.message
        } else if (error.message.includes('Beehiiv configuration')) {
          this.error = 'Newsletter service is temporarily unavailable. Please try again later.'
        } else {
          this.error = 'Something went wrong while subscribing. Please try again or contact support if the issue persists.'
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
