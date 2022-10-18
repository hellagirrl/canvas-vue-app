<script setup>
import { computed, onMounted } from "@vue/runtime-core";
import { storeToRefs } from "pinia";
import { useKonvaStore } from "../stores/konva.js";

const emit = defineEmits(["removeRectangle", "removeCircle"]);

const store = useKonvaStore();

const { menuButtons, selectedShapeType } = storeToRefs(store);

const availableButtons = computed(
  () => menuButtons.value[selectedShapeType.value]
);

const handleSubmit = () => {
  selectedShapeType.value === "rectangle"
    ? emit("removeRectangle")
    : emit("removeCircle");
};
// check if a circle is not active and then set the button name
</script>

<template>
  <div>
    <button
      type="button"
      class="stage__context-menu--item"
      v-for="(button, i) in availableButtons"
      :key="i"
      @click="handleSubmit"
    >
      <p v-if="button.active">{{ button.name }}</p>
    </button>
  </div>
</template>

<style>
.stage__context-menu--item {
  width: 100%;
  background-color: white;
  border: none;
  margin: 0;
  padding: 10px;
}
.stage__context-menu--item:hover {
  background-color: lightgray;
}
</style>
