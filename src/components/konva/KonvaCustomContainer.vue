<script setup>
import { ref } from "@vue/reactivity";
import KonvaRectangleItem from "../konva/KonvaRectangleItem.vue";
import { useKonvaStore } from "../../stores/konva.js";
import { storeToRefs } from "pinia";
import { onMounted } from "@vue/runtime-core";

const emit = defineEmits(["openContextMenu", "closeContextMenu"]);

const store = useKonvaStore();

const { configKonva, makeConnection, rectangles, connections } =
  storeToRefs(store);

onMounted(() => {
  store.fetchItems();
});

const drawingLine = ref(false);

const startLineDrawing = (e) => {
  const onCircle = e.target instanceof Konva.Circle;

  if (makeConnection.value && onCircle) {
    const pos = e.target.getStage().getPointerPosition();

    drawingLine.value = true;
    const newConnection = {
      id: Date.now(),
      points: [pos.x, pos.y],
    };

    store.addConnection(newConnection);
  }
};

const handleLineMove = (e) => {
  if (!drawingLine.value) return;

  const pos = e.target.getStage().getPointerPosition();
  const lastLine = store.connections[store.connections.length - 1];

  lastLine.points = [lastLine.points[0], lastLine.points[1], pos.x, pos.y];
};

const endLineDrawing = (e) => {
  const onCircle = e.target instanceof Konva.Circle;

  if (makeConnection.value && onCircle) {
    const pos = e.target.getStage().getPointerPosition();

    drawingLine.value = false;

    const lastLine = store.connections[store.connections.length - 1];
    lastLine.points = [lastLine.points[0], lastLine.points[1], pos.x, pos.y];
  }
};

const openContextMenu = (e) => {
  store.rightClickedElement = e.target.attrs;

  const onGroup =
    e.target instanceof Konva.Rect || e.target instanceof Konva.Circle;

  if (onGroup) {
    store.selectedShapeType =
      e.target instanceof Konva.Rect ? "rectangle" : "circle";

    e.evt.preventDefault();

    const pos = e.target.getStage().getRelativePointerPosition();
    emit("openContextMenu", pos);
  }
};

const closeContextMenu = (e) => {
  const onStage = e.target instanceof Konva.Stage;

  if (onStage) {
    emit("closeContextMenu");
  }
};

const handleItemMove = () => {
  /* TODO: 
  - dynamically change lastLine points when object moves
  */
};
</script>

<template>
  <konva-stage
    class="stage__container"
    ref="stage"
    :config="configKonva"
    @click="closeContextMenu"
    @contextmenu="openContextMenu"
    @mousedown="startLineDrawing"
    @mouseup="endLineDrawing"
    @mousemove="handleLineMove"
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
      <KonvaRectangleItem
        @drag-move="handleItemMove"
        v-for="(target, i) in rectangles"
        :key="i"
        :target="target"
      />
    </konva-layer>
  </konva-stage>
</template>

<style></style>
