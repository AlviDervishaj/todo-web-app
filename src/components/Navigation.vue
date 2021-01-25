<template>
  <nav id="navigation" class="navigationx2">
    <ul class="links">
      <li class="link li-bars">
        <router-link class="link-item" to="#" @click="toggleMenu">
          <i class="fas fa-bars bars icon"></i>
          <span class="link-text">Navbar</span>
        </router-link>
      </li>
      <li class="link home">
        <router-link class="link-item" @click="closeMenu" to="/"
          ><i class="fas fa-home icon"></i>
          <span class="link-text">Home</span></router-link
        >
      </li>
      <li class="link about">
        <router-link class="link-item" @click="closeMenu" to="/about"
          ><i class="fas fa-info-circle icon"></i>
          <span class="link-text">About</span></router-link
        >
      </li>
      <li class="link todos">
        <router-link class="link-item" @click="closeMenu" to="/todos"
          ><i class="fas fa-list-ol icon"></i>
          <span class="link-text">Todos</span>
        </router-link>
      </li>
      <li class="link login">
        <router-link class="link-item" @click="closeMenu" to="/login"
          ><i class="fas fa-sign-in-alt icon"></i>
          <span class="link-text">Login</span>
        </router-link>
      </li>
      <li class="link signup">
        <router-link class="link-item" @click="closeMenu" to="/signup"
          ><i class="fas fa-user-plus icon"></i>
          <span class="link-text">Signup</span>
        </router-link>
      </li>
      <li class="link logout">
        <router-link class="link-item" @click="logoutUser" to="#">
          <i class="fas fa-sign-out-alt icon"></i>
          <span class="link-text">Logout</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
/* eslint-disable */
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
      closeMenu;
    }
    // Toggle Navbar when Bars Icon is clicked
    function toggleMenu() {
      var navbar = document.querySelector("nav#navigation");
      if (navbar.className === "navigationx2") {
        navbar.className += " responsive";
      } else {
        navbar.className = "navigationx2";
      }
    }
    // Close navbar when user clicks on links ???? or out of navbar ????
    function closeMenu() {
      // select navbar
      var navbar = document.querySelector("nav#navigation");
      // remove responsive class
      navbar.className = "navigationx2";
    }
    return {
      logoutUser,
      toggleMenu,
      closeMenu,
    };
  },
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
    padding: 0;
    .link {
      width: fit-content;
      height: fit-content;
      list-style-type: none;
      text-align: center;
      .link-item {
        .icon {
          display: none;
        }
        height: 2rem;
        color: #4cc9f0;
        text-decoration: none;
        padding: 0.5rem;
        transition: all 0.3s ease;
        letter-spacing: 0.2rem;
        border-bottom: 2px solid transparent;
        .link-text {
          text-decoration: none;
          color: inherit;
          font-family: "Montserrat", sans-serif;
          font-size: 1.2rem;
        }
      }
    }
  }
}
/*Small Screens */
@media only screen and (max-width: 920px) {
  :root {
    font-size: 14px;
  }
  #navigation {
    position: absolute;
    top: 1.7rem;
    left: 0;
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 200ms ease;
    float: left;
    &.responsive {
      position: absolute;
      left: 0;
      top: 0;
      padding-bottom: 10rem;
      width: 12rem;
      height: 100%;
      margin: 0;
      background-color: #13293d;
      .links {
        .link {
          &.home,
          &.about,
          &.todos,
          &.login,
          &.signup,
          &.logout {
            display: block;
          }
          &:last-child {
            margin-bottom: 3rem;
          }
          &.li-bars {
            display: inline;
            margin-bottom: auto;
          }

          .link-item {
            .icon {
              margin-right: 2rem;
            }
            .link-text {
              display: block;
              color: #fff;
            }
          }
        }
      }
    }
    .links {
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      .link {
        width: 100%;
        margin: 1rem 0;
        &.home,
        &.about,
        &.todos,
        &.login,
        &.signup,
        &.logout {
          display: none;
        }
        .link-item {
          display: flex;
          align-items: flex-end;
          transition: filter 200ms ease;
          .icon {
            display: inline;
            font-size: 2rem;
            margin: 0 0.5rem;
            color: #9d4edd;
          }
          .link-text {
            display: none;
          }
          &:hover {
            filter: grayscale(0%) opacity(1);
          }
        }
        &.logout {
          margin-top: auto;
        }
        &.li-bars {
          margin-bottom: auto;
        }
      }
    }
  }
}
/*Large Screens */
@media only screen and (min-width: 920px) {
  :root {
    font-size: 16px;
  }
  #navigation {
    .links {
      .link {
        &.li-bars {
          display: none;
        }
        .link-item {
          &:hover {
            border-bottom-color: #4cc9f0;
          }
        }
        &.logout {
          display: block;
        }
        &.li-bars {
          display: none;
        }
      }
    }
  }
}
</style>
