<template>
  <div class="login d-flex justify-content-center">
    <form v-on:submit.prevent="submit()">
      <h1 class="d-flex justify-content-center">Login</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label class="email d-flex justify-content-center" id="green">Email:</label>
        <input type="email" v-model="newSessionParams.email" />
      </div>
      <p></p>
      <div>
        <label class="email d-flex justify-content-center">Password:</label>
        <input type="password" v-model="newSessionParams.password" />
      </div>
      <p></p>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("isAdmin", response.data.isAdmin);
          this.$router.push("/about");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
``

<style>
/* input references tag (ie <h2> or <p>), (.) references class, (#) references id*/
input {
  text-align: center;
}
/* .email {
  color: rgb(74, 105, 208); */
/* } */
/* #green {
  color: green;
} */
</style>
