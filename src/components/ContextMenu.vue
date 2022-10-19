<script setup>
import { computed } from "@vue/runtime-core";
import { storeToRefs } from "pinia";
import { useKonvaStore } from "../stores/konva.js";

const emit = defineEmits([
  "removeRectangle",
  "removeCircle",
  "addTopCircle",
  "addRightCircle",
  "addBottomCircle",
  "addLeftCircle",
  "deleteArrow",
]);

const store = useKonvaStore();

const { selectedShapeType, selectedTarget } = storeToRefs(store);

const availableButtons = computed(() => {
  if (selectedShapeType.value === "arrow") {
    return [{ name: "Delete Arrow", active: true }];
  }

  return selectedTarget.value
    ? selectedTarget.value.menu[selectedShapeType.value]
    : [];
});

const handleSubmit = (button) => {
  if (
    selectedShapeType.value === "rectangle" &&
    button.name == "Delete Rectangle"
  ) {
    emit("removeRectangle");
  } else {
    if (button.name.includes("Add")) {
      const position = button.name.split(" ")[1];

      switch (position) {
        case "Top":
          emit("addTopCircle");
          break;
        case "Right":
          emit("addRightCircle");
          break;
        case "Bottom":
          emit("addBottomCircle");
          break;
        case "Left":
          emit("addLeftCircle");
          break;
      }
    } else if (button.name.includes("Arrow")) {
      emit("deleteArrow");
    } else {
      emit("removeCircle");
    }
  }
};
</script>

<template>
  <div
    v-for="(button, i) in availableButtons"
    :key="i"
    @click="handleSubmit(button)"
  >
    <button
      type="button"
      class="stage__context-menu--item"
      v-if="button.active"
    >
      {{ button.name }}
    </button>
  </div>
</template>

<style scoped>
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
