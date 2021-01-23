<template>
  <div id="home">
    <h1 class="heading">Not logged in !</h1>
    <p class="content">Please log in to access and create todos</p>
  </div>
</template>

<script>
import { onMounted } from "vue";
import axios from "axios";
export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      // check if user is logged in
      if (localStorage.getItem("username") && localStorage.getItem("id")) {
        const user = {
          username: localStorage.getItem("username"),
          id: localStorage.getItem("id")
        };
        const heading = document.querySelector("h1.heading");
        heading.innerText = `Welcome ${user.username} 🥳`;
        const content = document.querySelector("p.content");
        content.innerText =
          "Click 'Todos' in the navigation bar and start creating your todos :)";
        // Make a request to API
        // to change it's state from Sleeping to Up
        await axios.get("https://todo-web-api.herokuapp.com/");
      }
    });
    return {};
  }
};
</script>

<style scoped lang="scss">
#home {
  width: 100%;
  height: 100%;
  .heading {
    font-family: "Montserrat", sans-serif;
    letter-spacing: 0.2rem;
    word-spacing: 0.3rem;
    color: #fca311;
  }
  .content {
    letter-spacing: 0.1rem;
    word-spacing: 0.15rem;
    font-size: 1.5rem;
    font-family: "Roboto", sans-serif;
  }
}
</style>
