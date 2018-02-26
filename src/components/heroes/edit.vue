<template>
  <div class="hello">
    <h1>Edit Hero</h1>
    <div class="clearfix"></div>
    <br>

    <h3 v-if="hero">Name: {{hero.name}}</h3>
    <hero-form v-if="dataLoaded" :hero="hero"></hero-form>
  </div>
</template>

<script>

import heroForm from './form'

export default {
  name: 'heroes',
  components: {
    heroForm
  },
  data () {
    return {
      dataLoaded: false
    }
  },
  computed: {
    heroId () {
      return parseInt(this.$router.currentRoute.params.heroId)
    },
    hero () {
      return this.heroes.find((hero) => hero.id === this.heroId)
    },
    heroes () {
      return this.$store.getters['heroes/collection']
    }
  },
  mounted: function () {
    Promise.all([
      this.$store.dispatch('heroes/getInstance', this.heroId),
      this.$store.dispatch('heroes/getTodos', this.heroId)
    ])
      .then((response) => {
        this.dataLoaded = true
      })
  }
}
</script>
