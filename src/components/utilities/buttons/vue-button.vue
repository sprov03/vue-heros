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
          error: 'btn btn-danger'
        },
        delete: {
          ready: 'btn btn-danger',
          pending: 'btn btn-warning',
          success: 'btn btn-success',
          error: 'btn btn-danger'
        }
      },
      labelSet: {
        save: {
          ready: 'Save',
          pending: 'Saving...',
          success: 'Saved',
          error: 'Error Saving'
        },
        delete: {
          ready: 'Delete',
          pending: 'Deleting...',
          success: 'Deleted',
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
          this.status = 'error'
          console.log(error)
        })
    }
  }
}
</script>
