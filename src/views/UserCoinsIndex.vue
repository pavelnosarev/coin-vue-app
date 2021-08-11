<template>
  <div class="posts-index">
    <div class="card-deck">
      <div class="card">
        search:
        <input v-model="descriptionFilter" />

        <div
          v-for="userCoin in filterBy(userCoins, descriptionFilter, 'coin_id')"
          :key="userCoin.id"
          v-bind:class="{ selected: userCoin === currentUserCoin }"
          v-on:click="currentUserCoin = userCoin"
        >
          <div class="col-3">
            <div class="card-body">
              <h5 class="card-title">Description: {{ userCoin.description }}</h5>
              <p class="card-text">Metal: {{ userCoin.coin.metal }}</p>
              <p class="card-text">Denomination: {{ userCoin.coin.denomination }}</p>
              <p class="card-text">Mint: {{ userCoin.coin.mint }}</p>
              <p class="card-text">Year: {{ userCoin.coin.year }}</p>
              <p class="card-text">Status: {{ userCoin.status }}</p>
              <img v-bind:src="userCoin.coin.image" />
              <router-link v-bind:to="`/usercoins/${userCoin.id}/edit`"><button>Edit coin</button></router-link>
              <router-link v-bind:to="`/usercoins/${userCoin.id}/add?`">
                <button>Add To My Coin</button>
              </router-link>

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
  width: 100%;
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
      message: "Here all all your coins!",
      userCoins: [],
      currentUserCoin: {},
      descriptionFilter: "",
    };
  },
  mixins: [Vue2Filters.mixin],
  created: function () {
    this.indexUserCoin();
  },
  methods: {
    indexUserCoin: function () {
      axios.get("/usercoins").then((response) => {
        this.userCoins = response.data;
        console.log("My coins:", this.userCoins);
      });
    },
  },
};
</script>
