<script setup>
import { ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
import AddIcon from "./components/icons/IconAdd.vue";
import ClickIcon from "./components/icons/IconClick.vue";

import { useKonvaStore } from "./stores/konva.js";
const store = useKonvaStore();

// imitate api call to fetch items
onMounted(() => {
  store.generateInitRectangles();
});

const group = ref(null);
const targets = computed(() => store.rectangles);
const configKonva = store.configKonva;

const connections = ref([]);
const drawingLine = ref(false);
const selectedTarget = ref(null);
const makeConnection = ref(false);

const handleMouseDown = (e) => {
  if (!makeConnection) return;
  console.log("mousedown");

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

const addRectangle = () => store.addRectangle();

const handleDragStart = (e) => {
  if (makeConnection.value) return;
};

const handleDragEnd = (e) => {
  if (makeConnection.value) return;

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
      <AddIcon class="header__navbar--link" @click="addRectangle" />
      <ClickIcon
        class="header__navbar--link"
        @click="makeConnection = !makeConnection"
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
        @touchstart.stop="handleMouseDown"
        @touchend.stop="handleMouseUp"
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

          <konva-group
            ref="group"
            class="stage__container--item"
            v-for="target in targets"
            :key="target.id"
            :config="{
              ...target.groupConfig,
              draggable: makeConnection ? false : true,
            }"
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
                stroke: selectedTarget === target ? 'blue' : 'black',
                strokeWidth: 2,
              }"
            >
            </konva-rect>
            <div v-for="(point, i) in target.points" :key="i">
              <konva-circle
                ref="circle"
                v-if="point.active"
                :config="{
                  ...point.config,
                  stroke: selectedTarget === target ? 'blue' : 'black',
                  fill: selectedTarget === target ? 'blue' : 'black',
                }"
              />
            </div>
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
}
.header__navbar--link {
  margin: 10px 20px 5px 0px;
}
.stage {
  border: 0.125rem solid black;
}
</style>
