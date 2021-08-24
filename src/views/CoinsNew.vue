<template>
  <div class="coins-new">
    <div class="coins-edit">
      <div class="login">
        <div class="login-register-area pt-100 pb-100">
          <div class="container">
            <div class="row">
              <div class="col-lg-7 col-md-12 ms-auto me-auto">
                <div class="login-register-wrapper">
                  <div class="login-register-tab-list nav">
                    <a class="active" data-bs-toggle="tab" href="#lg1"></a>
                    <h1>add new coin</h1>
                  </div>
                  <div class="tab-content">
                    <div id="lg1" class="tab-pane active">
                      <div class="login-form-container">
                        <div class="login-register-form">
                          <form v-on:submit.prevent="createCoin()">
                            <!-- <h1>Edit My Coin</h4> -->
                            <ul>
                              <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                            </ul>
                            <input v-if="isAdmin()" type="text" v-model="newCoinParams.image" placeholder="image" />

                            <input v-if="isAdmin()" type="text" v-model="newCoinParams.metal" placeholder="metal" />

                            <input
                              v-if="isAdmin()"
                              type="text"
                              v-model="newCoinParams.description"
                              placeholder="description"
                            />
                            <input
                              v-if="isAdmin()"
                              type="text"
                              v-model="newCoinParams.denomination"
                              placeholder="denomination"
                            />
                            <input v-if="isAdmin()" type="text" v-model="newCoinParams.mint" placeholder="mint" />
                            <input v-if="isAdmin()" type="text" v-model="newCoinParams.year" placeholder="year" />
                            <!-- <label>Own Coin?:</label> -->
                            <input type="text" v-model="newCoinParams.status" placeholder="status" />

                            <input type="submit" v-on:click="patchCoin(Coin)" placeholder="patch" />
                            <div class="button-box">
                              <button type="submit" class="btn btn-secondary"><span>Add to Database</span></button>
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

      <!-- <form v-on:submit.prevent="updateCoin()">
        <h1>Add Coin</h1>
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
      </form> -->
    </div>
    <!-- <div class="login">
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
    </div> -->
    <img v-if="status" :src="`https://http.cat/${status}`" />
    <!-- <form v-on:submit.prevent="createCoin()">
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
    </form> -->
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
