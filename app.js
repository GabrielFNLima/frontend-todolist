const STORAGE_KEY = "app-todo-list";

const instance = axios.create({
  baseURL: "http://localhost:4000/api/",
});

const api = {
  get() {
    instance.get("todos").then((r) => {
      this.todos = r.data;
    });
  },
};

const todoStorage = {
  fetch() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};
const app = new Vue({
  el: "#app",
  data: {
    title: "hello!",
    newTodo: "",
    newItem: "",
    todos: [],
  },
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos);
      },
    },
  },
  methods: {
    getAll() {
      this.todos = todoStorage.fetch();
    },
    addTodo() {
      var value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      instance
        .post("todos", {
          title: value,
        })
        .then(() => {
          instance.get("todos").then((r) => {
            this.todos = r.data;
          });
        });
      this.newTodo = "";
    },
    removeTodo(todo) {
      instance.delete(`todos/${todo.id}`).then(() => {
        instance.get("todos").then((r) => {
          this.todos = r.data;
        });
      });
    },
    allDone() {
      this.todos.forEach((todo) => {
        todo.done = true;
        todoStorage.save(this.todos);
      });
      todoStorage.save(this.todos);
    },
    allCheckedTodo(todo) {
      instance.put(`todos/${todo.id}/items`).then((res) => {});
      instance.get("todos").then((r) => {
        this.todos = r.data;
      });
    },
    removeItem(date) {
      const { data } = date;
      instance
        .delete(`todos/${data.todo.id}/items/${data.item.id}`)
        .then(() => {
          instance.get("todos").then((r) => {
            this.todos = r.data;
          });
        });
    },
    addItem(todo) {
      instance
        .post(`todos/${todo.id}/items`, {
          content: this.newItem,
        })
        .then(() => {
          instance.get("todos").then((r) => {
            this.todos = r.data;
          });
          this.newItem = "";
        });
    },
  },
  mounted() {
    this.getAll();
    instance.get("todos").then((r) => {
      this.todos = r.data;
    });
  },
});
