<script>
import basicInputField from './basic-input-field'
import _ from 'lodash'

export default {
  name: 'mixin',
  components: {
    basicInputField
  },
  data () {
    return {
      formErrors: {},
      outDated: {}
    }
  },
  methods: {
    handleFormErrors (error) {
      if (error.response.status === 423) {
        this.outDated = error.response.data
      }
      if (error.response.status === 422) {
        this.formErrors = error.response.data
      }

      throw error
    },
    handleOutDated (instance) {
      instance = _.clone(instance)

      if (this.outDated.updated_at) {
        instance.updated_at = this.outDated.updated_at
        this.outDated = Object.assign({}, {})
      }

      return instance
    }
  }
}
</script>
