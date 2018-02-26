<template>
  <div v-if="index <= 3" class="col-sm-3">
    <div class="alert alert-info">
      <h3>{{ form.name }}</h3>

      <basic-input-field
        v-model="localForm.name"
        label="Name:"
        :form-errors.sync="formErrors.name">
      </basic-input-field>

      <vue-button :on-click="saveForm" action="save" :form-errors="formErrors"></vue-button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import formUtilities from '../utilities/forms/mixin'

export default {
  name: 'top-form',
  mixins: [formUtilities],
  data () {
    return {
      localForm: {}
    }
  },
  props: ['form', 'index'],
  beforeMount: function () {
    this.localForm = _.clone(this.form)
  },
  methods: {
    saveForm () {
      return this.$store.dispatch('forms/saveInstance', this.localForm)
        .then((response) => {
          this.localForm = response.data
        }, this.handleFormErrors)
    }
  }
}
</script>

<style scoped>

</style>
