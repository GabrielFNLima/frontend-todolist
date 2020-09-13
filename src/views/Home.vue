<template>
  <div class="container grid-lg">
    <div class="intro">
      <h1>TodoList</h1>
      <div class="justGo">
        <span>www.todolist.com/</span>
        <form @submit.prevent="justGo">
          <input type="text" class="form-input" v-model="route" />
          <button class="btn input-group-btn">
            GO!
          </button>
        </form>
      </div>
      <div id="text">
        Dont login, just use a URL<br />
        Dont save, todo is auto-saved<br />
        TodoList!<br />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      route: "",
    };
  },
  methods: {
    justGo() {
      this.$router.push(this.route);
    },
  },
};
</script>
<style scoped>
.intro {
  max-width: 400px;
  margin: 55px auto;
}
.intro h1 {
  text-align: center;
  text-transform: uppercase;
  font-size: 35px;
}
.justGo {
  display: flex;
  justify-content: center;
  font-size: 20px;
}
.justGo form {
  display: inherit;
}
#text {
  margin: 55px 0 0 0;
  font-size: 18px;
}
@media (max-width: 375px) {
  .justGo {
    font-size: 18px;
  }
}
</style>
