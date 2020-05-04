<template>
  <div class="container grid-lg py-2">
    <div class="search-input">
      <h1>
        <input
          type="text"
          class="form-input"
          @change="search"
          v-model="route"
        />
      </h1>
    </div>
    <form @submit.prevent="add(todo)">
      <div class="input-group">
        <input
          type="text"
          v-model="todo.title"
          class="form-input"
          placeholder="New List"
        />
        <button class="btn">Add</button>
      </div>
    </form>
    <div v-if="loading" class="loading loading-lg"></div>
    <div v-else class="todo-list">
      <Todo
        v-for="t in todos"
        @toggle="checked"
        @remove="remove"
        @addItem="item"
        :key="t.id"
        :todo="t"
      />
    </div>
  </div>
</template>
<script>
import Todo from "@/components/Todo";

export default {
  name: "App",
  components: { Todo },
  props: ["route"],
  data() {
    return {
      todo: {},
      item: {},
    };
  },
  computed: {
    todos() {
      return this.$store.getters.todos;
    },
    routerId() {
      return this.$store.getters.routerId;
    },
    loading() {
      return this.$store.state.loading;
    },
    fetch() {
      return this.$store.getters.sync;
    },
  },
  mounted() {
    this.$store.dispatch("get_todo", this.route);
  },
  methods: {
    add(todo) {
      this.$store.dispatch("addTodo", todo);
      this.todo = {};
    },
    checked(todo) {
      this.$store.dispatch("completeAllItem", todo);
    },
    remove(todo) {
      this.$store.dispatch("removeTodo", todo);
    },
    search() {
      this.$store.dispatch("get_todo", this.route);
      this.$router.push(this.route);
    },
  },
};
</script>
<style scoped>
form .input-group .btn {
  margin: 0 0 0 15px;
}
.loading {
  margin-top: 35px;
}
h1 {
  text-align: center;
}
.search-input .form-input {
  font-size: 2rem;
  border: 0;
  text-align: center;
  text-transform: uppercase;
}
.search-input {
  margin: 25px 0 0 0;
}
.search-input .form-input:focus {
  border: 0;
  box-shadow: none;
}
</style>
