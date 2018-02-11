<template>
    <input @input="$emit('input', $event.target.value)" :value="value" type="type ||'text'" class="form-control" :placeholder="placeholder">
</template>

<script>
export default {
  props: ['value', 'type', 'placeholder']
}
</script>
