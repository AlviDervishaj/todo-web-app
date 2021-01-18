<template>
  <div id="todo-app">
    <div id="todo-form">
      <h1 class="heading">Todos</h1>
      <input
        type="text"
        placeholder="Add new todo"
        name="todo"
        id="todo"
        class="todo"
        v-model="newTodo"
        maxlength="60"
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
            <h2>Toggle Done</h2>
          </button>
          <button
            class="remove"
            @click="() => removeTodo(todo._id, index)"
            name="remove-button"
          >
            <h2>Remove Todo</h2>
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
        userId: userId
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
        userId: userId
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
          userId: userId
        }
      });
      todos.value.splice(index, 1);
    }
    async function removeAllTodos() {
      await axios.delete("https://todo-web-api.herokuapp.com/todo", {
        headers: {},
        data: {
          method: "all",
          userId: userId
        }
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
      removeAllTodos
    };
  }
};
</script>

<style scoped lang="scss">
#todo-app {
  width: 100%;
  height: 100%;
  margin: 0.7rem auto;
  #todo-form {
    width: 100%;
    height: 100%;
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
      height: 100%;
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
          &:hover {
            background-color: #06d6a0;
          }
        }
        &.remove {
          background-color: #e56b6f;
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
      }
      .content.done {
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
        margin: 0.5rem;
        border: 1px solid transparent;
        border-radius: 1rem;
        background-color: #81b29a;
        color: #000;
        cursor: pointer;
        outline: none;
        transition: all 0.3s ease;
        &:hover {
          background-color: #06d6a0;
        }
      }
      .remove {
        width: 50%;
        margin: 0.5rem;
        border: 1px solid transparent;
        border-radius: 1rem;
        background-color: #b56576;
        color: #000;
        cursor: pointer;
        outline: none;
        transition: all 0.3s ease;
        &:hover {
          background-color: #da1e37;
        }
      }
    }
  }
}
</style>
