<template>
  <div class="login">
    <div class="login-register-area pt-100 pb-100">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 col-md-12 ms-auto me-auto">
            <div class="login-register-wrapper">
              <div class="login-register-tab-list nav">
                <a class="active" data-bs-toggle="tab" href="#lg1">
                  <h4>login</h4>
                </a>
              </div>
              <div class="tab-content">
                <div id="lg1" class="tab-pane active">
                  <div class="login-form-container">
                    <div class="login-register-form">
                      <form v-on:submit.prevent="submit()">
                        <ul>
                          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                        </ul>
                        <input type="email" v-model="newSessionParams.email" placeholder="email" />
                        <br />
                        <br />

                        <input type="password" v-model="newSessionParams.password" placeholder="password" />
                        <div class="button-box">
                          <button type="submit"><span>Login</span></button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="login d-flex justify-content-center">
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
    </div> -->
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
<style></style>
