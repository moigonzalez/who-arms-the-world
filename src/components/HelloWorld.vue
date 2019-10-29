<template>
  <section>
    <article v-for="armSale in armSales" :key="armSale.id">
      <div v-if="armSale['2018-2018']">
        <h2>{{ armSale.Supplier }}</h2>
        <div>Has sold over {{ armSale["2018-2018"] }} millions of dollars worth of weapons in 2018</div>
      </div>
    </article>
  </section>
</template>

<script>
import getArmsSsales from "../services/getArmsSales";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      isLoading: false,
      armSales: []
    }
  },
  created() {
    getArmsSsales()
      .then(x => this.armSales = x)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
