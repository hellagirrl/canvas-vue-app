<script setup>
import { ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
import AddIcon from "./components/icons/IconAdd.vue";

import { useKonvaStore } from "./stores/konva.js";
const store = useKonvaStore();

// imitate api call to fetch items
onMounted(() => {
  store.generateInitRectangles();
});

const targets = computed(() => store.rectangles);
const configKonva = store.configKonva;

const connections = ref([]);
const drawingLine = ref(false);
const selectedTarget = ref(null);

const handleMouseDown = (e) => {
  const onCircle = e.target instanceof Konva.Circle;
  if (!onCircle) {
    return;
  }
  drawingLine.value = true;
  connections.value.push({
    id: Date.now(),
    points: [e.target.x(), e.target.y()],
  });
};

const handleMouseUp = (e) => {
  const onCircle = e.target instanceof Konva.Circle;
  if (!onCircle) {
    return;
  }
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
  if (!drawingLine.value) {
    return;
  }
  const pos = e.target.getStage().getPointerPosition();
  const lastLine = connections.value[connections.value.length - 1];
  lastLine.points = [lastLine.points[0], lastLine.points[1], pos.x, pos.y];
};

const handleDragStart = (e) => {};

const handleDragEnd = (e) => {
  const elementToUpdate = targets.value.findIndex(
    (target) => target.id === selectedTarget.value.id
  );
  const group = targets.value[elementToUpdate].groupConfig;
  group.x = e.target.x();
  group.y = e.target.y();
};
</script>

<template>
  <header class="header">
    <div class="header__navbar">
      <AddIcon />
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
        @touchstart.stop="handleMouseDown"
        @touchend.stop="handleMouseUp"
      >
        <konva-layer ref="layer ">
          <konva-arrow
            v-for="line in connections"
            :key="line.id"
            :config="{
              stroke: 'black',
              strokeWidth: 5,
              points: line.points,
            }"
          />

          <konva-group
            class="stage__container--item"
            v-for="target in targets"
            :key="target.id"
            :config="target.groupConfig"
            @click="selectedTarget = target"
            @dragstart="handleDragStart"
            @dragend="handleDragEnd"
          >
            <konva-rect
              ref="rect"
              :config="{
                x: target.x,
                y: target.y,
                width: 100,
                height: 100,
                stroke: 'black',
                strokeWidth: 2,
              }"
            >
            </konva-rect>
            <konva-circle
              ref="circle"
              v-for="(point, i) in target.points"
              :key="i"
              :config="point"
            />
          </konva-group>
        </konva-layer>
      </konva-stage>
    </div>
  </main>
</template>

<style scoped>
.header {
  line-height: 1.5;
  margin-top: 10px;
  display: flex;
}

.header .header__navbar {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}

.stage {
  border: 0.125rem solid black;
}
</style>
