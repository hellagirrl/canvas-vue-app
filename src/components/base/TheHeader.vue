<script setup>
import AddIcon from "../icons/IconAdd.vue";
import ClickIcon from "../icons/IconClick.vue";
import SaveIcon from "../icons/IconSave.vue";
import { useKonvaStore } from "../../stores/konva.js";
import { storeToRefs } from "pinia";

const store = useKonvaStore();

const { makeConnection } = storeToRefs(store);
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
      <SaveIcon class="header__navbar--link" @click="store.saveItems()" />
    </div>
  </header>
</template>

<style scoped>
.header {
  line-height: 1.5;
  margin-top: 10px;
}
.header__navbar--link {
  margin: 10px 20px 5px 0px;
}
</style>
