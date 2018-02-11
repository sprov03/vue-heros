<template>
    <tr>
        <th v-for="column in columns" :key="column.id">
            <a v-if="column.link" :href="column.link(resource)">{{resource[column['column']]}}</a>
            <span v-else>{{resource[column['column']]}}</span>
        </th>
    </tr>
</template>

<script>
module.exports = {
  props: ['resource', 'columns']
}
</script>
