<template>
  <div class="posts-index">
    <div class="card-deck">
      <div class="card">
        search:
        <input v-model="descriptionFilter" />

        <div
          v-for="coin in filterBy(coins, descriptionFilter, 'description')"
          :key="coin.id"
          v-bind:class="{ selected: coin === currentcoin }"
          v-on:click="currentcoin = coin"
        >
          <div class="col-3">
            <img class="card-img-top" v-bind:src="coin.image_url" alt="Card image cap" />
            <div class="card-body">
              <h5 class="card-title">Description: {{ coin.description }}</h5>
              <p class="card-text">Metal: {{ coin.metal }}</p>
              <p class="card-text">Denomination: {{ coin.denomination }}</p>
              <p class="card-text">Mint: {{ coin.mint }}</p>
              <p class="card-text">Year: {{ coin.year }}</p>
              <p class="card-text">Image: {{ coin.image }}</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div v-for="coin in coins" :key="coin.id">
      <router-link v-bind:to="`/coins/${coin.id}`">
        <h2>Title: {{ coin.title }}</h2>
        <p>Body: {{ coin.body }}</p>
        <img v-bind:src="coin.image" alt="coin.title" />
      </router-link>
    </div> -->
  </div>
</template>
<style>
.card {
  width: 300%;
}
.selected {
  color: rgb(255, 255, 255);
  background-color: rgb(201, 152, 29);
  transition: background-color 1.5s ease;
}
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

// Vue.use(Vue2Filters);

export default {
  data: function () {
    return {
      message: "Here all all the coins!",
      coins: [],
      currentCoin: {},
      descriptionFilter: "",
    };
  },
  mixins: [Vue2Filters.mixin],
  created: function () {
    this.indexCoins();
  },
  methods: {
    indexCoins: function () {
      axios.get("http://localhost:3000/index").then((response) => {
        this.coins = response.data;
        console.log("All coins:", this.coins);
      });
    },
  },
};
</script>
