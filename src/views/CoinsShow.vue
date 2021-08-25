<template>
  <div class="posts-new">
    <div class="container">
      <h2>Description: {{ coin.description }}</h2>
      <img v-bind:src="coin.image" />
      <p>Metal: {{ coin.metal }}</p>
      <p>Denomination: {{ coin.denomination }}</p>
      <p>Mint: {{ coin.mint }}</p>
      <p>Year: {{ coin.year }}</p>

      <!-- <router-link v-bind:to="`/coins/${coin.id}/edit`">
        <button class="btn btn-secondary">Edit coin</button>
      </router-link> -->
      <router-link to="/coins" class="btn btn-secondary">Back to all Coins</router-link>
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
