<template>
  <div id="signup">
    <h1 class="heading">Create an account</h1>
    <form
      method="post"
      @submit.prevent="signupUser"
      name="signup-form"
      id="signup-form"
    >
      <div class="input-component">
        <i class="fas fa-user icons"></i>
        <input
          type="text"
          class="input username"
          id="username"
          placeholder="Username"
          v-model="username"
        />
      </div>
      <div class="input-component">
        <i class="fas fa-at icons"></i>
        <input
          type="email"
          class="input email"
          id="email"
          placeholder="Email"
          v-model="email"
        />
      </div>
      <div class="input-component">
        <i class="fas fa-key icons"></i>
        <input
          type="password"
          class="input password"
          id="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <button type="submit" role="button" class="button" id="submit-signup">
        Sign Up
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { sha256 } from "js-sha256";
export default {
  name: "Signup",
  setup() {
    const username = ref("");
    const password = ref("");
    const email = ref("");
    async function signupUser() {
      if (username.value && password.value) {
        let user = {
          username: username.value,
          password: sha256(password.value),
          email: email.value
        };
        let res = await axios.post(
          "https://todo-web-api.herokuapp.com/user",
          user
        );
        sessionStorage.setItem("username", res.data.username);
        sessionStorage.setItem("id", res.data._id);
        window.location.href = "/";
      }
    }
    return {
      username,
      password,
      email,
      signupUser
    };
  }
};
</script>

<style scoped lang="scss">
#signup {
  width: 100%;
  height: 100%;
  display: inline-block;
  margin-top: 1.5rem;
  .heading {
    color: #fca311;
    letter-spacing: 0.2rem;
    word-spacing: 0.3rem;
    font-family: "Montserrat", sans-serif;
  }
  #signup-form {
    width: 100%;
    height: 100%;
    margin-top: 3rem;
    display: grid;
    gap: 3rem;
    .input-component {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      margin: auto;
      .icons {
        flex: 1;
        font-size: 1.5rem;
        color: #001427;
        padding: 1rem;
        background-color: #8d99ae;
        border: none;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      .input {
        flex: 10;
        width: 20%;
        height: fit-content;
        margin: auto;
        font-size: 1.3rem;
        padding: 1rem;
        background-color: #edf2f4;
        border: none;
        outline: none;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        &::placeholder {
          color: #6c757d;
        }
      }
    }
    .button {
      width: 25%;
      height: fit-content;
      margin: auto;
      font-size: 1.3rem;
      padding: 1rem;
      background-color: #06d6a0;
      color: #2b2d42;
      border: none;
      outline: none;
      transition: background-color 0.3s ease;
      cursor: pointer;
      &:not(:hover) {
        background-color: #2a9d8f;
      }
    }
  }
}
</style>
