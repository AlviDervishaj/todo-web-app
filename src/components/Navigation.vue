<template>
  <nav id="navigation">
    <ul class="links">
      <li class="link home">
        <router-link class="link-text" to="/">Home</router-link>
      </li>
      <li class="link todos">
        <router-link class="link-text" to="/todos">Todos</router-link>
      </li>
      <li class="link login">
        <router-link class="link-text" to="/login">Login</router-link>
      </li>
      <li class="link signup">
        <router-link class="link-text" to="/signup">Signup</router-link>
      </li>
      <li class="link logout">
        <router-link class="link-text" @click="logoutUser" to="#">
          Logout
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { onMounted } from "vue";
export default {
  name: "Login",
  setup() {
    // remove login and signup buttons when user is logged in
    onMounted(() => {
      if (localStorage.getItem("id") && localStorage.getItem("username")) {
        const links = document.querySelector("ul.links");
        let loginLink = document.querySelector("li.link.login");
        let signupLink = document.querySelector("li.link.signup");
        // Remove login and signup links because user has already logged in
        links.removeChild(loginLink);
        links.removeChild(signupLink);
      } else {
        // Remove todo link if user is not logged in
        // Remove logout link if user is not loged in
        const links = document.querySelector("ul.links");
        const todoLink = document.querySelector("li.link.todos");
        const logoutLink = document.querySelector("li.link.logout");
        links.removeChild(todoLink);
        links.removeChild(logoutLink);
      }
    });
    function logoutUser() {
      // Remove user from localStorage
      localStorage.removeItem("username");
      localStorage.removeItem("id");
      // Redirect user to home page
      window.location = "/";
    }
    return {
      logoutUser
    };
  }
};
</script>

<style scoped lang="scss">
#navigation {
  width: 100%;
  height: fit-content;
  display: inline-block;
  margin: auto;
  background-color: #1d3557;
  .links {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .link {
      width: fit-content;
      height: fit-content;
      list-style-type: none;
      a,
      .link-text {
        font-size: 1.3rem;
        text-decoration: none;
        color: #4cc9f0;
        font-family: "Roboto", sans-serif;
        border-bottom: 2px solid transparent;
        transition: all 0.3s ease;
        padding: 0.5rem;
        padding-top: 0;
        letter-spacing: 0.2rem;
        &:hover {
          border-bottom-color: #4cc9f0;
        }
      }
      &.logout {
        display: block;
      }
    }
  }
}
</style>
