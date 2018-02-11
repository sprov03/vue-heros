<template>
    <div class="form-group" :class="{'is-invalid': hasError}">
        <label v-if="label" :class="{'text-danger': hasError}">{{label}}</label>
        <input @input="$emit('input', $event.target.value)" :value="value" :class="{'is-invalid': hasError}" type="type ||'text'" class="form-control" :placeholder="placeholder">
        <div v-if="hasError">
            <div class="text-danger" v-for="(error, index) in errors" :key="index">{{error}}</div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
import inputField from './input-field.vue'

export default {
  props: ['value', 'label', 'type', 'placeholder', 'errors'],
  components: {
    inputField
  },
  watch: {
    'value': {
      handler: function (newValue, oldValue) {
        if (this.hasError) {
          // Custom Error Validations should go here and if passes then clear the error
          this.$emit('update:errors', undefined)
        }
      }
    },
    'errors': {
      handler: function (newValue, oldValue) {
        if (this.hasError) {
          this.$nextTick(() => {
            document.getElementsByClassName('form-control is-invalid')[0].focus()
          })
        }
      }
    }
  },
  computed: {
    hasError () {
      return !((this.errors === [] || !this.errors))
    }
  }

}
</script>
