<template>
  <div class="posts-index">
    <div class="product-area pb-60">
      <div class="container">
        <div>
          <div class="tab-content jump">
            <div class="tab-pane" id="product-1">
              <div class="row"></div>
            </div>
            <div class="tab-pane active" id="product-2">
              <div class="row">
                <div class="row">
                  <div
                    v-for="userCoin in filterBy(userCoins, descriptionFilter, 'coin_id')"
                    :key="userCoin.id"
                    v-bind:class="{ selected: userCoin === currentUserCoin }"
                    v-on:click="currentUserCoin = userCoin"
                    class="col-xl-3 col-md-6 col-lg-4 col-sm-6"
                  >
                    <div class="product-wrap-2 mb-25">
                      <div class="product-img">
                        <a v-bind:href="`/coins/${userCoin.coin.id}`">
                          <img class="default-img" v-bind:src="userCoin.coin.image" alt="" />
                          <img class="hover-img" v-bind:src="userCoin.coin.image" alt="" />
                        </a>
                      </div>
                      <div class="product-content-2">
                        <div class="title-price-wrap-2">
                          <h3>
                            <p class="card-text">Denomination: {{ userCoin.coin.denomination }}</p>
                          </h3>
                          <div class="price-2">
                            <span class="card-text">Metal: {{ userCoin.coin.metal }}</span>
                            <span class="card-text">Mint: {{ userCoin.coin.mint }}</span>
                            <span class="card-text">Status: {{ userCoin.status }}</span>
                            <h5 class="card-title text-center">Description: {{ userCoin.coin.description }}</h5>
                            <router-link v-bind:to="`/usercoins/${userCoin.id}/edit`">
                              <button class="btn btn-secondary">Edit Coin</button>
                            </router-link>

                            <router-link v-bind:to="`/usercoins/${userCoin.id}/destroy`">
                              <button class="btn btn-secondary">Delete Coin</button>
                            </router-link>
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
    </div>
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
              <!-- <h5 class="card-title">Description: {{ userCoin.coin.description }}</h5> -->
              <!-- <p class="card-text">Metal: {{ userCoin.coin.metal }}</p> -->
              <!-- <p class="card-text">Denomination: {{ userCoin.coin.denomination }}</p> -->
              <!-- <p class="card-text">Mint: {{ userCoin.coin.mint }}</p> -->
              <p class="card-text">Year: {{ userCoin.coin.year }}</p>
              <!-- <p class="card-text">Status: {{ userCoin.status }}</p> -->
              <img v-bind:src="userCoin.coin.image" />
              <router-link v-bind:to="`/usercoins/${userCoin.id}/edit`"><button>Edit Coin</button></router-link>
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
    deleteUserCoin: function (coin) {
      var params = { coin_id: coin.id };
      axios.delete("http://localhost:3000/usercoins", params).then((response) => {
        this.userCoins = response.data;
        console.log("Deleted this coin from list.", this.userCoins);
      });
    },
  },
};
</script>
