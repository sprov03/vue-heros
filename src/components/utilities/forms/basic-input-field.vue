<template>
    <div class="form-group" :class="{'is-invalid': hasError || isOutDated}">
        <label v-if="label" :class="{'text-danger': hasError, 'text-warning': isOutDated}">{{label}}</label>
        <cleave v-if="cleaveOptions" v-model="localValue" :options="cleaveOptions" :class="{'is-invalid': hasError, 'text-warning is-invalid': isOutDated}" :type="type ||'text'" class="form-control" :placeholder="placeholder" :disabled="disabled"></cleave>
        <input v-else @input="$emit('input', $event.target.value)" :value="value" :class="{'is-invalid': hasError, 'text-warning is-invalid': isOutDated}" :type="type ||'text'" class="form-control" :placeholder="placeholder" :disabled="disabled">
        <div v-if="hasError">
            <div class="text-danger" v-for="(error, index) in formErrors" :key="index">{{error}}</div>
        </div>
        <div v-if="isOutDated">
          <div class="text-warning">Existing Value: {{outDated}}</div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
import cleave from 'vue-cleave-component'
let moment = require('moment')

export default {
  props: ['value', 'label', 'type', 'placeholder', 'formErrors', 'disabled', 'outDated', 'cleaveOptions'],
  components: {
    cleave
  },
  data () {
    return {
      localValue: ''
    }
  },
  watch: {
    'value': {
      handler: function (newValue, oldValue) {
        if (this.type === 'date') {
          this.localValue = moment(this.value).format('YYYY-MM-DD')
          return
        }
        this.localValue = this.value
      }
    },
    'localValue': {
      handler: function (newValue, oldValue) {
        this.$emit('input', this.localValue)
        if (this.hasError) {
          // Custom Error Validations should go here and if passes then clear the error
          this.$emit('update:formErrors', undefined)
        }
      }
    },
    'formErrors': {
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
      return !((this.formErrors === [] || !this.formErrors))
    },
    isOutDated () {
      return (this.outDated && this.value !== this.outDated)
    }
  }
}
</script>
