<template>
  <div class="posts-index">
    <!-- search:
        <input v-model="descriptionFilter" /> -->
    <div class="product-area pb-60">
      <div class="container">
        <div class="tab-filter-wrap mb-60">
          <div class="product-tab-list-2 nav">
            <a href="#product-1" data-bs-toggle="tab"></a>
            <a class="active" href="#product-2" data-bs-toggle="tab">
              <h1>All Coins</h1>
            </a>
            <a href="coins" data-bs-toggle="tab"></a>
          </div>
          <div class="filter-active">
            <a href="#">
              <i class="fa fa-plus"></i>
              filter
            </a>
          </div>
        </div>

        <div>
          <div class="tab-content jump">
            <div class="tab-pane" id="product-1">
              <div class="row"></div>
            </div>
            <div class="tab-pane active" id="product-2">
              <div class="row">
                <div class="row">
                  <div
                    v-for="coin in filterBy(coins, descriptionFilter, 'description')"
                    :key="coin.id"
                    v-bind:class="{ selected: coin === currentCoin }"
                    v-on:click="currentCoin = coin"
                    class="col-xl-3 col-md-6 col-lg-4 col-sm-6"
                  >
                    <div class="product-wrap-2 mb-25">
                      <div class="product-img">
                        <a v-bind:href="`/coins/${coin.id}`">
                          <img class="default-img" v-bind:src="coin.image" alt="" />
                          <img class="hover-img" v-bind:src="coin.image" alt="" />
                        </a>
                      </div>
                      <div class="product-content-2">
                        <div class="title-price-wrap-2">
                          <h3>
                            <p class="card-text">Denomination: {{ coin.denomination }}</p>
                          </h3>
                          <div class="price-2">
                            <span class="card-text">Metal: {{ coin.metal }}</span>
                            <span class="card-text">Mint: {{ coin.mint }}</span>
                            <h5 class="card-title text-center">Description: {{ coin.description }}</h5>
                          </div>
                        </div>
                        <div class="pro-wishlist-2">
                          <a title="Wishlist" href="wishlist.html"><i class="fa fa-heart-o"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- #dont forget admin -->
      <!-- <div
        v-for="coin in filterBy(coins, descriptionFilter, 'description')"
        :key="coin.id"
        v-bind:class="{ selected: coin === currentCoin }"
        v-on:click="currentCoin = coin"
      >
        <div class="card" style="width: auto">
          <div class="card-body">
            <h5 class="card-title text-center">Description: {{ coin.description }}</h5>
            <p class="card-text">Metal: {{ coin.metal }}</p>
            <p class="card-text">Denomination: {{ coin.denomination }}</p>
            <p class="card-text">Mint: {{ coin.mint }}</p>
            <p class="card-text">Year: {{ coin.year }}</p>
            <img v-bind:src="coin.image" />

            <router-link v-bind:to="`/coins/${coin.id}/edit`">
              <button v-if="isAdmin()">Edit coin</button>
            </router-link>
            <router-link v-bind:to="`usercoins`">
              <button v-on:click="addUserCoin(coin)">Add To My Coin</button>
            </router-link>

            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div> -->

      <!-- <div v-for="coin in coins" :key="coin.id">
      <router-link v-bind:to="`/coins/${coin.id}`">
        <h2>Title: {{ coin.title }}</h2>
        <p>Body: {{ coin.body }}</p>
        <img v-bind:src="coin.image" alt="coin.title" />
      </router-link>
    </div> -->
    </div>
  </div>
</template>

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
      userCoins: [],
      // userId:localStorage.getItem("user_id"),
    };
  },
  mixins: [Vue2Filters.mixin],
  created: function () {
    this.indexCoins();
  },
  methods: {
    indexCoins: function () {
      axios.get("http://localhost:3000/coins").then((response) => {
        this.coins = response.data;
        console.log("All coins:", this.coins);
      });
    },
    addUserCoin: function (coin) {
      var params = { coin_id: coin.id };
      axios.post("http://localhost:3000/usercoins", params).then((response) => {
        this.userCoins = response.data;
        console.log("All usercoins:", this.userCoins);
      });
    },
    isAdmin: function () {
      // return localStorage.getItem("isAdmin")
      if (localStorage.getItem("isAdmin") == "true") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style></style>
