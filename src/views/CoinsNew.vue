<template>
  <div class="coins-new">
    <img v-if="status" :src="`https://http.cat/${status}`" />
    <form v-on:submit.prevent="createCoin()">
      <h1>New Coin</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Metal:</label>
        <input type="text" v-model="newCoinParams.metal" />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" v-model="newCoinParams.description" />
      </div>
      <div>
        <label>Denomination:</label>
        <input type="text" v-model="newCoinParams.denomination" />
      </div>
      <div>
        <label>Mint:</label>
        <input type="text" v-model="newCoinParams.mint" />
      </div>
      <div>
        <label>Year:</label>
        <input type="text" v-model="newCoinParams.year" />
      </div>
      <div>
        <label>Image:</label>
        <input type="text" v-model="newCoinParams.image" />
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      errors: [],
      status: "",
      newCoinParams: {},
    };
  },
  methods: {
    createCoin: function () {
      console.log("Adding that coin!");
      axios
        .post("/coins", this.newCoinParams)
        .then((response) => {
          this.$router.push("/coins");
          console.log(response.data);
        })
        .catch((error) => {
          this.status = error.response.status;
        });
    },
  },
};
</script>
