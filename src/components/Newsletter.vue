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
              >
                Join Us
              </button>
            </div>
          </form>
          
          <div v-if="submitted" class="success-message">
            <p>Thank you for joining our community!</p>
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
      submitted: false
    }
  },
  methods: {
    handleSubmit() {
      console.log('Newsletter subscription:', this.form.email)
      this.submitted = true
      
      setTimeout(() => {
        this.form = { email: '' }
        this.submitted = false
      }, 3000)
    }
  }
}
</script>

<style scoped>
@import './Newsletter.css';
</style>
