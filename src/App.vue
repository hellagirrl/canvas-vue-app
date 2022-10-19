<script setup>
import { ref } from "@vue/reactivity";
import AddIcon from "./components/icons/IconAdd.vue";
import ClickIcon from "./components/icons/IconClick.vue";
import SaveIcon from "./components/icons/IconSave.vue";
import KonvaCustomContainer from "./components/konva/KonvaCustomContainer.vue";
import ContextMenu from "./components/ContextMenu.vue";
import { useKonvaStore } from "./stores/konva.js";
import { storeToRefs } from "pinia";

const store = useKonvaStore();

const { makeConnection, rightClickedElement } = storeToRefs(store);

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
  <header class="header">
    <div class="header__navbar">
      <AddIcon class="header__navbar--link" @click="store.addRectangle()" />
      <ClickIcon
        class="header__navbar--link"
        @click="store.makeConnection = !store.makeConnection"
        :style="{ color: makeConnection ? 'blue' : 'black' }"
      />
      <SaveIcon class="header__navbar--link" @click="store.saveItems()" />
    </div>
  </header>

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
.header {
  line-height: 1.5;
  margin-top: 10px;
}
.header__navbar--link {
  margin: 10px 20px 5px 0px;
}
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
