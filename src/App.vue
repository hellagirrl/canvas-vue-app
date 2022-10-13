<script setup>
import { reactive, ref } from "@vue/reactivity";
import TheWelcome from "./components/TheWelcome.vue";
import AddIcon from "./components/icons/IconAdd.vue";

const width = 1000;
const height = 800;
const startX = 40;
const startY = 40;

const rectSize = 100;

const configKonva = reactive({
  width: width,
  height: height,
});

const targets = ref([
  {
    x: startX,
    y: startY,
    id: Date.now(),
  },
  {
    x: startX + 200,
    y: startY + 200,
    id: Date.now(),
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
  const onRect = e.target instanceof Konva.Rect;
  if (!onRect) {
    return;
  }
  drawningLine.value = true;
  connections.value.push({
    id: Date.now(),
    points: [e.target.x() + 100, e.target.y() + 100],
  });
};

const handleMouseUp = (e) => {
  const onRect = e.target instanceof Konva.Rect;
  if (!onRect) {
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
</script>

<template>
  <header>
    <div class="wrapper">
      <AddIcon />
    </div>
  </header>

  <main>
    <!-- <TheWelcome /> -->
    <konva-stage
      ref="stage"
      class="container"
      :config="configKonva"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mousemove="handleMouseMove"
      @touchstart.stop="handleMouseDown"
      @touchend.stop="handleMouseUp"
    >
      <konva-layer ref="layer">
        <konva-line
          v-for="line in connections"
          :key="line.id"
          :config="{
            stroke: 'black',
            strokeWidth: 5,
            points: line.points,
          }"
        />
        <div class="rectangle-item" v-for="target in targets" :key="target.id">
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
        </div>
      </konva-layer>
    </konva-stage>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  margin-top: 10px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

header {
  display: flex;
}

.logo {
  margin: 0 2rem 0 0;
}

header .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}
</style>
