<template>
  <div class="coins-edit">
    <div class="login">
      <div class="login-register-area pt-100 pb-100">
        <div class="container">
          <div class="row">
            <div class="col-lg-7 col-md-12 ms-auto me-auto">
              <div class="login-register-wrapper">
                <div class="login-register-tab-list nav">
                  <a class="active" data-bs-toggle="tab" href="#lg1"></a>
                  <h1>edit all coins</h1>
                </div>
                <div class="tab-content">
                  <div id="lg1" class="tab-pane active">
                    <div class="login-form-container">
                      <div class="login-register-form">
                        <form v-on:submit.prevent="updateCoin()">
                          <!-- <h1>Edit My Coin</h4> -->
                          <ul>
                            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                          </ul>
                          <input v-if="isAdmin()" type="text" v-model="currentCoinParams.image" placeholder="image" />

                          <input v-if="isAdmin()" type="text" v-model="currentCoinParams.metal" />

                          <input
                            v-if="isAdmin()"
                            type="text"
                            v-model="currentCoinParams.description"
                            placeholder="description"
                          />
                          <input
                            v-if="isAdmin()"
                            type="text"
                            v-model="currentCoinParams.denomination"
                            placeholder="denomination"
                          />
                          <input v-if="isAdmin()" type="text" v-model="currentCoinParams.mint" placeholder="mint" />
                          <input v-if="isAdmin()" type="text" v-model="currentCoinParams.year" placeholder="year" />
                          <!-- <label>Own Coin?:</label> -->
                          <input type="text" v-model="currentCoinParams.status" placeholder="status" />

                          <input type="submit" v-on:click="patchCoin(Coin)" placeholder="patch" />
                          <div class="button-box">
                            <button type="submit" class="btn btn-secondary"><span>Delete from Database</span></button>
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
      <input type="submit" />
      <button v-on:click="destroyCoin()">Delete Coin</button>
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
        console.log("Sadge.", response.data);
        this.$router.push("/coins");
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
