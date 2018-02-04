<template>
  <div v-if="index <= 3" class="col-sm-3">
    <div class="alert alert-info">
      <h3>{{ form.name }}</h3>
      <input class="form-control" type="text" v-model="localForm.name">
      <button class="btn btn-primary" @click="updateForm">Update<span v-if="updating">ing...</span></button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'top-form',
  data () {
    return {
      localForm: null,
      updating: false
    }
  },
  props: ['form', 'index'],
  beforeMount: function () {
    this.localForm = _.clone(this.form)
  },
  methods: {
    updateForm () {
      const index = this.index
      const updatedForm = _.clone(this.localForm)
      this.updating = true

      this.$store.dispatch('updateForm', {updatedForm, index})
        .then(() => {
          this.updating = false
        })
    }
  }
}
</script>

<style scoped>

</style>
