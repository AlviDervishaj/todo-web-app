<template>
  <div id="login">
    <h1 class="heading">Login to your account</h1>
    <form
      method="post"
      @submit.prevent="loginUser"
      name="login"
      id="login-form"
    >
      <div class="input-component">
        <i class="fas fa-user icons"></i>
        <input
          type="text"
          class="input"
          id="username"
          placeholder="Username"
          v-model="username"
        />
      </div>
      <div class="input-component">
        <i class="fas fa-key icons"></i>
        <input
          type="password"
          class="input"
          id="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <button type="submit" role="button" class="button" id="submit-login">
        Log In
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { sha256 } from "js-sha256";
export default {
  name: "Login",
  setup() {
    const username = ref("");
    const password = ref("");
    async function loginUser() {
      if (username.value && password.value) {
        let _password = sha256(password.value);
        let _username = username.value;
        let res = await axios.get(
          `https://todo-web-api.herokuapp.com/user?username=${_username}`
        );
        console.log(res);
        if (res.data[0].password == _password) {
          // log user in
          localStorage.setItem("username", res.data[0].username);
          localStorage.setItem("id", res.data[0]._id);
          window.location.href = "/";
        } else {
          // show error to user
          // eslint-disable-next-line
          console.log("No user found !");
        }
      }
    }
    return {
      username,
      password,
      loginUser
    };
  }
};
</script>

<style scoped lang="scss">
#login {
  width: 100%;
  height: 100%;
  display: inline-block;
  margin-top: 1.5rem;
  .heading {
    color: #fca311;
    letter-spacing: 0.2rem;
    word-spacing: 0.3rem;
    font-family: "Montserrat", sans-serif;
    padding: 1rem;
  }
  #login-form {
    width: 100%;
    height: 100%;
    margin: 3rem auto;
    display: grid;
    gap: 4rem;
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
