<script setup>
import { useKonvaStore } from "../stores/konva";
import { ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";

const store = useKonvaStore();

onMounted(() => {
  store.generateInitRectangles();
});

const targets = computed(() => store.rectangles);
const selectedTarget = ref(null);

const makeConnection = computed(() => store.makeConnection);

const handleDragStart = (e) => {
  if (makeConnection) return;
  console.log("dragstart");
};

const handleDragEnd = (e) => {
  if (makeConnection) return;
  console.log("dragend");

  const elementToUpdate = targets.value.findIndex(
    (target) => target.id === selectedTarget.value.id
  );
  const group = targets.value[elementToUpdate].groupConfig;
  group.x = e.target.x();
  group.y = e.target.y();
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
</template>

<style></style>
