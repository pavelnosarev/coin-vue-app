<template>
  <div class="signup">
    <div class="login-register-area pt-100 pb-100">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 col-md-12 ms-auto me-auto">
            <div class="login-register-wrapper">
              <div class="login-register-tab-list nav">
                <a class="active" data-bs-toggle="tab" href="#lg1">
                  <h1>signup</h1>
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
                        <input type="username" v-model="newUserParams.username" placeholder="username" />
                        <small>{{ 20 - newUserParams.username.length }} characters remaining</small>
                        <input type="email" v-model="newUserParams.email" placeholder="email" />

                        <input type="password" v-model="newUserParams.password" placeholder="password" />
                        <small
                          v-if="newUserParams.password.length > 0 && newUserParams.password.length < 6"
                          class="text-danger"
                        >
                          Password must be 6 characters
                        </small>
                        <small v-if="newUserParams.password.length > 20" class="text-danger">
                          Password cannot exceed 20 characters
                        </small>
                        <input
                          type="password"
                          v-model="newUserParams.password_confirmation"
                          placeholder=" password confirmation"
                        />
                        <small
                          v-if="newUserParams.password_confirmation !== newUserParams.password"
                          class="text-danger"
                        >
                          Must match password!
                        </small>
                        <div class="button-box">
                          <button type="submit"><span>create</span></button>
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
    <!-- <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Username:</label>
        <input type="text" v-model="newUserParams.username" />
        <small>{{ 20 - newUserParams.username.length }} characters remaining</small>
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="newUserParams.email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="newUserParams.password" />
        <small v-if="newUserParams.password.length > 0 && newUserParams.password.length < 6" class="text-danger">
          Password must be 6 characters
        </small>
        <small v-if="newUserParams.password.length > 20" class="text-danger">
          Password cannot exceed 20 characters
        </small>
      </div>
      <div>
        <label>Password confirmation:</label>
        <input type="password" v-model="newUserParams.password_confirmation" />
        <small v-if="newUserParams.password_confirmation !== newUserParams.password" class="text-danger">
          Must match password!
        </small>
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
      newUserParams: { username: "", password: "", password_confirmation: "" },
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
'
