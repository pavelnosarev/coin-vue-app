<template>
  <div class="home">
    <h1>New Coin</h1>
    <div>
      Description:
      <input type="text" v-model="newCoinParams.description" />
      Metal:
      <input type="text" v-model="newCoinParams.metal" />
      Image:
      <input type="text" v-model="newCoinParams.image" />
      Denomination:
      <input type="text" v-model="newCoinParams.denomination" />
      Mint:
      <input type="text" v-model="newCoinParams.mint" />
      Year:
      <input type="text" v-model="newCoinParams.year" />
    </div>
    <button v-on:click="createCoin()">Create</button>

    <div v-for="coin in coins" :key="coin.id">
      <h2>Description: {{ coin.description }}</h2>
      <p>Denomination: {{ coin.denomination }}</p>
      <p>Metal: {{ coin.metal }}</p>
      <p>Mint: {{ coin.mint }}</p>
      <p>Year: {{ coin.year }}</p>
      <p>Image: {{ coin.image }}</p>
      <img v-bind:src="coin.image_url" alt="coin.description" />
      <button v-on:click="showCoin(coins_new)">More info!</button>
    </div>
    <dialog id="coins_new-details">
      <form method="dialog">
        <h1>Coin Info!</h1>
        <p>
          Description:
          <input type="text" v-model="currentCoin.description" />
        </p>
        <p>
          Metal:
          <input type="text" v-model="currentCoin.metal" />
        </p>
        <p>
          Image:
          <input type="text" v-model="currentCoin.image" />
        </p>
        <p>
          Mint:
          <input type="text" v-model="currentCoin.mint" />
        </p>
        <p>
          Year:
          <input type="text" v-model="currentCoin.year" />
        </p>
        <button v-on:click="updateCoin(currentCoin)">Update</button>
        <button v-on:click="destroyCoin(currentCoin)">Destroy</button>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "You wanted coins right?",
      coins: [],
      newCoinParams: {},
      currentCoin: {},
    };
  },
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
    createCoin: function () {
      console.log("Making a dang coin!");
      axios
        .post("http://localhost:3000/coins", this.newCoinParams)
        .then((response) => {
          console.log("Success!", response.data);
          this.coins.push(response.data);
        })
        .catch((error) => console.log(error.response));
    },
    showCoin: function (coin) {
      console.log(coin);
      this.currentCoin = coin;
      document.querySelector("#recipe-details").showModal();
    },
    updateCoin: function (coin) {
      var editCoinParams = coin;
      axios.patch("http://localhost:3000/coins/" + coin.id, editCoinParams).then((response) => {
        console.log("Success!", response.data);
      });
    },
    destroyCoin: function (coin) {
      axios.delete("http://localhost:3000/coins/" + coin.id).then((response) => {
        console.log("Success!", response.data);
        var index = this.coins.indexOf(coin);
        this.coins.splice(index, 1);
      });
    },
  },
};
</script>
