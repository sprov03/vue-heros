<template>
    <div>
        <div class="col-sm-6">
            <!--<search :callback="searchProducts"></search>-->
        </div>
        <div class="col-sm-6">
            <div class="pull-right">
                <!--<pagination :pagination="pagination" :callback="searchProducts"></pagination>-->
            </div>
        </div>

        <table class="table table-responsive table-striped table-bordered">
            <thead>
            <tr>
                <th v-for="column in columns" :key="column.id">{{ column.header }}</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="resource in resources" is="vue-table-row" :resource="resource" :columns="columns"></tr>
            </tbody>
        </table>

        <!--<pagination :pagination="pagination" :callback="searchProducts"></pagination>-->
    </div>
</template>

<script>
import vueTableRow from './vue-table-row.vue'
module.exports = {
  props: ['resources', 'columns'],
  components: {
    vueTableRow
  }
}

</script>
