<script setup>
import { useKonvaStore } from "../stores/konva";
import { ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
import { storeToRefs } from "pinia";

const store = useKonvaStore();
const {
  makeConnection,
  rectangles: targets,
  selectedTarget,
} = storeToRefs(store);

onMounted(() => {
  store.generateInitRectangles();
});

const handleDragStart = (e) => {
  if (makeConnection.value) return;
  console.log("dragstart");
};

const handleDragEnd = (e) => {
  if (makeConnection.value) return;
  console.log("dragend");

  const elementToUpdate = targets.value.findIndex(
    (target) => target.id === selectedTarget.value.id
  );
  const groupAxis = targets.value[elementToUpdate].groupConfig;
  groupAxis.x = e.target.x();
  groupAxis.y = e.target.y();
};
</script>

<template>
  <konva-group
    ref="group"
    class="stage__container--item"
    v-for="target in targets"
    :key="target.id"
    :config="{
      ...target.groupConfig,
      draggable: makeConnection ? false : true,
    }"
    @click="store.selectedTarget = target"
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
</template>

<style scoped></style>
