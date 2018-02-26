<template>
  <div class="hello">
    <h1>Top 4 Heroes</h1>
    <div v-if="topHeroes.length">
      <div v-for="(hero, index) in topHeroes" :key="hero.id">
        <top-heroes :hero="hero" :index="index"></top-heroes>
      </div>
    </div>
    <div v-else>
      loading heroes...
    </div>
  </div>
</template>

<script>
import topHeroes from './top-hero'

export default {
  name: 'HelloWorld',
  components: {
    topHeroes
  },
  data () {
    return {
    }
  },
  computed: {
    heroes: function () {
      return this.$store.getters['heroes/collection']
    },
    topHeroes () {
      return this.heroes.slice(0, 4)
    }
  },
  mounted: function () {
    this.$store.dispatch('heroes/getCollection')
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
