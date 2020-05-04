<template>
  <div class="item">
    <div class="tile" :class="{ checked: item.complete }">
      <div class="tile-icon">
        <i
          class="icon"
          :class="item.complete ? 'icon-check' : 'icon-minus'"
        ></i>
      </div>
      <div class="tile-content">
        <h3 class="">{{ item.content }}</h3>
      </div>
      <div class="tile-actions">
        <button class="btn btn-primary" @click="completeItem(item)">
          <span v-if="item.complete">Desmarcar</span>
          <span v-else>Complete</span>
        </button>
        <button class="btn btn-error" @click="removeItem(item)">Remove</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: { type: Object, required: true },
    todoId: { type: Number, required: true },
  },
  methods: {
    removeItem(item) {
      this.$store.dispatch("removeItem", { item, todoId: this.todoId });
    },
    completeItem(item) {
      this.$store.dispatch("completeItem", { item, todoId: this.todoId });
    },
  },
};
</script>
<style scoped>
.item {
  margin: 20px 0 0 0;
}
.checked {
  text-decoration: line-through;
  color: lightgray;
}
</style>
