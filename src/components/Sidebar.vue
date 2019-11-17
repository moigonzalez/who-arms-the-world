<template>
  <ol id="sidebar" class="container">
    <li v-for="x in armSales" v-bind:key="x.supplier">
      <div v-bind:id="transformNameToId(x.node.supplier)"
          v-bind:class="{active: activeCountry.id === transformNameToId(x.node.supplier)}"
          @click="setActiveCountry({...x.node, id: transformNameToId(x.node.supplier)})"
          class="sidebar__item">
        {{ x.node.supplier }}
      </div>
    </li>
  </ol>
</template>

<script>
import transformNameToId from '../services/transformNameToId';

const isArmSaleValid = ({ data, supplier }) => {
  const isNotEmpty = data !== "" && data !== "0";
  const isValidCountry = !supplier.startsWith('Unknown') && supplier !== 'Total' && supplier !== 'Others';
  return isNotEmpty && isValidCountry;
}

export default {
  name: 'Sidebar',
  computed: {
    activeCountry () {
	    return this.$store.state.activeCountry
    }
  },
  data() {
    return {
      armSales: this.$parent.$static.armSales.edges.filter(x => isArmSaleValid(x.node)),
      transformNameToId,
    }
  },
  methods: {
    setActiveCountry(payload) {
      this.$store.commit('setActiveCountry', payload)
    }
  },
  watch: {
    activeCountry (country) {
      this.$el.querySelector(`#${country.id}`).scrollIntoView({ behavior: 'smooth' });
    }
  }
}
</script>

<style scoped>
.container {
  max-height: 100vh;
  overflow: auto;
  width: 25%;
  margin: 0;
  list-style: none;
  padding: 0;
  counter-reset: sidebar;
}
.sidebar__item:before {
  content: counter(sidebar);
  counter-increment: sidebar;
  background-color: black;
  color: white;
  padding: 5px 10px;
}
.sidebar__item {
  padding: 20px;
  border: solid 1px black;
  cursor: pointer;
}
.sidebar__item.active,
.sidebar__item:hover {
  color: white;
  background: black;
}
</style>