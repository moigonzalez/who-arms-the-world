<template>
  <section id="sidebar" class="container">
    <div v-for="x in armSales" v-bind:key="x.supplier">
      {{ x.node.supplier }}
    </div>
  </section>
</template>

<script>
export default {
  name: 'Sidebar',
  mounted() {
    this.armSales = this.$parent.$static.armSales.edges;
  }
}
</script>

<style scoped>

</style>