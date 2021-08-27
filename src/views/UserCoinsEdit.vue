<template>
  <div class="login">
    <div class="login-register-area pt-100 pb-100">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 col-md-12 ms-auto me-auto">
            <div class="login-register-wrapper">
              <div class="login-register-tab-list nav">
                <a class="active" data-bs-toggle="tab" href="#lg1"></a>
                <h1>edit my coin</h1>
              </div>
              <div class="tab-content">
                <div id="lg1" class="tab-pane active">
                  <div class="login-form-container">
                    <div class="login-register-form">
                      <form v-on:submit.prevent="updateUserCoin()">
                        <!-- <h1>Edit My Coin</h4> -->
                        <ul>
                          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                        </ul>
                        <input v-if="isAdmin()" type="text" v-model="currentUserCoinParams.image" placeholder="image" />

                        <input v-if="isAdmin()" type="text" v-model="currentUserCoinParams.metal" placeholder="metal" />
                        <input
                          v-if="isAdmin()"
                          type="text"
                          v-model="currentUserCoinParams.description"
                          placeholder="description"
                        />
                        <input
                          v-if="isAdmin()"
                          type="text"
                          v-model="currentUserCoinParams.denomination"
                          placeholder="denomination"
                        />
                        <input v-if="isAdmin()" type="text" v-model="currentUserCoinParams.mint" placeholder="mint" />
                        <input v-if="isAdmin()" type="text" v-model="currentUserCoinParams.year" placeholder="year" />
                        <label>Own Coin?:</label>
                        <input type="text" v-model="currentUserCoinParams.status" placeholder="status" />

                        <input type="submit" v-on:click="patchUserCoin(UserCoin)" placeholder="patch" />
                        <div class="button-box">
                          <button v-on:click="destroyUserCoin()" type="submit" class="btn btn-secondary">
                            <span>Delete from List</span>
                          </button>
                        </div>
                        <!-- <input type="submit" v-on:click="destroyUserCoin(userCoin)" placeholder="password" />
                    <div class="button-box">
                      <button type="submit"><span>Delete from List</span></button>
                    </div> -->
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
    <!-- <form v-on:submit.prevent="updateUserCoin()">
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
    </form> -->
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
