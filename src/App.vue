<script setup>
import { reactive } from "@vue/reactivity";
import TheWelcome from "./components/TheWelcome.vue";
import AddIcon from "./components/icons/IconAdd.vue";

const width = window.innerWidth;
const height = window.innerHeight;

const configKonva = reactive({
  width: width,
  height: height,
});
</script>

<template>
  <header>
    <div class="wrapper">
      <AddIcon />
    </div>
  </header>

  <main>
    <!-- <TheWelcome /> -->
    <konva-stage ref="stage" class="container" :config="configKonva">
      <konva-layer ref="layer">
        <konva-rect
          ref="rect"
          :config="{
            x: 20,
            y: 20,
            width: 100,
            height: 100,
            stroke: 'black',
            strokeWidth: 2,
          }"
        />
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
