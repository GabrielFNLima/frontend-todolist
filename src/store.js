import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import todoApi from "@/api/todoApi";

const state = {
  route: [],
  loading: false,
  fetch() {
    setTimeout(() => {
      return todoApi.get(`router/${this.route.route}`).then((r) => {
        localStorage.setItem("todoslist", JSON.stringify(r.data));
        this.route = JSON.parse(localStorage.getItem("todoslist"));
      }, 1000);
    });
  },
};

const getters = {
  todos(state) {
    return state.route.todo;
  },
  routerId(state) {
    return state.route.id;
  },
};

const actions = {
  addTodo({ commit }, todo) {
    commit("addTodo", todo);
  },
  removeTodo({ commit }, todo) {
    commit("removeTodo", todo);
  },
  completeAllItem({ commit }, todo) {
    commit("completeAllItem", todo);
  },
  get_todo: async ({ commit }, route) => {
    let { data } = await todoApi.get(`router/${route}`);
    commit("setLoading", true);
    commit("set_todo", data);
    commit("setLoading", false);
  },
  //Item
  addItem({ commit }, item) {
    commit("addItem", item);
  },
  removeItem({ commit }, item) {
    commit("removeItem", item);
  },
  completeItem({ commit }, item) {
    commit("completeItem", item);
  },
};

const mutations = {
  addTodo(state, playload) {
    todoApi
      .post("todos", {
        title: playload.title,
        routerId: state.route.id,
      })
      .then(() => {
        state.fetch();
      });
  },
  removeTodo(state, playload) {
    todoApi.delete(`todos/${playload.id}`).then(() => {
      state.fetch();
    });
  },
  completeAllItem(state, playload) {
    const index = state.route.todo.findIndex((item) => item.id === playload.id);
    if (index > -1) {
      const allComplete = !state.route.todo[index].allComplete;
      Vue.set(state.route.todo, index, {
        ...state.route.todo[index],
        allComplete,
      });
    }
    todoApi.put(`todos/${playload.id}/items`).then(() => {
      state.fetch();
    });
  },
  //Item
  addItem(state, playload) {
    const { item, todoId } = playload;
    todoApi
      .post(`todos/${todoId}/items`, {
        content: item.content,
      })
      .then(() => {
        state.fetch();
      });
  },
  removeItem(state, playload) {
    const { item, todoId } = playload;

    todoApi.delete(`todos/${todoId}/items/${item.id}`).then(() => {
      state.fetch();
    });
  },
  completeItem(state, playload) {
    const { item, todoId } = playload;

    const index = state.route.todo[0].todoItems.findIndex(
      (i) => i.id === item.id
    );
    if (index > -1) {
      const complete = !state.route.todo[0].todoItems[index].complete;
      Vue.set(state.route.todo[0].todoItems, index, {
        ...state.route.todo[0].todoItems[index],
        complete,
      });
    }
    todoApi.put(`todos/${todoId}/items/${item.id}`).then(() => {
      state.fetch();
    });
  },
  setLoading(state, playload) {
    state.loading = playload;
  },
  set_todo(state, playload) {
    state.route = playload;
  },
};

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});

export default store;
