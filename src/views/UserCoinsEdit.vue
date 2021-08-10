<template>
  <div class="usercoins-edit">
    <form v-on:submit.prevent="updateUserCoin()">
      <h1>Edit My Coin</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Metal:</label>
        <input type="text" v-model="currentUserCoinParams.metal" />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" v-model="currentUserCoinParams.description" />
      </div>
      <div>
        <label>Denomination:</label>
        <input type="text" v-model="currentUserCoinParams.denomination" />
      </div>
      <div>
        <label>Mint:</label>
        <input type="text" v-model="currentUserCoinParams.mint" />
      </div>
      <div>
        <label>Year:</label>
        <input type="text" v-model="currentUserCoinParams.year" />
      </div>
      <div>
        <label>Image:</label>
        <input type="text" v-model="currentUserCoinParams.image" />
      </div>
      <input type="submit" value="Submit" />
      <button v-on:click="destroyUserCoin()">Delete From List</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      errors: [],
      currentUserCoinParams: {},
    };
  },
  created: function () {
    axios.get(`/usercoins/${this.$route.params.id}`).then((response) => {
      console.log("UserCoin info:", response.data);
      this.currentUserCoinParams = response.data;
    });
  },
  methods: {
    updateUserCoin: function () {
      axios.patch(`/coins/${this.$route.params.id}`, this.currentUserCoinParams).then((response) => {
        console.log(response.data);
        this.$router.push(`/usercoins/${response.data.id}`);
      });
    },
    destroyCoin: function () {
      axios.delete(`/usercoins/${this.$route.params.id}`).then((response) => {
        console.log("Sadge.", response.data);
        this.$router.push("/usercoins");
      });
    },
  },
};
</script>
