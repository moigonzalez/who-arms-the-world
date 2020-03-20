<template>
  <ol id="sidebar" class="container show">
    <li v-for="(x, index) in armSales"
        class="sidebar__li"
        v-bind:style="{ 'transition-delay': index * 100 + 'ms' }"
        v-bind:key="x.node.id">
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

const isArmSaleValid = (node, activeYear) => {
  const { supplier } = node;
  const isNotEmpty = node[activeYear] !== "" && node[activeYear] !== "0";
  const isValidCountry = !supplier.startsWith('Unknown') && supplier !== 'Total' && supplier !== 'Others';
  return isNotEmpty && isValidCountry;
}

export default {
  name: 'Sidebar',
  computed: {
    activeCountry () {
	    return this.$store.state.activeCountry
    },
    activeYear () {
      return this.$store.state.activeYear
    }
  },
  data() {
    return {
      armSales: this.$parent.$static.armSales.edges
        .filter(x => isArmSaleValid(x.node, this.$store.state.activeYear))
        .sort((a, b) => b[this.$store.state.activeYear] - a[this.$store.state.activeYear]),
      transformNameToId,
    }
  },
  methods: {
    setActiveCountry(payload) {
      this.$store.commit('setActiveCountry', payload)
    },
  },
  watch: {
    activeCountry (country) {
      this.$el.querySelector(`#${country.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },
    activeYear (year) {
      this.$el.classList.remove('show');
      this.armSales = this.$parent.$static.armSales.edges
        .filter(x => isArmSaleValid(x.node, year))
        .sort((a, b) => b.node[year] - a.node[year]);
      setTimeout(() => {
        this.$el.classList.add('show');
      })
    }
  }
}
</script>

<style scoped>
.container {
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
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
  transition: all 0.2s ease-in-out;
}
.sidebar__item {
  padding: 20px;
  border: solid 1px black;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.sidebar__li {
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.2s ease-in-out;
  transition: none;
}
.show .sidebar__li {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.2s ease-in-out;
}
.sidebar__item.active,
.sidebar__item:hover {
  color: white;
  background: black;
}

.sidebar__item.active:before,
.sidebar__item:hover:before {
  background-color: white;
  color: black;
}

@media (max-width: 760px) {
  .container {
    position: absolute;
    width: 100%;
    bottom: 60px;
    height: 66px;
    display: flex;
    background: white;
    overflow: auto;
  }

  .sidebar__item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 116px;
  }
}
</style>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>