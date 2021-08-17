<template>
  <div class="usercoins-edit">
    <form v-on:submit.prevent="updateUserCoin()">
      <h1>Edit My Coin</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div v-if="isAdmin()">
        <label>Metal:</label>
        <input type="text" v-model="currentUserCoinParams.metal" />
      </div>
      <div v-if="isAdmin()">
        <label>Description:</label>
        <input type="text" v-model="currentUserCoinParams.description" />
      </div>
      <div v-if="isAdmin()">
        <label>Denomination:</label>
        <input type="text" v-model="currentUserCoinParams.denomination" />
      </div>
      <div v-if="isAdmin()">
        <label>Mint:</label>
        <input type="text" v-model="currentUserCoinParams.mint" />
      </div>
      <div v-if="isAdmin()">
        <label>Year:</label>
        <input type="text" v-model="currentUserCoinParams.year" />
      </div>
      <div>
        <label>Status:</label>
        <input type="text" v-model="currentUserCoinParams.status" />
      </div>
      <div v-if="isAdmin()">
        <label>Image:</label>
        <input type="text" v-model="currentUserCoinParams.image" />
      </div>
      <input type="submit" value="Submit" />
      <button v-on:click="destroyUserCoin(userCoin)">Delete From List</button>
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
      userCoin: [],
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
      axios.patch(`/usercoins/${this.$route.params.id}`, this.currentUserCoinParams).then((response) => {
        console.log(response.data);
        this.$router.push(`/usercoins`);
      });
    },
    destroyUserCoin: function () {
      axios.delete(`/usercoins/${this.$route.params.id}`).then((response) => {
        console.log("why you delete me.", response.data);
        this.$router.push("/usercoins");
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
