<template>
  <section class="container">
    <div v-if="isLoading">
      <g-image alt="Loader" src="~/assets/puff.svg" />
    </div>
    <article v-if="!isLoading">
      <div v-for="armSale in armSales" :key="armSale.id">
        <div v-if="isArmSaleValid(armSale['2018-2018'])">
          <h2>{{ armSale.Supplier }}</h2>
          <div>Has sold over {{ armSale["2018-2018"] }} millions of dollars worth of weapons in 2018</div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import getArmsSsales from "../services/getArmsSales";

const isArmSaleValid = x => x !== "" && x !== "0";

export default {
  name: 'HelloWorld',
  data() {
    return {
      isLoading: true,
      armSales: [],
      isArmSaleValid: isArmSaleValid,
    }
  },
  created() {
    getArmsSsales()
      .then(x => {
        this.armSales = x;
        this.isLoading = false;
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  text-align: center;
}
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
