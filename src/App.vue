<script setup>
import { ref } from "@vue/reactivity";
import AddIcon from "./components/icons/IconAdd.vue";
import ClickIcon from "./components/icons/IconClick.vue";
import RectangleItem from "./components/RectangleItem.vue";
import ContextMenu from "./components/ContextMenu.vue";
import { useKonvaStore } from "./stores/konva.js";
import { storeToRefs } from "pinia";

const store = useKonvaStore();

const connections = ref([]);
const drawingLine = ref(false);

const { configKonva, makeConnection, selectedShapeType } = storeToRefs(store);

const handleMouseDown = (e) => {
  if (!makeConnection.value) return;

  drawingLine.value = true;
  connections.value.push({
    id: Date.now(),
    points: [e.target.x(), e.target.y()],
  });
};

const handleMouseMove = (e) => {
  if (!makeConnection.value && !drawingLine.value) return;

  const pos = e.target.getStage().getPointerPosition();
  const lastLine = connections.value[connections.value.length - 1];
  lastLine.points = [lastLine.points[0], lastLine.points[1], pos.x, pos.y];
};

const handleMouseUp = (e) => {
  if (!makeConnection.value) return;

  drawingLine.value = false;
  const lastLine = connections.value[connections.value.length - 1];
  lastLine.points = [
    lastLine.points[0],
    lastLine.points[1],
    e.target.x(),
    e.target.y(),
  ];
};

const menu = ref(null);
const rightClickedElement = ref(null);

const openContextMenu = (e) => {
  rightClickedElement.value = e.target.attrs;

  const onGroup =
    e.target instanceof Konva.Rect || e.target instanceof Konva.Circle;

  if (onGroup) {
    store.selectedShapeType =
      e.target instanceof Konva.Rect ? "rectangle" : "circle";

    e.evt.preventDefault();

    menu.value.style.display = "initial";

    const pos = e.target.getStage().getRelativePointerPosition();
    menu.value.style.top = pos.y + 4 + "px";
    menu.value.style.left = pos.x + 4 + "px";
  }
};

const closeContextMenu = (e) => {
  const onStage = e.target instanceof Konva.Stage;

  if (onStage) {
    menu.value.style.display = "none";
  }
};

const removeItem = (item) => {
  item === "rectangle"
    ? store.removeRectangle()
    : store.removeCircle(rightClickedElement.value);

  menu.value.style.display = "none";
};

const addCircle = (position) => {
  store.addCircle(position);
  menu.value.style.display = "none";
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
        />
      </div>
      <p class="stage__text">
        Click ONCE to choose an object and then drag-n-drop it
      </p>
      <konva-stage
        class="stage__container"
        ref="stage"
        :config="configKonva"
        @click="closeContextMenu"
        @contextmenu="openContextMenu"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
        @mousemove="handleMouseMove"
      >
        <konva-layer ref="layer">
          <konva-arrow
            v-for="line in connections"
            :key="line.id"
            :config="{
              stroke: 'black',
              strokeWidth: 5,
              points: line.points,
            }"
          />
          <RectangleItem />
        </konva-layer>
      </konva-stage>
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
.stage__context-menu {
  display: block;
  position: absolute;
  width: 80px;
  background-color: white;
  box-shadow: 0 0 5px grey;
  border-radius: 3px;
  z-index: 9999;
}

/* .stage__context-menu--item {
  width: 100%;
  background-color: white;
  border: none;
  margin: 0;
  padding: 10px;
}
.stage__context-menu--item:hover {
  background-color: lightgray;
} */
</style>
