<script setup>
import { ref } from "@vue/reactivity";
import AddIcon from "./components/icons/IconAdd.vue";

const width = 1000;
const height = 800;
const startX = 40;
const startY = 40;

const rectSize = 100;

const configKonva = {
  width: width,
  height: height,
};
const targets = ref([
  {
    x: startX,
    y: startY,
    id: Date.now(),
    groupConfig: {
      draggable: true,
      x: startX,
      y: startY,
    },
  },
  {
    x: startX + 200,
    y: startX + 200,
    id: Date.now() + 1,
    groupConfig: {
      draggable: true,
      x: startX + 200,
      y: startX + 200,
    },
  },
]);

const changeCirclePosition = (target, axis, index) => {
  if (axis === "x") {
    switch (index) {
      case 1:
        return target.x + rectSize / 2;
      case 2:
        return target.x + 12 + rectSize;
      case 3:
        return target.x + rectSize / 2;
      case 4:
        return target.x - 12;
    }
  } else {
    switch (index) {
      case 1:
        return target.y - 12;
      case 2:
        return target.y + rectSize / 2;
      case 3:
        return target.y + 12 + rectSize;
      case 4:
        return target.y + rectSize / 2;
    }
  }
};

const connections = ref([]);
const drawningLine = ref(false);

const handleMouseDown = (e) => {
  const onCircle = e.target instanceof Konva.Circle;
  if (!onCircle) {
    return;
  }
  drawningLine.value = true;
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
  drawningLine.value = false;
  const lastLine = connections.value[connections.value.length - 1];
  lastLine.points = [
    lastLine.points[0],
    lastLine.points[1],
    e.target.x(),
    e.target.y(),
  ];
};

const handleMouseMove = (e) => {
  if (!drawningLine.value) {
    return;
  }
  const pos = e.target.getStage().getPointerPosition();
  const lastLine = connections.value[connections.value.length - 1];
  lastLine.points = [lastLine.points[0], lastLine.points[1], pos.x, pos.y];
};

const selectedTarget = ref(null);

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
          <div
            class="stage__container--item"
            v-for="target in targets"
            :key="target.id"
          >
            <konva-group
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
                v-for="i in 4"
                :key="i"
                :config="{
                  x: changeCirclePosition(target, 'x', i),
                  y: changeCirclePosition(target, 'y', i),
                  width: 20,
                  height: 20,
                  stroke: 'black',
                  fill: 'black',
                  strokeWidth: 4,
                }"
              />
            </konva-group>
          </div>
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
