<template>
  <div class="coins-edit">
    <form v-on:submit.prevent="updateCoin()">
      <h1>Edit Coin</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Metal:</label>
        <input type="text" v-model="currentCoinParams.metal" />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" v-model="currentCoinParams.description" />
      </div>
      <div>
        <label>Denomination:</label>
        <input type="text" v-model="currentCoinParams.denomination" />
      </div>
      <div>
        <label>Mint:</label>
        <input type="text" v-model="currentCoinParams.mint" />
      </div>
      <div>
        <label>Year:</label>
        <input type="text" v-model="currentCoinParams.year" />
      </div>
      <div>
        <label>Image:</label>
        <input type="text" v-model="currentCoinParams.image" />
      </div>
      <input type="submit" value="Submit" />
      <button v-on:click="destroyCoin()">Delete</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      errors: [],
      currentCoinParams: {},
    };
  },
  created: function () {
    axios.get(`/coins/${this.$route.params.id}`).then((response) => {
      console.log("Coin info:", response.data);
      this.currentCoinParams = response.data;
    });
  },
  methods: {
    updateCoin: function () {
      axios.patch(`/coins/${this.$route.params.id}`, this.currentCoinParams).then((response) => {
        console.log(response.data);
        this.$router.push(`/coins/${response.data.id}`);
      });
    },
    destroyCoin: function () {
      axios.delete(`/coins/${this.$route.params.id}`).then((response) => {
        console.log("Sweet!", response.data);
        this.$router.push("/coins");
      });
    },
  },
};
</script>
