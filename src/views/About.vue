<template>
  <div id="about">
    <h1 class="heading">About this project</h1>
    <div class="content">
      <div class="info">
        <p class="text">
          <a
            href="https://github.com/AlviDervishaj/todo-web-app"
            class="link"
            target="_blank"
            >Todo Galaxy</a
          >
          is my first completed project. It features Mobile Responsible Design,
          Database Support and
          <a class="link" target="_blank" href="https://web.dev/what-are-pwas/"
            >Progressive Web App</a
          >. This particular web app was built with
          <a
            class="link"
            target="_blank"
            href="https://v3.vuejs.org/guide/introduction.html#what-is-vue-js"
            >Vue</a
          >,
          <a class="link" target="_blank" href="https://expressjs.com/"
            >Express</a
          >
          and features
          <a class="link" target="_blank" href="https://www.mongodb.com/1"
            >Mongo</a
          >
          as it's database.
        </p>
      </div>
      <div class="contact">
        <h3 class="greetings">
          Hey, it's me ... Alvi ! 😃
        </h3>
        <p class="user-intro">
          I am the developer and maintainer of Todo Galaxy. I am always working
          on improving the website based on your feedback. I'm already working
          on new cool stuff like <em class="special-chars">*!?d</em> ,
          <em class="special-chars">@d#e!</em> ,
          <em class="special-chars">*!@@?</em> . So stay tuned and enjoy Todo
          Galaxy!
        </p>
        <p>
          If you have any questions, please don't hesitate to contact me on :
        </p>
        <div class="action-buttons">
          <a
            href="https://www.instagram.com/alvidervishaj/"
            target="_blank"
            class="instagram"
          >
            <i class="fab fa-instagram icon"></i>
            Instagram
          </a>
          <a
            href="mailto:alvidervishaj9@gmail.com"
            target="_blank"
            class="email"
          >
            <i class="far fa-envelope icon"></i>
            Email
          </a>
          <a href="https://twitter.com/WhyAlvi" target="_blank" class="twitter">
            <i class="fab fa-twitter icon"></i>
            Twitter
          </a>
          <a
            href="https://github.com/AlviDervishaj"
            target="_blank"
            class="github"
          >
            <i class="fab fa-github icon"></i>
            GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About"
};
</script>
<style lang="scss" scoped>
#about {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.3rem;
  font-family: "Roboto", sans-serif;
  float: right;
  .heading {
    font-family: "Montserrat", sans-serif;
    letter-spacing: 0.2rem;
    word-spacing: 0.3rem;
    font-size: 2rem;
    color: #fca311;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;

    .info {
      width: 50%;
      height: auto;
      word-wrap: break-word;
      line-height: 2rem;
      text-align: left;
      .text {
        font-family: "Roboto", sans-serif;
        .link {
          color: #a8dadc;
          transition: all 0.3s ease;
          text-decoration: underline 1px solid transparent;
          &:hover {
            color: #f1faee;
            text-decoration-color: #f1faee;
          }
        }
      }
    }
    .contact {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .greetings {
        font-family: "Open Sans", sans-serif;
        font-size: 1.6rem;
      }
      .user-intro {
        text-align: left;
        .special-chars {
          color: #06d6a0;
        }
      }
      .action-buttons {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        flex-direction: row;
        align-items: center;
        margin: auto;
        .instagram,
        .email,
        .twitter,
        .github {
          padding: 0.5rem;
          background-color: transparent;
          border: 1px solid transparent;
          font-size: 1.5rem;
          text-decoration: none;
          color: #a8dadc;
          transition: all 0.3s ease;
          svg.icon {
            font-size: 2rem;
            margin-right: 0.5rem;
          }
          &:hover {
            color: #e0fbfc;
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 920px) {
  #about {
    width: 77%;
  }
}
</style>
