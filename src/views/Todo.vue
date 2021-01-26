<template>
  <div id="todo-app">
    <div id="todo-form">
      <h1 class="heading">Todo Galaxy</h1>
      <input
        type="text"
        placeholder="Add new todo"
        name="todo"
        id="todo"
        class="todo"
        v-model="newTodo"
        maxlength="30"
      />
      <div class="actions">
        <button
          role="button"
          class="button add"
          name="add-new-todo"
          @click="addNewTodo"
        >
          Add new todo
        </button>
        <button
          role="button"
          class="button remove"
          name="remove-all-todos"
          @click="removeAllTodos"
        >
          Remove all
        </button>
      </div>
    </div>
    <ul class="todos">
      <li class="todo" v-for="(todo, index) in todos" :key="todo._id">
        <p class="content" :class="{ done: todo.finished }">
          {{ index + 1 }}. {{ todo.content }}
        </p>
        <div class="action-buttons">
          <button
            class="mad"
            @click="() => toggleFinish(todo)"
            name="mad-button"
          >
            Toggle Done
          </button>
          <button
            class="remove"
            @click="() => removeTodo(todo._id, index)"
            name="remove-button"
          >
            Remove Todo
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios";

export default {
  name: "Todo",
  setup() {
    // newTodo is a string so -> ref('' -> String)
    const newTodo = ref("");
    // Reactive array
    const todos = ref([]);
    const userId = localStorage.getItem("id");

    onMounted(async () => {
      // get all todos in database
      let res = await axios.get(
        `https://todo-web-api.herokuapp.com/todo?userId=${userId}`
      );
      todos.value = res.data;
    });

    async function addNewTodo() {
      let todo = {
        content: newTodo.value,
        finished: false,
        userId: userId,
      };
      let res = await axios.post(
        "https://todo-web-api.herokuapp.com/todo",
        todo
      );

      todos.value.push(res.data);

      // clear todo input form
      newTodo.value = "";
    }

    // toggle finished state
    async function toggleFinish(todo) {
      // update in database
      await axios.put("https://todo-web-api.herokuapp.com/todo", {
        id: todo._id,
        finished: todo.finished,
        userId: userId,
      });
      todo.finished = !todo.finished;
    }
    // remove todo based on it's index
    async function removeTodo(todoId, index) {
      // remove todo from mongo
      await axios.delete("https://todo-web-api.herokuapp.com/todo", {
        headers: {},
        data: {
          id: todoId,
          method: "one",
          userId: userId,
        },
      });
      todos.value.splice(index, 1);
    }
    async function removeAllTodos() {
      await axios.delete("https://todo-web-api.herokuapp.com/todo", {
        headers: {},
        data: {
          method: "all",
          userId: userId,
        },
      });
      todos.value = [];
    }
    return {
      newTodo,
      todos,
      userId,
      addNewTodo,
      toggleFinish,
      removeTodo,
      removeAllTodos,
    };
  },
};
</script>

<style scoped lang="scss">
#todo-app {
  width: 100%;
  height: 100%;
  margin: auto;
  #todo-form {
    width: 100%;
    height: 30%;
    display: grid;
    gap: 1rem;
    .heading {
      color: #fca311;
      letter-spacing: 0.2rem;
      word-spacing: 0.3rem;
      font-family: "Montserrat", sans-serif;
    }
    .todo {
      width: 50%;
      font-family: "Roboto", sans-serif;
      color: #1d3557;
      padding: 0.7rem;
      font-size: 1.3rem;
      border: 1px solid #000;
      margin: auto;
      background-color: #edf2f4e7;
      outline: none;
      &::placeholder {
        color: rgba(0, 0, 0, 0.863);
        text-align: center;
      }
    }
    .actions {
      width: 50%;
      height: fit-content;
      display: flex;
      justify-content: space-evenly;
      margin: auto;
      .button {
        flex: 1;
        width: 30%;
        padding: 0.7rem;
        font-size: 1.3rem;
        transition: 0.3s ease;
        border: 1px transparent;
        border-radius: 1rem;
        margin: 1rem;
        outline: none;
        cursor: pointer;
        &.add {
          background-color: #81b29a;
        }
        &.remove {
          background-color: #e56b6f;
        }
      }
    }
  }
  .todos {
    display: grid;
    gap: 1rem;
    width: 70%;
    height: fit-content;
    margin: auto;
    .todo {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .content {
        font-size: 1.5rem;
        font-family: "Roboto", "sans-serif";
        float: left;
        &.done {
          text-decoration: line-through #e63946 2px;
        }
      }
      .action-buttons {
        width: 50%;
        height: fit-content;
        display: flex;
        justify-content: space-around;
        .mad {
          width: 50%;
          margin: 1rem;
          padding: 1rem;
          font-size: 1.3rem;
          border: 1px solid transparent;
          border-radius: 1rem;
          background-color: #81b29a;
          color: #000;
          cursor: pointer;
          outline: none;
          transition: all 0.3s ease;
        }
        .remove {
          width: 50%;
          margin: 1rem;
          padding: 1rem;
          font-size: 1.3rem;
          border: 1px solid transparent;
          border-radius: 1rem;
          background-color: #b56576;
          color: #000;
          cursor: pointer;
          outline: none;
          transition: all 0.3s ease;
        }
      }
    }
  }
}
@media only screen and (max-width: 920px) {
  :root {
    font-size: 12px;
  }
  #todo-app {
    #todo-form {
      height: 20%;
      .heading {
        font-size: 1.7rem;
      }
      .todo {
        width: 75%;
      }
      .actions {
        width: 80%;
        .button {
          &.add {
            background-color: #02c39a;
            color: #fff;
          }
          &.remove {
            background-color: #ff0a54;
            color: #fff;
          }
        }
      }
    }
    .todos {
      width: 100%;
      gap: 0.3rem;
      margin-top: 2rem;
      padding: 0;
      word-break: break-all;
      .todo {
        width: 95%;
        margin: auto;
        word-break: break-all;
        .content {
          flex: 1;
          font-size: 1.2rem;
          text-align: left;
          &.done {
            text-decoration: line-through #e63947b2 1.5px;
          }
        }
        .action-buttons {
          word-break: break-word;
          flex: 1;
          margin-left: 1rem;
          .mad {
            width: 45%;
            height: 3rem;
            margin: 0;
            padding: 0rem;
            font-size: 1rem;
            font-style: normal;
          }
          .remove {
            width: 45%;
            height: 3rem;
            margin: 0;
            padding: 0;
            font-size: 1rem;
            font-style: normal;
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 920px) {
  #todo-app {
    #todo-form {
      .heading {
      }
      .todo {
      }
      .actions {
        .button {
          &.add {
            &:hover {
              background-color: #06d6a0;
            }
          }
          &.remove {
            &:hover {
              background-color: #da1e37;
            }
          }
          &:hover {
            flex: 1.5;
          }
        }
      }
    }
    .todos {
      .todo {
      }
      .action-buttons {
        .mad {
          &:hover {
            background-color: #06d6a0;
          }
        }
        .remove {
          &:hover {
            background-color: #da1e37;
          }
        }
      }
    }
  }
}
</style>
