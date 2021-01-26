<template>
  <div id="view">
    <Navigation />
    <div id="route-view" @click="closeMenu">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import axios from "axios";
/* eslint-disable */
import Navigation from "./components/Navigation.vue";
export default {
  name: "App",
  setup() {
    // make a call to API to change it's state from sleeping to up
    onMounted(async () => {
      let res = await axios.get(`https://todo-web-api.herokuapp.com/`);
      console.log(res);
    });
    function closeMenu() {
      // select navbar
      var navbar = document.querySelector("nav#navigation");
      // remove responsive class to close it
      if (navbar.classList.length > 1) {
        navbar.className = "navigationx2";
      }
    }
    return {
      closeMenu,
    };
  },
  components: {
    Navigation,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
#app {
  width: 100%;
  height: 100%;
}
#view {
  text-align: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  #route-view {
    width: 100%;
    height: 100%;
    z-index: 1;
    margin: auto;
    margin-top: 2rem;
    overflow-y: hidden;
    overflow-x: hidden;
  }
}
body {
  background-color: #1b4965;
  margin: 0;
  padding: 0;
  color: #f1faee;
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;
}
@media only screen and (max-width: 920px) {
  :root {
    font-size: 13px;
  }
  body {
    background-color: #1d3557;
  }
  #view {
    #route-view {
      margin-top: 5rem;
    }
  }
}
</style>
