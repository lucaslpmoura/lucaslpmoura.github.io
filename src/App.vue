<script setup>
import { RouterView, RouterLink } from "vue-router";

import Canvas from "./components/Canvas.vue";
import CornerButtonGroup from "./components/CornerButtonGroup.vue";
import CornerButton from "./components/CornerButton.vue";
import LanguageButton from "./components/LanguageButton.vue";
</script>

<template>
  <main>
    <Canvas class="background-canvas"></Canvas>

    <RouterView></RouterView>

    <CornerButtonGroup>
      <CornerButton
        img_src="restart.png"
        :tooltip="$t('restartBackgroundSimulation')"
        external_method="restartAutoSimulation()"
      ></CornerButton>
      <CornerButton
        img_src="github.png"
        :tooltip="$t('sourceCode')"
        link="https://www.github.com/lucaslpmoura/lucaslpmoura.github.io"
      ></CornerButton>
    </CornerButtonGroup>

     <LanguageButton defaultLocale="pt-BR"></LanguageButton>
  </main>
</template>

<style scoped>
.background-canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1; /* fica atrás do texto */
  width: 100%;
  height: 100%;
}
</style>