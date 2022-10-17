<script setup>
import { ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
import AddIcon from "./components/icons/IconAdd.vue";
import ClickIcon from "./components/icons/IconClick.vue";
import RectangleItem from "./components/RectangleItem.vue";
import { useKonvaStore } from "./stores/konva.js";
import { storeToRefs } from "pinia";

const store = useKonvaStore();

const connections = ref([]);
const drawingLine = ref(false);

const addRectangle = () => store.addRectangle();

const { configKonva, makeConnection } = storeToRefs(store);

const changeConnectionState = () => {
  store.makeConnection = !store.makeConnection;
};

const handleMouseDown = (e) => {
  if (!makeConnection.value) return;

  drawingLine.value = true;
  connections.value.push({
    id: Date.now(),
    points: [e.target.x(), e.target.y()],
  });
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

const handleMouseMove = (e) => {
  if (!makeConnection.value && !drawingLine.value) return;

  const pos = e.target.getStage().getPointerPosition();
  const lastLine = connections.value[connections.value.length - 1];
  lastLine.points = [lastLine.points[0], lastLine.points[1], pos.x, pos.y];
};
</script>

<template>
  <header class="header">
    <div class="header__navbar">
      <AddIcon class="header__navbar--link" @click="addRectangle" />
      <ClickIcon
        class="header__navbar--link"
        @click="changeConnectionState"
        :style="{ color: makeConnection ? 'blue' : 'black' }"
      />
    </div>
  </header>

  <main>
    <div class="stage">
      <p class="stage__text">
        Click ONCE to choose an object and then drag-n-drop it
      </p>
      <konva-stage
        class="stage__container"
        ref="stage"
        :config="configKonva"
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
</style>
