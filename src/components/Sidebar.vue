<template>
  <ol id="sidebar" class="container">
    <li v-for="x in armSales" v-bind:key="x.supplier">
      <div class="sidebar__item">
        {{ x.node.supplier }}
      </div>
    </li>
  </ol>
</template>

<script>

const isArmSaleValid = ({ data, supplier }) => {
  const isNotEmpty = data !== "" && data !== "0";
  const isValidCountry = !supplier.startsWith('Unknown') && supplier !== 'Total' && supplier !== 'Others';
  return isNotEmpty && isValidCountry;
}

export default {
  name: 'Sidebar',
  props: ['active-country'],
  data() {
    return {
      armSales: this.$parent.$static.armSales.edges.filter(x => isArmSaleValid(x.node)),
    }
  },
}
</script>

<style scoped>
.container {
  max-height: 100vh;
  overflow: auto;
  width: 25%;
}
.sidebar__item {
  padding: 20px;
  border: solid 1px black;
  cursor: pointer;
}
.sidebar__item:hover {
  color: white;
  background: black;
}
</style>