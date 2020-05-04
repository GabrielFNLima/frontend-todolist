<template>
  <div class="todo" :class="{ checked: todo.allComplete }">
    <div class="tile">
      <div class="tile-icon">
        <i
          class="icon icon-2x"
          :class="todo.allComplete ? 'icon-check' : 'icon-bookmark'"
        ></i>
      </div>
      <div class="tile-content">
        <h3 class="">{{ todo.title }}</h3>
      </div>
      <div class="tile-actions">
        <button @click="$emit('toggle', todo)" class="btn btn-primary">
          <span v-if="todo.allComplete">Desmarcar</span>
          <span v-else>Complete</span>
        </button>
        <button class="btn btn-error" @click="$emit('remove', todo)">
          Remove
        </button>
      </div>
    </div>
    <div class="items-list">
      <form @submit.prevent="addItem(item)">
        <div class="input-group">
          <input type="text" v-model="item.content" class="form-input" />
          <button class="btn input-group-btn">
            <i class="icon icon-arrow-right"></i>
          </button>
        </div>
      </form>

      <Items
        v-for="i in todo.todoItems"
        :key="i.id"
        :item="i"
        :todoId="todo.id"
      />
    </div>
  </div>
</template>
<script>
import Items from "@/components/Items";
export default {
  props: {
    todo: { type: Object, required: true },
  },
  components: { Items },
  data() {
    return {
      item: {},
    };
  },
  methods: {
    addItem(item) {
      this.$store.dispatch("addItem", { item, todoId: this.todo.id });
      this.item = {};
    },
  },
};
</script>
<style scoped>
.todo {
  margin-top: 1rem;
  padding: 1rem;
  box-shadow: 0 0.25rem 1rem rgba(48, 55, 66, 0.15);
}
.todo .items-list {
  margin: 15px 0 0 0;
}
.todo .items-list form {
  margin: 15px 0;
}
.tile-content {
  margin: 0 0 0 15px;
}
.tile-actions .btn,
.todo .items-list .item .tile .btn {
  margin: 0 5px;
}

.dropdown .menu {
  position: relative;
}

.checked {
  text-decoration: line-through;
  color: lightgray;
}
</style>
