<template>
    <button :class="classes" @click="clicked" :disabled="isDisabled"><span :class="{ 'fa fa-spinner fa-spin': isLoading}"></span>
        {{ buttonLabel }}
    </button>
</template>

<script>
export default {
  data: function () {
    return {
      classSet: {
        save: {
          ready: 'btn btn-primary',
          pending: 'btn btn-primary',
          success: 'btn btn-success',
          warning: 'btn btn-warning',
          error: 'btn btn-danger'
        },
        delete: {
          ready: 'btn btn-danger',
          pending: 'btn btn-warning',
          success: 'btn btn-success',
          warning: 'btn btn-warning',
          error: 'btn btn-danger'
        }
      },
      labelSet: {
        save: {
          ready: 'Save',
          pending: 'Saving...',
          success: 'Saved',
          warning: 'Save Anyway',
          error: 'Error Saving'
        },
        delete: {
          ready: 'Delete',
          pending: 'Deleting...',
          success: 'Deleted',
          warning: 'Delete Anyway',
          error: 'Error Deleting'
        }
      },
      status: 'ready'
    }
  },
  props: {
    labels: {
      type: Object
    },
    errors: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onClick: {
      required: true,
      type: Function
    },
    action: {
      required: true,
      type: String,
      default: 'save'
    }
  },
  computed: {
    needsConfirmation () {
      return (this.confirmationMessage)
    },
    classes () {
      if (this.disabled) {
        return 'btn btn-disabled'
      }

      return this.classSet[this.action][this.status]
    },
    isDisabled () {
      return (this.disabled || !this.status === 'ready')
    },
    isLoading () {
      return this.status === 'pending'
    },
    buttonLabel () {
      if (this.labels) {
        return this.labels[this.status]
      }

      return this.labelSet[this.action][this.status]
    }
  },
  watch: {
    'formErrors': {
      handler: function (newValue, oldValue) {
        for (var error in newValue) {
          if (!newValue.hasOwnProperty(error)) continue

          if (newValue[error]) {
            return
          }
        }

        this.reset()
      },
      deep: true
    }
  },
  methods: {
    clicked () {
      if (this.needsConfirmation) {
        this.confirm()

        return
      }

      this.process()
    },
    reset () {
      this.status = 'ready'
    },
    process () {
      this.status = 'pending'

      this.onClick()
        .then((response) => {
          this.status = 'success'
        })
        .catch((error) => {
          if (error.response.status === 423) {
            this.status = 'warning'
            return
          }

          this.status = 'error'
        })
    }
  }
}
</script>
