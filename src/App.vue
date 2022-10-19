<script setup>
import { ref } from "@vue/reactivity";
import TheHeader from "./components/base/TheHeader.vue";
import KonvaCustomContainer from "./components/konva/KonvaCustomContainer.vue";
import ContextMenu from "./components/ContextMenu.vue";
import { useKonvaStore } from "./stores/konva.js";
import { storeToRefs } from "pinia";

const store = useKonvaStore();

const { rightClickedElement } = storeToRefs(store);

const menu = ref(null);
const showMenu = (pos) => {
  menu.value.style.display = "initial";
  menu.value.style.top = pos.y + 4 + "px";
  menu.value.style.left = pos.x + 4 + "px";
};

const hideMenu = () => {
  menu.value.style.display = "none";
};

const removeItem = (item) => {
  item === "rectangle"
    ? store.removeRectangle()
    : store.removeCircle(rightClickedElement.value);

  hideMenu();
};

const addCircle = (position) => {
  store.addCircle(position);
  hideMenu();
};

const deleteArrow = () => {
  store.removeConnection();
  hideMenu();
};
</script>

<template>
  <TheHeader />

  <main>
    <div class="stage">
      <div ref="menu" class="stage__context-menu">
        <ContextMenu
          @remove-rectangle="removeItem('rectangle')"
          @remove-circle="removeItem('circle')"
          @add-top-circle="addCircle('top')"
          @add-right-circle="addCircle('right')"
          @add-bottom-circle="addCircle('bottom')"
          @add-left-circle="addCircle('left')"
          @delete-arrow="deleteArrow()"
        />
      </div>
      <p class="stage__text">
        Click ONCE to choose an object and then drag-n-drop it
      </p>
      <KonvaCustomContainer
        @open-context-menu="showMenu"
        @close-context-menu="hideMenu"
      />
    </div>
  </main>
</template>

<style scoped>
.stage {
  border: 0.125rem solid black;
}
.stage__text {
  padding-left: 5px;
}
.stage__context-menu {
  display: block;
  position: absolute;
  width: 80px;
  background-color: white;
  box-shadow: 0 0 5px grey;
  border-radius: 3px;
  z-index: 9999;
}
</style>
