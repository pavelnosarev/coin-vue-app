<template>
  <div class="posts-new">
    <div class="container">
      <h2>{{ coin.description }}</h2>
      <p>{{ coin.metal }}</p>
      <p>{{ coin.denomination }}</p>
      <p>{{ coin.mint }}</p>
      <p>{{ coin.year }}</p>
      <p>{{ coin.image }}</p>

      <router-link v-bind:to="`/coins/${coin.id}/edit`"><button>Edit coin</button></router-link>
      <router-link to="/coins">Back to all Coins</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      errors: [],
      coin: {},
    };
  },
  created: function () {
    axios.get("/coins/" + this.$route.params.id).then((response) => {
      this.coin = response.data;
    });
  },
};
</script>
