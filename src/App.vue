<template>
  <div id="view">
    <Navigation />
    <div id="route-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
export default {
  name: "App",
  components: {
    Navigation
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
#view {
  text-align: center;
  width: 100vw;
  height: 100vh;
  #route-view {
    z-index: 1;
  }
}
body {
  background-color: #1d3557;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
  color: #f1faee;
  width: 100vw;
  height: 100vh;
  * {
    max-width: 100%;
  }
}
</style>
